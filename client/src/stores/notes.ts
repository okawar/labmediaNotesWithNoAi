import { defineStore } from "pinia";
import type { Note } from "../types/notes";

const BASE_API_URL = "http://127.0.0.1:5000"

export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [] as Note[],
        archive: [] as Note[],
        searchQuery: "",
        visibleNotesCount: 6,
        isAddModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        noteToEdit: null as Note | null,
        noteNumberToDelete: null as number | null,
        isImageViewerOpen: false,
        imageToShow: "",
    }),

    getters: {
        filteredNotes(state): Note[] {
            if (!state.searchQuery) {
                return state.notes;
            }
            return state.notes.filter(
                (note) =>
                    note.title
                        .toLowerCase()
                        .includes(state.searchQuery.toLowerCase()) ||
                    (note.text &&
                        note.text
                            .toLowerCase()
                            .includes(state.searchQuery.toLowerCase()))
            );
        },
        displayedNotes(state): Note[] {
            const notesToDisplay = this.filteredNotes;
            if (!Array.isArray(notesToDisplay)) {
                return [];
            }
            return notesToDisplay.slice(0, state.visibleNotesCount);
        },
        countNotes(state): number {
            return state.notes.length;
        },
        hasMoreNotes(state): boolean {
            return state.visibleNotesCount < this.filteredNotes.length;
        },
    },

    actions: {
        async fetchNotes() {
            try {
                const response = await fetch(`${BASE_API_URL}/notes`);
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }
                const data = await response.json();
                this.notes = data.notes;
            } catch (e) {
                console.error(e);
            }
        },
        openImageViewer(imageUrl: string) {
            this.isImageViewerOpen = true;
            this.imageToShow = imageUrl;
        },
        closeImageViewer() {
            this.isImageViewerOpen = false;
            this.imageToShow = "";
        },
        handleSearch(query: string) {
            this.searchQuery = query;
            this.visibleNotesCount = 6;
        },

        loadMoreNotes() {
            this.visibleNotesCount += 6;
        },

        async addNote(newNoteData: {
            title: string;
            text?: string;
            file?: File | null;
        }) {
            if (newNoteData.title.trim() === "") {
                alert("Заголовок не может быть пустым!");
                return;
            }

            const formData = new FormData();
            formData.append("title", newNoteData.title);
            formData.append("text", newNoteData.text || '');
            if (newNoteData.file) {
                formData.append("image", newNoteData.file);
            }

            try {
                const response = await fetch(`${BASE_API_URL}/notes`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to add note");
                }

                await this.fetchNotes();
                this.closeAddModal();
            } catch (e) {
                console.error(e);
            }
        },

        async editNote(
            noteNumber: number,
            updatedData: {
                title?: string;
                text?: string;
                file?: File | null;
                remove_image?: boolean;
            }
        ) {
            const formData = new FormData();
            if (updatedData.title) {
                formData.append("title", updatedData.title);
            }
            if (updatedData.text) {
                formData.append("text", updatedData.text);
            }
            if (updatedData.file) {
                formData.append("image", updatedData.file);
            }
            if (updatedData.remove_image) {
                formData.append("remove_image", "true");
            }

            try {
                const response = await fetch(
                    `${BASE_API_URL}/notes/${noteNumber}`,
                    {
                        method: "PATCH",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to edit note");
                }

                await this.fetchNotes();
                this.closeEditModal();
            } catch (e) {
                console.error(e);
            }
        },

        openAddModal() {
            this.isAddModalOpen = true;
        },
        closeAddModal() {
            this.isAddModalOpen = false;
        },
        openDeleteModal(noteNumber: number) {
            this.isDeleteModalOpen = true;
            this.noteNumberToDelete = noteNumber;
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            this.noteNumberToDelete = null;
        },
        openEditModal(note: Note) {
            this.isEditModalOpen = true;
            this.noteToEdit = note;
        },
        closeEditModal() {
            this.isEditModalOpen = false;
            this.noteToEdit = null;
        },
        async confirmDelete() {
            if (this.noteNumberToDelete === null) {
                return;
            }

            try {
                const response = await fetch(
                    `${BASE_API_URL}/notes/${this.noteNumberToDelete}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete note");
                }

                await this.fetchNotes();
                this.closeDeleteModal();
            } catch (e) {
                console.error(e);
            }
        },
    },
});
