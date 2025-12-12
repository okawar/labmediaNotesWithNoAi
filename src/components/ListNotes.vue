<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NoteCard from './NoteCard.vue';
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore()

const openedMenuNoteId = ref<number | null>(null);

onMounted(() => {
    if (notesStore.displayedNotes.length === 0) {
        notesStore.loadMoreNotes();
    }
});

function handleToggleMenu(noteNumber: number) {
    if (openedMenuNoteId.value === noteNumber) {
        openedMenuNoteId.value = null;
    } else {
        openedMenuNoteId.value = noteNumber;
    }
}

function handleChangeView(newMode: 'grid' | 'list') {
    viewMode.value = newMode;
    openedMenuNoteId.value = null;
}

const viewMode = ref<"grid" | "list">("grid");
</script>
<template>
    <div class="viewModes">
        <button @click="handleChangeView('grid')">
            <div v-if="viewMode === 'grid'">
                <!-- Иконка активной плитки -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="9.41177" fill="#B28FE3" fill-opacity="0.9" />
                    <path
                        d="M16.4706 9.41174H10.5882C9.93847 9.41174 9.41174 9.93847 9.41174 10.5882V16.4706C9.41174 17.1203 9.93847 17.647 10.5882 17.647H16.4706C17.1203 17.647 17.647 17.1203 17.647 16.4706V10.5882C17.647 9.93847 17.1203 9.41174 16.4706 9.41174Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M29.4117 9.41174H23.5294C22.8796 9.41174 22.3529 9.93847 22.3529 10.5882V16.4706C22.3529 17.1203 22.8796 17.647 23.5294 17.647H29.4117C30.0615 17.647 30.5882 17.1203 30.5882 16.4706V10.5882C30.5882 9.93847 30.0615 9.41174 29.4117 9.41174Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M29.4117 22.3529H23.5294C22.8796 22.3529 22.3529 22.8796 22.3529 23.5294V29.4117C22.3529 30.0615 22.8796 30.5882 23.5294 30.5882H29.4117C30.0615 30.5882 30.5882 30.0615 30.5882 29.4117V23.5294C30.5882 22.8796 30.0615 22.3529 29.4117 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M16.4706 22.3529H10.5882C9.93847 22.3529 9.41174 22.8796 9.41174 23.5294V29.4117C9.41174 30.0615 9.93847 30.5882 10.5882 30.5882H16.4706C17.1203 30.5882 17.647 30.0615 17.647 29.4117V23.5294C17.647 22.8796 17.1203 22.3529 16.4706 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div v-else>
                <!-- Иконка неактивной плитки -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.588235" y="0.588235" width="38.8235" height="38.8235" rx="8.82353" stroke="#B28FE3"
                        stroke-opacity="0.9" stroke-width="1.17647" />
                    <path
                        d="M16.4706 9.41174H10.5882C9.93847 9.41174 9.41174 9.93847 9.41174 10.5882V16.4706C9.41174 17.1203 9.93847 17.647 10.5882 17.647H16.4706C17.1203 17.647 17.647 17.1203 17.647 16.4706V10.5882C17.647 9.93847 17.1203 9.41174 16.4706 9.41174Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M29.4117 9.41174H23.5294C22.8796 9.41174 22.3529 9.93847 22.3529 10.5882V16.4706C22.3529 17.1203 22.8796 17.647 23.5294 17.647H29.4117C30.0615 17.647 30.5882 17.1203 30.5882 16.4706V10.5882C30.5882 9.93847 30.0615 9.41174 29.4117 9.41174Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M29.4117 22.3529H23.5294C22.8796 22.3529 22.3529 22.8796 22.3529 23.5294V29.4117C22.3529 30.0615 22.8796 30.5882 23.5294 30.5882H29.4117C30.0615 30.5882 30.5882 30.0615 30.5882 29.4117V23.5294C30.5882 22.8796 30.0615 22.3529 29.4117 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M16.4706 22.3529H10.5882C9.93847 22.3529 9.41174 22.8796 9.41174 23.5294V29.4117C9.41174 30.0615 9.93847 30.5882 10.5882 30.5882H16.4706C17.1203 30.5882 17.647 30.0615 17.647 29.4117V23.5294C17.647 22.8796 17.1203 22.3529 16.4706 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </button>
        <button @click="handleChangeView('list')" :class="{ 'viewMode-active': viewMode === 'list' }">
            <div v-if="viewMode === 'list'">
                <!-- Иконка активного списка -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 9.41177C0 4.21379 4.21379 0 9.41177 0H30.5882C35.7862 0 40 4.21379 40 9.41177V30.5882C40 35.7862 35.7862 40 30.5882 40H9.41177C4.21379 40 0 35.7862 0 30.5882V9.41177Z"
                        fill="#B28FE3" fill-opacity="0.9" />
                    <path
                        d="M22.3529 10.5882H30.5882M22.3529 16.4706H30.5882M22.3529 23.5294H30.5882M22.3529 29.4117H30.5882M10.5882 9.41174H16.4706C17.1203 9.41174 17.647 9.93847 17.647 10.5882V16.4706C17.647 17.1203 17.1203 17.647 16.4706 17.647H10.5882C9.93847 17.647 9.41174 17.1203 9.41174 16.4706V10.5882C9.41174 9.93847 9.93847 9.41174 10.5882 9.41174ZM10.5882 22.3529H16.4706C17.1203 22.3529 17.647 22.8796 17.647 23.5294V29.4117C17.647 30.0615 17.1203 30.5882 16.4706 30.5882H10.5882C9.93847 30.5882 9.41174 30.0615 9.41174 29.4117V23.5294C9.41174 22.8796 9.93847 22.3529 10.5882 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div v-else>
                <!-- Иконка неактивного списка -->
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.41211 0.587891H30.5879C35.461 0.587891 39.4121 4.53901 39.4121 9.41211V30.5879C39.4121 35.461 35.461 39.4121 30.5879 39.4121H9.41211C4.53901 39.4121 0.587891 35.461 0.587891 30.5879V9.41211C0.587891 4.53901 4.53901 0.587891 9.41211 0.587891Z"
                        stroke="#B28FE3" stroke-opacity="0.9" stroke-width="1.17647" />
                    <path
                        d="M22.3529 10.5882H30.5882M22.3529 16.4706H30.5882M22.3529 23.5294H30.5882M22.3529 29.4117H30.5882M10.5882 9.41174H16.4706C17.1203 9.41174 17.647 9.93847 17.647 10.5882V16.4706C17.647 17.1203 17.1203 17.647 16.4706 17.647H10.5882C9.93847 17.647 9.41174 17.1203 9.41174 16.4706V10.5882C9.41174 9.93847 9.93847 9.41174 10.5882 9.41174ZM10.5882 22.3529H16.4706C17.1203 22.3529 17.647 22.8796 17.647 23.5294V29.4117C17.647 30.0615 17.1203 30.5882 16.4706 30.5882H10.5882C9.93847 30.5882 9.41174 30.0615 9.41174 29.4117V23.5294C9.41174 22.8796 9.93847 22.3529 10.5882 22.3529Z"
                        stroke="#1B1B1B" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </button>
    </div>
    <main class="note-list" :class="`note-list__${viewMode}`">
        <NoteCard @openDeleteModal="notesStore.openDeleteModal(note.number)"
            @openEditModal="notesStore.openEditModal(note)" @openImageViewer="notesStore.openImageViewer" :is-menu-open="openedMenuNoteId === note.number"
            @toggle-menu="handleToggleMenu(note.number)" v-for="note in notesStore.displayedNotes" :key="note.number"
            :note="note" :viewMode="viewMode" />
    </main>
    <div class="load-more-container">
        <button v-if="notesStore.hasMoreNotes" class="load-more-btn" @click="notesStore.loadMoreNotes">
            Загрузить еще
        </button>
    </div>
</template>

<style scoped>
.load-more-container {
    display: flex;
    justify-content: flex-start;
}

.load-more-btn {
    margin-top: var(--spacing-m);
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: var(--color-brand);
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.note-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(468px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.note-list__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(468px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.note-list__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
}

.viewModes {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

@media (max-width: 375px) {
    .note-list__list, .note-list__grid, .note-list {
        grid-template-columns: 1fr;
        width: 340px;
        margin-left: auto;
        margin-right: auto;
    }
    .viewModes {
        display: none;
    }
}

.viewModes button {
    border: none;
    cursor: pointer;
    background-color: transparent;
}
</style>