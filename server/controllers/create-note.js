import busboy from "busboy-esm";
import { createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { commitDB, database } from "../db.js";
import { noteSchema } from "../schemas.js";
import { SERVER_ORIGIN, STATIC_FILES_PATH } from "../config.js";

export const createNote = (req, res) => {
    let bb;

    try {
        bb = busboy({ headers: req.headers });
    } catch (error) {
        res.writeHead(400).end(error.message);
        return;
    }

    const note = {};
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
        if (noteSchema[key]) {
            note[key] = value;
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
            
            note[key] = `${SERVER_ORIGIN}${newFilePath}`;
        } else {
            stream.resume();
        }
    });

    bb.on("finish", () => {
        for (const key in noteSchema) {
            if (noteSchema[key].required && !note[key]) {
                return bb.emit("error", {
                    statusCode: 400,
                    errorMsg: `Missed required field: ${key}`,
                });
            }
            if (note[key] && noteSchema[key].writable && !noteSchema[key].validator(note[key])) {
                 return bb.emit("error", {
                    statusCode: 400,
                    errorMsg: `Validation failed for field: ${key}`,
                });
            }
        }
        
        const uid = database.uid + 1;
        note.id = uid;
        note.date = new Date();

        commitDB((db) => {
            db.changed = true;
            db.uid = uid;
            db.indexes[uid] = db.notes.length;
            db.notes.push(note);
        });

        res.writeHead(200).end(JSON.stringify(note));
    });

    req.pipe(bb);
};
