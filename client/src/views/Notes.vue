<script setup lang="ts">
import { onMounted } from 'vue';
import ListNotes from '../components/ListNotes.vue';
import DeleteModal from '../components/DeleteModal.vue';
import NoteModal from '../components/NoteModal.vue';
import ImageViewer from '../components/ImageViewer.vue';
import AddNoteButton from '../components/AddNoteButton.vue';
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore();

onMounted(() => {
	notesStore.fetchNotes();
});
</script>

<template>
    <main>
        <ListNotes />
    </main>
    <NoteModal mode="add" />
    <NoteModal mode="edit" />
    <DeleteModal />
    <ImageViewer />

    <AddNoteButton />
</template>

<style scoped>
</style>