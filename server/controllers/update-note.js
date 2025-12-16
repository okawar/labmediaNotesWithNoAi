import busboy from "busboy-esm";
import { createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { commitDB, database } from "../db.js";
import { noteSchema } from "../schemas.js";
import { SERVER_ORIGIN, STATIC_FILES_PATH } from "../config.js";

export const updateNote = (req, res) => {
    const id = req.url.split("/")[2];
    const idx = database.indexes[id];

    if (idx === undefined) {
        return res.writeHead(404).end("Specified id not found");
    }

    let bb;
    try {
        bb = busboy({ headers: req.headers });
    } catch (error) {
        return res.writeHead(400).end(error.message);
    }

    const updatedFields = {};
    const cleanupPaths = [];

    bb.on("error", (error) => {
        const { statusCode = 500, errorMsg = "" } = error;
        
        cleanupPaths.forEach((path) => {
            unlink(path).catch(console.error);
        });

        if (statusCode === 500 && !errorMsg) {
            console.error(error);
        }
        if (!res.headersSent) {
            res.writeHead(statusCode).end(errorMsg);
        }
    });

    bb.on("field", (key, value) => {
        if (noteSchema[key] || key === "remove_image") {
            updatedFields[key] = value;
        }
    });

    bb.on("file", (key, stream, info) => {
        if (key === "image" && info.filename) {
            const newFileName = Date.now();
            const newFileExt = info.filename.split(".").pop() || "tmp";
            const newFilePath = `${STATIC_FILES_PATH}/${newFileName}.${newFileExt}`;
            const fullPath = `.${newFilePath}`;

            cleanupPaths.push(fullPath);

            const writeStream = createWriteStream(fullPath);
            stream.pipe(writeStream);
            
            stream.on("error", (err) => bb.emit("error", err));
            writeStream.on("error", (err) => bb.emit("error", err));

            updatedFields[key] = `${SERVER_ORIGIN}${newFilePath}`;
        } else {
            stream.resume();
        }
    });

    bb.on("finish", () => {
        const note = { ...database.notes[idx] };

        if (updatedFields.remove_image === "true" && note.image) {
            const oldFileUrl = new URL(note.image, SERVER_ORIGIN);
            unlink(`.${oldFileUrl.pathname}`).catch(console.error);
            note.image = null;
        }
        
        for (const key in updatedFields) {
            if (noteSchema[key] && noteSchema[key].writable) {
                 if (!noteSchema[key].validator(updatedFields[key])) {
                    return bb.emit("error", {
                        statusCode: 400,
                        errorMsg: `Validation failed for field: ${key}`,
                    });
                }
                note[key] = updatedFields[key];
            }
        }

        commitDB((db) => {
            db.changed = true;
            db.notes[idx] = note;
        });

        res.writeHead(200).end(JSON.stringify(note));
    });

    req.pipe(bb);
};
