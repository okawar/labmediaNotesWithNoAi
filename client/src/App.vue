<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useNotesStore } from './stores/notes';

const notesStore = useNotesStore();
const route = useRoute();

const isArchivePage = computed(() => route.name === 'Archive');
</script>

<template>
	<div class="container" :class="{ 'archive-page': isArchivePage }">
		<Header :is-archive-page="isArchivePage" @search="notesStore.handleSearch" />
		<router-view />
		<Footer :is-archive-page="isArchivePage"/>
	</div>
</template>

<style scoped>
</style>
