<script setup lang="ts">
import { useNotesStore } from '../stores/notes';

const notesStore = useNotesStore();
</script>

<template>
    <transition name="fade">
        <div class="modal-backdrop" v-if="notesStore.isDeleteModalOpen">
            <div class="modal">
                <span>
                    <!-- Иконка удаления -->
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.1667 21.0835V32.5835M26.8333 21.0835V32.5835M36.4167 11.5002V38.3335C36.4167 39.3502 36.0128 40.3252 35.2939 41.0441C34.575 41.763 33.6 42.1668 32.5833 42.1668H13.4167C12.4 42.1668 11.425 41.763 10.7061 41.0441C9.9872 40.3252 9.58333 39.3502 9.58333 38.3335V11.5002M5.75 11.5002H40.25M15.3333 11.5002V7.66683C15.3333 6.65017 15.7372 5.67514 16.4561 4.95625C17.175 4.23736 18.15 3.8335 19.1667 3.8335H26.8333C27.85 3.8335 28.825 4.23736 29.5439 4.95625C30.2628 5.67514 30.6667 6.65017 30.6667 7.66683V11.5002"
                            stroke="#7733DD" stroke-opacity="0.9" stroke-width="3.83333" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
                <h1>Удалить заметку</h1>
                <p>Удаленная заметка попадет в архив без возможности восстановления</p>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="notesStore.closeDeleteModal()">Отменить</button>
                    <button class="btn-delete" @click="notesStore.confirmDelete()">Удалить</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        transition: opacity 0.3s ease;
    }

    .modal {
        background-color: var(--color-white);
        padding: var(--spacing-l);
        border-radius: var(--border-radius-m);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 600px;
        text-align: center;
        box-sizing: border-box;
        transition: all 0.3s ease;
    }

    .modal h1 {
        margin-bottom: var(--spacing-l);
    }

    .modal p {
        margin-bottom: var(--spacing-m);
    }

    .modal-actions {
        display: flex;
        justify-content: space-around;
        gap: 16px;
    }

    .btn-cancel, .btn-delete {
        padding: var(--spacing-s) var(--spacing-m);
        width: 240px;
        border-radius: var(--border-radius-l);
        cursor: pointer;
        font-size: 16px;
    }

    .btn-cancel {
        background-color: transparent;
        color: var(--color-brand);
        border: 1px solid var(--color-brand);
    }

    .btn-delete {
        background-color: var(--color-brand);
        color: var(--color-white);
        border: none;
    }

    @media (max-width: 720px) {
        .modal {
            width: 340px;
            height: 370px;
            padding: var(--spacing-m);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .modal-actions {
            flex-direction: column;
            align-items: center;
        }

        .btn-cancel, .btn-delete {
            width: 100%;
        }
    }
</style>
