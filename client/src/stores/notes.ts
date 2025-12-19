import { defineStore } from "pinia";
import type { Note } from "../types/notes";

const BASE_API_URL = "http://127.0.0.1:5000"

export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [] as Note[],
        archive: [] as Note[],
        searchQuery: "",
        isAddModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        noteToEdit: null as Note | null,
        noteNumberToDelete: null as number | null,
        isImageViewerOpen: false,
        imageToShow: "",
        page: 1,
        limit: 6,
        total: 0,
    }),

    getters: {
        displayedNotes(state): Note[] {
            return state.notes;
        },
        hasMoreNotes(state): boolean {
            return state.notes.length < state.total;
        },
    },

    actions: {
        async fetchNotes(isLoadMore = false) {
            try {
                const url = new URL(`${BASE_API_URL}/notes`);
                url.searchParams.append('page', this.page.toString());
                url.searchParams.append('limit', this.limit.toString());
                if (this.searchQuery) {
                    url.searchParams.append('search', this.searchQuery);
                }

                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }
                const data = await response.json();
                if (isLoadMore) {
                    this.notes = [...this.notes, ...data.notes];
                } else {
                    this.notes = data.notes;
                }
                this.total = data.total;
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
            this.page = 1;
            this.fetchNotes();
        },

        loadMoreNotes() {
            if (this.hasMoreNotes) {
                this.page += 1;
                this.fetchNotes(true);
            }
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
