import { defineStore } from "pinia";
import type { Note } from "../types/notes";


export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [
            {
                number: 1,
                title: "Обязательный заголовок",
                content:
                    "Composition API — это новый способ организации и написания компонентов в Vue.js, который был представлен в версии 3.0. Он предоставляет более гибкий и мощный подход к созданию компонентов по сравнению с Options API.",
                // imgSrc: 'https://fastly.picsum.photos/id/1060/70/70.jpg?hmac=ERAlIoEotrmvKFrS0mxV49-ku45vMSnvqTWKJV-TwYo',
                created_at: "03.03.2004",
            },
            {
                number: 2,
                title: "Второй заголовок",
                content:
                    "Еще один пример заметки с использованием Composition API в Vue.js. Этот подход позволяет лучше структурировать код и повторно использовать логику между компонентами.",
                imgSrc: "https://fastly.picsum.photos/id/1060/70/70.jpg?hmac=ERAlIoEotrmvKFrS0mxV49-ku45vMSnvqTWKJV-TwYo",
                created_at: "15.07.2021",
            },
            {
                number: 3,
                title: "Идеи для нового проекта",
                content:
                    "Нужно продумать стек технологий для нового пет-проекта. Возможно, стоит попробовать SvelteKit или SolidStart для разнообразия. Также рассмотреть использование tRPC для типизированного API.",
                created_at: "21.11.2023",
            },
            {
                number: 4,
                title: "Список покупок",
                content: "Молоко, хлеб, яйца, сыр, овощи.",
                imgSrc: "https://fastly.picsum.photos/id/237/70/70.jpg?hmac=6OKP2b3cT20T2t2v5utBbl2r-a-5fPynX22v-9i5stc",
                created_at: "01.02.2024",
            },
            {
                number: 5,
                title: "Подготовка к встрече",
                content:
                    "Собрать все необходимые документы и подготовить презентацию по итогам квартала. Встреча в 15:00.",
                created_at: "10.05.2024",
            },
            {
                number: 6,
                title: "Рецепт пасты Карбонара",
                content:
                    "Спагетти, гуанчале (или бекон), яичные желтки, сыр Пекорино Романо, черный перец. Главное – не добавлять сливки!",
                imgSrc: "https://fastly.picsum.photos/id/1080/70/70.jpg?hmac=nSGrGf_Gc-wdg_20a3sAnN0Z9iTBp2yrj2_iL-d2EL4",
                created_at: "08.08.2022",
            },
            {
                number: 7,
                title: "Изучение нового фреймворка",
                content:
                    "Начать изучение Vue 3 с Composition API. Пройти официальную документацию и сделать пару тестовых проектов.",
                created_at: "12.01.2024",
            },
            {
                number: 8,
                title: "План тренировок",
                content:
                    "Понедельник - грудь, трицепс. Среда - спина, бицепс. Пятница - ноги, плечи. Не забывать про кардио.",
                created_at: "18.03.2024",
            },
            {
                number: 9,
                title: "Книги к прочтению",
                content:
                    '"Чистый код" - Роберт Мартин, "Паттерны проектирования" - Эрих Гамма и др.',
                created_at: "05.04.2024",
            },
        ] as Note[],
        archive: [] as Note[],
        searchQuery: '',
        visibleNotesCount: 6,
        isAddModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        noteToEdit: null as Note | null,
        noteNumberToDelete: null as number | null,
        isImageViewerOpen: false,
        imageToShow: '',
    }),

    getters: {
        filteredNotes(state): Note[] {
            if (!state.searchQuery) {
                return state.notes;
            }
            return state.notes.filter(note =>
                note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                (note.content && note.content.toLowerCase().includes(state.searchQuery.toLowerCase()))
            );
        },
        displayedNotes(state): Note[] {
            return this.filteredNotes.slice(0, state.visibleNotesCount);
        },
        countNotes(state): number {
            return state.notes.length;
        },
        hasMoreNotes(state): boolean {
            return state.visibleNotesCount < this.filteredNotes.length;
        }
    },

    actions: {
        openImageViewer(imageUrl: string) {
            this.isImageViewerOpen = true;
            this.imageToShow = imageUrl;
        },
        closeImageViewer() {
            this.isImageViewerOpen = false;
            this.imageToShow = '';
        },
        handleSearch(query: string) {
            this.searchQuery = query;
            this.visibleNotesCount = 6;
        },

        loadMoreNotes() {
            this.visibleNotesCount += 6;
        },

        addNote(newNoteData: { title: string; content?: string; imgSrc?: string; }) {
            if (newNoteData.title.trim() === '') {
                alert('Заголовок не может быть пустым!');
                return;
            }
            const newNoteObj: Note = {
                ...newNoteData,
                number: Math.max(0, ...this.notes.map(n => n.number)) + 1,
                created_at: new Date().toLocaleDateString(),
            };
            this.notes.unshift(newNoteObj);
            this.closeAddModal();
        },

        editNote(noteNumber: number, updatedData: { title?: string; content?: string; imgSrc?: string }) {
            const note = this.notes.find(n => n.number === noteNumber);
            if (note) {
                Object.assign(note, updatedData);
            }
            this.closeEditModal();
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
        confirmDelete() {
            if (this.noteNumberToDelete !== null) {
                const noteToArchive = this.notes.find(n => n.number === this.noteNumberToDelete);
                if (noteToArchive) {
                    this.archive.unshift(noteToArchive);
                }
                this.notes = this.notes.filter(n => n.number !== this.noteNumberToDelete);
            }
            this.closeDeleteModal();
        },
    },
});
