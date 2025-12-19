<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import NoteCard from './NoteCard.vue';
import { useNotesStore } from '../stores/notes';
import GridViewIcon from './icons/GridViewIcon.vue';
import ListViewIcon from './icons/ListViewIcon.vue';

const notesStore = useNotesStore()

const openedMenuNoteId = ref<number | null>(null);
const loader = ref(null);

onMounted(() => {
    if (notesStore.displayedNotes.length === 0) {
        notesStore.fetchNotes();
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const firstEntry = entries[0];
            if (firstEntry && firstEntry.isIntersecting && notesStore.hasMoreNotes) {
                notesStore.loadMoreNotes();
            }
        },
        {
            rootMargin: '200px',
        }
    );

    if (loader.value) {
        observer.observe(loader.value);
    }

    onUnmounted(() => {
        if (loader.value) {
            observer.unobserve(loader.value);
        }
    });
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
            <GridViewIcon :is-active="viewMode === 'grid'" />
        </button>
        <button @click="handleChangeView('list')">
            <ListViewIcon :is-active="viewMode === 'list'" />
        </button>
    </div>
    <div class="note-list" :class="`note-list__${viewMode}`">
        <NoteCard @openDeleteModal="notesStore.openDeleteModal(note.id)"
            @openEditModal="notesStore.openEditModal(note)" @openImageViewer="notesStore.openImageViewer" :is-menu-open="openedMenuNoteId === note.id"
            @toggle-menu="handleToggleMenu(note.id)" v-for="note in notesStore.displayedNotes" :key="note.id"
            :note="note" :viewMode="viewMode" />
    </div>
    <div ref="loader"></div>
</template>

<style scoped>

.note-list {
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

@media (max-width: 720px) {
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