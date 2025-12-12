<script setup lang="ts">
import NoteCard from './NoteCard.vue';
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore()

</script>
<template>
    <div>
        <h2>История заметок</h2>
        <main class="note-list">
            <NoteCard
                v-for="note in notesStore.archive"
                :key="note.number"
                :note="note"
                viewMode="list"
                :isArchive="true"
            />
            <p v-if="notesStore.archive.length === 0">В архиве пока пусто.</p>
        </main>
    </div>
</template>

<style scoped>
.note-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
}

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

@media (max-width: 375px) {
    .note-list {
        width: 340px;
        margin: 40px auto 0;
    }
}
</style>