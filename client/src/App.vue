<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import DeleteModal from './components/DeleteModal.vue';
import NoteModal from './components/NoteModal.vue';
import ImageViewer from './components/ImageViewer.vue';
import { useNotesStore } from './stores/notes';

const notesStore = useNotesStore();
const route = useRoute();

const isHomePage = computed(() => route.name === 'Home');
const isArchivePage = computed(() => route.name === 'Archive');

onMounted(() => {
	notesStore.fetchNotes();
});
</script>

<template>
	<div class="container" :class="{ 'archive-page': isArchivePage }">
		<Header :is-archive-page="isArchivePage" />
		<router-view />
		<Footer :is-archive-page="isArchivePage"/>

		<NoteModal mode="add" />
		<NoteModal mode="edit" />
		<DeleteModal />
		<ImageViewer />

		<div class="add-note" v-if="isHomePage">
			<button class="add-note__btn" @click="notesStore.openAddModal">
				<svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_dd_23_829)">
						<path
							d="M8 47C8 23.2518 27.2518 4 51 4C74.7482 4 94 23.2518 94 47C94 70.7482 74.7482 90 51 90C27.2518 90 8 70.7482 8 47Z"
							fill="#7733DD" fill-opacity="0.9" />
						<path d="M32 47H70M51 28V66" stroke="white" stroke-width="5.3012" stroke-linecap="round"
							stroke-linejoin="round" />
					</g>
					<defs>
						<filter id="filter0_dd_23_829" x="0" y="0" width="102" height="102" filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB">
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feColorMatrix in="SourceAlpha" type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
							<feOffset dy="2" />
							<feGaussianBlur stdDeviation="1.85" />
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.34 0" />
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_23_829" />
							<feColorMatrix in="SourceAlpha" type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
							<feMorphology radius="2" operator="dilate" in="SourceAlpha"
								result="effect2_dropShadow_23_829" />
							<feOffset dy="4" />
							<feGaussianBlur stdDeviation="3" />
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
							<feBlend mode="normal" in2="effect1_dropShadow_23_829" result="effect2_dropShadow_23_829" />
							<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_23_829" result="shape" />
						</filter>
					</defs>
				</svg>
			</button>
		</div>
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

.add-note {
	position: fixed;
	bottom: 30px;
	right: 30px;
	z-index: 1000;
}

.add-note__btn {
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
}
</style>
