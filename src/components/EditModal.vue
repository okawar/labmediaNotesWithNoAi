<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Note } from '../types/notes';

const props = defineProps<{
    modalEditVisible: boolean;
    note: Note
}>();

const emit = defineEmits(['closeEditModal', 'editNote']);

const editedTitle = ref('');
const editedContent = ref('');

onMounted(() => {
    editedTitle.value = props.note.title;
    editedContent.value = props.note.content || '';
})

function saveChanges() {
    emit(
        'editNote', props.note.number, 
        {title: editedTitle.value, content: editedContent.value}
     );
     emit('closeEditModal');
}
</script>

<template>
    <div class="modal-backdrop" v-show="modalEditVisible">
        <div class="modal">
            <span class="modal-heading">
                <h2 class="modal-title">Редактирование заметки</h2>
                <button @click="emit('closeEditModal')">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_366_575" fill="white">
                            <path d="M0 0H34V34H0V0Z" />
                        </mask>
                        <path d="M34 34V33H0V34V35H34V34Z" fill="#E1D9E8" fill-opacity="0.3"
                            mask="url(#path-1-inside-1_366_575)" />
                        <path d="M23 11L11 23M11 11L23 23" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </span>
            <form action="" class="modal-form">
                <input v-model="editedTitle" type="text" required placeholder="Заголовок*" class="modal-input-title" />
                <textarea v-model="editedContent" placeholder="Текст заметки" class="modal-textarea-content"></textarea>
                <button type="button" class="modal-btn-edit-image">
                    <!-- Иконка добавления изображения -->
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 10.5H27M24 7.5V13.5M26 17V24.5C26 25.0304 25.7893 25.5391 25.4142 25.9142C25.0391 26.2893 24.5304 26.5 24 26.5H10C9.46957 26.5 8.96086 26.2893 8.58579 25.9142C8.21071 25.5391 8 25.0304 8 24.5V10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H17.5M26 20.5L22.914 17.414C22.5389 17.0391 22.0303 16.8284 21.5 16.8284C20.9697 16.8284 20.4611 17.0391 20.086 17.414L11 26.5M16 14.5C16 15.6046 15.1046 16.5 14 16.5C12.8954 16.5 12 15.6046 12 14.5C12 13.3954 12.8954 12.5 14 12.5C15.1046 12.5 16 13.3954 16 14.5Z"
                            stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span>Прикрепить изображение</span>
                </button>
                <div class="button-group">
                    <button type="button" class="modal-btn-cancel"
                        @click="emit('closeEditModal')">Отменить</button>
                    <button type="submit" class="modal-btn-edit"
                        @click.prevent="saveChanges()">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
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
}

.modal {
    background-color: var(--color-white);
    padding: var(--spacing-l);
    border-radius: var(--border-radius-m);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 950px;
}

.modal-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-l);
    border-bottom: 1px solid var(--color-bg-card);
}

.modal-heading button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.modal-title {
    font-size: 24px;
    margin-bottom: var(--spacing-m);
}

.modal-form {
    display: flex;
    flex-direction: column;
}

.modal-input-title {
    padding: var(--spacing-m);
    margin-bottom: var(--spacing-m);
    border: 1px solid var(--color-bg-card);
    border-radius: var(--border-radius-s);
    font-size: var(--body-3);
}

.modal-textarea-content {
    padding: var(--spacing-m);
    margin-bottom: var(--spacing-m);
    border: 1px solid var(--color-bg-card);
    border-radius: var(--border-radius-s);
    font-size: 16px;
    resize: vertical;
    min-height: 100px;
}

.modal-btn-edit-image {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
    padding: var(--spacing-s);
    margin-bottom: var(--spacing-l);
    border: 1px dashed var(--color-bg-card);
    border-radius: var(--border-radius-s);
    background-color: var(--color-brand-light-90);
    cursor: pointer;
    width: 290px;
    border-radius: var(--border-radius-l);
    font-size: 16px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-m);
}

.modal-btn-cancel {
    background-color: var(--color-white);
    color: var(--color-brand);
    border: 1px solid var(--color-brand);
    padding: var(--spacing-s) var(--spacing-l);
    width: 240px;
    border-radius: var(--border-radius-l);
    cursor: pointer;
    font-size: var(--body-4);
}

.modal-btn-edit {
    background-color: var(--color-brand);
    color: var(--color-white);
    border: none;
    width: 240px;
    padding: var(--spacing-s) var(--spacing-l);
    border-radius: var(--border-radius-l);
    cursor: pointer;
    font-size: var(--body-4);
}
</style>