<script setup lang="ts">
import { ref } from 'vue';


interface Note {
    number: number;
    title: string;
    content?: string;
    imgSrc?: string;
    created_at: string;
}

defineProps<{
    note: Note;
    viewMode: "grid" | "list";
    isMenuOpen: boolean;
}>();

const emit = defineEmits(['toggle-menu'])
</script>

<template>
    <div class="note-list__card">
        <div class="note-list__card-header">
            <span :class="{'card-with-image-list' : note.imgSrc}">
                <div v-if="viewMode === 'list' && note.imgSrc">
                    <img :src="note.imgSrc" alt="">
                </div>
                <div>
                    <h1>#{{ note.number }}</h1>
                    <h1>{{ note.title }}</h1>
                </div>

            </span>
            <button v-if="viewMode === 'grid'" v-show="!isMenuOpen" @click="emit('toggle-menu')"
                style="background-color: transparent; border: 1px solid #B28FE390; border-radius: 5px; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="7" r="2"></circle>
                    <circle cx="12" cy="14" r="2"></circle>
                    <circle cx="12" cy="21" r="2"></circle>
                </svg>
            </button>
            <div v-show="isMenuOpen" class="note-actions">
                <button @click="emit('toggle-menu')">
                    <svg style="border-bottom: 1px solid #B28FE390; margin-bottom: 10px;" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div v-if="viewMode==='list'" class="note-actions" style="flex-direction: row; max-width: 80px;">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </div>
        </div>
        <p>{{ note.content }}</p>
        <div v-if="viewMode==='grid' && note.imgSrc">
            <img :src="note.imgSrc" alt="">
        </div>
        <span class="note-list__card-date">{{ note.created_at }}</span>
    </div>
</template>

<style scoped>
    .note-list__card {
        background-color: #B28FE390;
        padding: 40px 20px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    }

    .note-list__card-date{
        margin-top: auto;
        padding-top: 20px;
    }

    .note-list__card-header{
        border-bottom: 1px solid #BA9AE6;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        }

    .note-list__card-header span{
        line-height: 1;
        height: 150px;
    }

    .note-list__card-header .card-with-image-grid{
        height: fit-content;
    }
    .note-list__card-header .card-with-image-list{
        display: flex;
        align-items: center;
    }

    .note-list__card-header .card-with-image-list div{
        margin-right: 20px;
    }

    .note-list__card-header button{
        align-self: self-start; 
    }

    .note-actions {
        background-color: #BA9AE6;
        border: none;
        padding: 5px;
        border-radius: 10px;
        align-self: self-start;
        max-width: 35px;
    }

    .note-actions button{
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
</style>