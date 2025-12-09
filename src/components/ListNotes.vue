<script setup lang="ts">
    import { ref } from 'vue';
    import NoteCard from './NoteCard.vue';

    interface Note {
        number: number;
        title: string;
        content?: string;
        imgSrc?: string;
        created_at: string;
    }

    const openedMenuNoteId = ref<number | null>(null);

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

    defineProps<{
        notes: Note[];
    }>();

    const viewMode = ref<"grid" | "list">("grid");
</script>
<template>
    <div class="viewModes">
        <button @click="handleChangeView('grid')" :class="{'viewMode-active': viewMode === 'grid'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
        </button>
        <button @click="handleChangeView('list')" :class="{ 'viewMode-active': viewMode === 'list' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="5" width="16" height="2"></rect>
                <rect x="4" y="11" width="16" height="2"></rect>
                <rect x="4" y="17" width="16" height="2"></rect>
            </svg>
        </button>
    </div>
    <main class="note-list" :class="`note-list__${viewMode}`">
        <NoteCard :is-menu-open="openedMenuNoteId === note.number" @toggle-menu="handleToggleMenu(note.number)" v-for="note in notes" :key="note.number" :note="note" :viewMode="viewMode" />
    </main>
</template>

<style scoped>
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

    .viewModes button {
        width: 40px;
        height: 40px;
        border: 1px solid #B28FE390;
        color: #fff;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .viewMode-active{
        background-color: #B28FE390;
    }
</style>