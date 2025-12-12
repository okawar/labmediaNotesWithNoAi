<script setup lang="ts">
import type { Note } from '../types/notes';

defineProps<{
    note: Note;
    viewMode: "grid" | "list";
    isMenuOpen?: boolean;
    isArchive?: boolean;
}>();

const emit = defineEmits(['toggle-menu', 'openDeleteModal', 'openEditModal', 'openImageViewer']);
</script>

<template>
    <div class="note-card" :class="`note-card-${viewMode}`">
        <div class="note-card__header">
            <span class="note-card__title-group" :class="{'note-card__title-group--with-image' : note.imgSrc}">
                <div v-if="viewMode === 'list' && note.imgSrc" class="note-card__image-wrapper--list" @click.stop="emit('openImageViewer', note.imgSrc || '')">
                    <img :src="note.imgSrc" alt="" class="note-card__image">
                </div>
                <div>
                    <h1>#{{ note.number }}</h1>
                    <h1>{{ note.title }}</h1>
                </div>
            </span>

            <div v-if="!isArchive">
                <button v-if="viewMode === 'grid' && !isMenuOpen" @click="emit('toggle-menu')" class="note-card__menu-toggle-btn">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0.5H27C31.1421 0.5 34.5 3.85786 34.5 8V27C34.5 31.1421 31.1421 34.5 27 34.5H8C3.85786 34.5 0.5 31.1421 0.5 27V8C0.5 3.85786 3.85786 0.5 8 0.5Z" stroke="#B28FE3" stroke-opacity="0.9" />
                        <path d="M17.5 18.5C18.0523 18.5 18.5 18.0523 18.5 17.5C18.5 16.9477 18.0523 16.5 17.5 16.5C16.9477 16.5 16.5 16.9477 16.5 17.5C16.5 18.0523 16.9477 18.5 17.5 18.5Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 11.5C18.0523 11.5 18.5 11.0523 18.5 10.5C18.5 9.94772 18.0523 9.5 17.5 9.5C16.9477 9.5 16.5 9.94772 16.5 10.5C16.5 11.0523 16.9477 11.5 17.5 11.5Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 25.5C18.0523 25.5 18.5 25.0523 18.5 24.5C18.5 23.9477 18.0523 23.5 17.5 23.5C16.9477 23.5 16.5 23.9477 16.5 24.5C16.5 25.0523 16.9477 25.5 17.5 25.5Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div v-if="viewMode === 'grid' && isMenuOpen" class="note-actions">
                    <button @click="emit('toggle-menu')" class="note-actions__close-btn">
                         <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_366_575" fill="white"><path d="M0 0H34V34H0V0Z" /></mask><path d="M34 34V33H0V34V35H34V34Z" fill="#E1D9E8" fill-opacity="0.3" mask="url(#path-1-inside-1_366_575)" /><path d="M23 11L11 23M11 11L23 23" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                    <div class="note-actions__group">
                        <button @click="emit('openEditModal', note)">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9999 10.0006L24.9999 14.0006M27.1739 11.8126C27.7026 11.284 27.9997 10.5671 27.9998 9.81946C27.9999 9.07185 27.703 8.35482 27.1744 7.82611C26.6459 7.2974 25.9289 7.00032 25.1813 7.00023C24.4337 7.00014 23.7166 7.29703 23.1879 7.82561L9.84193 21.1746C9.60975 21.4061 9.43805 21.6911 9.34193 22.0046L8.02093 26.3566C7.99509 26.4431 7.99314 26.535 8.01529 26.6225C8.03743 26.71 8.08285 26.7898 8.14673 26.8536C8.21061 26.9174 8.29055 26.9627 8.37809 26.9847C8.46563 27.0067 8.55749 27.0046 8.64393 26.9786L12.9969 25.6586C13.3101 25.5634 13.5951 25.3927 13.8269 25.1616L27.1739 11.8126Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        </button>
                        <button @click="$emit('openDeleteModal', note.number)">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 16V22M19 16V22M24 11V25C24 25.5304 23.7893 26.0391 23.4142 26.4142C23.0391 26.7893 22.5304 27 22 27H12C11.4696 27 10.9609 26.7893 10.5858 26.4142C10.2107 26.0391 10 25.5304 10 25V11M8 11H26M13 11V9C13 8.46957 13.2107 7.96086 13.5858 7.58579C13.9609 7.21071 14.4696 7 15 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V11" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        </button>
                    </div>
                </div>
                <div v-if="viewMode === 'list'" class="note-actions note-actions--list">
                    <button @click="$emit('openEditModal', note)">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9999 10.0006L24.9999 14.0006M27.1739 11.8126C27.7026 11.284 27.9997 10.5671 27.9998 9.81946C27.9999 9.07185 27.703 8.35482 27.1744 7.82611C26.6459 7.2974 25.9289 7.00032 25.1813 7.00023C24.4337 7.00014 23.7166 7.29703 23.1879 7.82561L9.84193 21.1746C9.60975 21.4061 9.43805 21.6911 9.34193 22.0046L8.02093 26.3566C7.99509 26.4431 7.99314 26.535 8.01529 26.6225C8.03743 26.71 8.08285 26.7898 8.14673 26.8536C8.21061 26.9174 8.29055 26.9627 8.37809 26.9847C8.46563 27.0067 8.55749 27.0046 8.64393 26.9786L12.9969 25.6586C13.3101 25.5634 13.5951 25.3927 13.8269 25.1616L27.1739 11.8126Z" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                    <button @click="$emit('openDeleteModal', note.number)">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 16V22M19 16V22M24 11V25C24 25.5304 23.7893 26.0391 23.4142 26.4142C23.0391 26.7893 22.5304 27 22 27H12C11.4696 27 10.9609 26.7893 10.5858 26.4142C10.2107 26.0391 10 25.5304 10 25V11M8 11H26M13 11V9C13 8.46957 13.2107 7.96086 13.5858 7.58579C13.9609 7.21071 14.4696 7 15 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V11" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                </div>
            </div>
        </div>
        <p>{{ note.content }}</p>
        <div v-if="viewMode==='grid' && note.imgSrc && !isArchive" class="note-card__image-wrapper--grid" @click.stop="emit('openImageViewer', note.imgSrc || '')">
            <img :src="note.imgSrc" alt="" class="note-card__image">
        </div>
        <span class="note-card__date">{{ note.created_at }}</span>
    </div>
</template>

<style scoped>
    .note-card {
        background-color: var(--color-bg-card);
        padding: var(--spacing-l) var(--spacing-m);
        border-radius: var(--border-radius-m);
        display: flex;
        flex-direction: column;
        
    }

    .note-card .note-card-list{
        min-height: 550px;
    }

    .note-card .note-card-grid{
        min-height: 550px;
    }

    .note-card__header {
        border-bottom: 1px solid var(--color-brand);
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-m);

        height: 130px;
        overflow: hidden;
        padding-bottom: 40px;
    }

    .note-card__title-group {
        line-height: 1;
        min-height: var(--card-header-min-height);
    }

    .note-card__title-group--with-image {
        display: flex;
        align-items: center;
        height: auto; 
    }

    .note-card__title-group--with-image div:first-of-type {
        margin-right: var(--spacing-m);
    }

    .note-card__date {
        margin-top: auto;
        padding-top: var(--spacing-m);
    }

    .note-card button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        align-self: flex-start;
    }

    .note-card__menu-toggle-btn {
        border: 1px solid var(--color-card-bg);
        border-radius: var(--border-radius-s);
        padding: var(--spacing-xs);
    }

    .note-actions {
        background-color: var(--color-brand-add);
        border-radius: var(--border-radius-m);
        padding: var(--spacing-xs);
        align-self: flex-start;
        display: flex;
        flex-direction: column;
    }
    
    .note-actions--list {
        flex-direction: row;
        max-width: 90px; 
    }

    .note-actions button {
        padding: var(--spacing-xs);
    }

    .note-actions__close-btn {
        border-bottom: 1px solid var(--color-card-border);
        margin-bottom: var(--spacing-s);
    }
    
    .note-actions__group {
        display: flex;
        flex-direction: column;
    }

    .note-card__image-wrapper--grid {
        width: fit-content;
        height: var(--card-image-height);
        margin-bottom: var(--spacing-m);
        border-radius: var(--border-image);
        overflow: hidden;
    }
    
    .note-card__image-wrapper--list {
        width: fit-content; 
        height: var(--card-image-height);
        overflow: hidden;
    }

    .note-card__image {
        width: 180px;
        height: 180px;
        object-fit: cover;
        display: block;
    }
</style>