<script setup lang="ts">
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore();
</script>

<template>
    <div v-if="notesStore.isImageViewerOpen" class="image-viewer-backdrop" @click="notesStore.closeImageViewer">
        <div class="image-viewer-content" @click.stop>
            <img :src="notesStore.imageToShow" alt="Full size image" class="zoomed-image">
            <button @click="notesStore.closeImageViewer" class="close-btn">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="34" rx="17" fill="white" />
                    <path d="M23 11L11 23M11 11L23 23" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>

            </button>
        </div>
    </div>
</template>

<style scoped>
.image-viewer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.image-viewer-content {
    position: relative;
    width: 800px;
    height: 80%;
}

.zoomed-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
}

@media (max-width: 375px) {
    .image-viewer-content{
        height: 40%;
        border-radius: 8px;
    }
}
</style>