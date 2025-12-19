<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useNotesStore } from '../stores/notes';

const props = defineProps<{
    mode: 'add' | 'edit';
}>();

const notesStore = useNotesStore();

const title = ref('');
const text = ref('');
const fileToUpload = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isImageRemoved = ref(false);


watch(() => notesStore.isAddModalOpen, (isOpen) => {
    if (props.mode === 'add' && isOpen) {
        clearForm();
    }
});

watch(() => notesStore.noteToEdit, (newNote) => {
    if (props.mode === 'edit' && newNote) {
        title.value = newNote.title;
        text.value = newNote.text || '';
        imagePreview.value = newNote.image || null;
        fileToUpload.value = null;
        isImageRemoved.value = false;
    }
}, { immediate: true });

function triggerFileInput() {
    fileInput.value?.click();
}

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
        fileToUpload.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
}

const removeImage = () => {
    fileToUpload.value = null;
    imagePreview.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
    isImageRemoved.value = true;
}

const clearForm = () => {
    title.value = '';
    text.value = '';
    removeImage();
};

function closeModal() {
    if (props.mode === 'add') {
        notesStore.closeAddModal();
    } else {
        notesStore.closeEditModal();
    }
}

function saveNote() {
    if (props.mode === 'add') {
        notesStore.addNote({
            title: title.value,
            text: text.value,
            file: fileToUpload.value || undefined,
        });
    } else if (notesStore.noteToEdit) {
        notesStore.editNote(
            notesStore.noteToEdit.id,
            {
                title: title.value,
                text: text.value,
                file: fileToUpload.value,
                remove_image: isImageRemoved.value,
            }
        );
    }
    closeModal();
}

const isModalOpen = computed(() => {
    return props.mode === 'add' ? notesStore.isAddModalOpen : notesStore.isEditModalOpen;
});

const modalTitle = computed(() => {
    return props.mode === 'add' ? 'Новая заметка' : 'Редактирование заметки';
});

watch(isModalOpen, (isOpen) => {
    if (!isOpen) {
        clearForm();
    }
});

const isFormValid = computed(() => {
    return title.value.trim() !== '';
});

</script>

<template>
    <transition name="fade">
        <div class="modal-backdrop" v-if="isModalOpen">
            <div class="modal">
                <span class="modal-heading">
                    <h2 class="modal-title">{{ modalTitle }}</h2>
                    <button @click="closeModal" class="modal-close-btn">
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
                <form action="" class="modal-form" @submit.prevent="saveNote">
                    <div class="form-header">
                        <button type="button" class="modal-btn-add-image" @click="triggerFileInput">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21 10.5H27M24 7.5V13.5M26 17V24.5C26 25.0304 25.7893 25.5391 25.4142 25.9142C25.0391 26.2893 24.5304 26.5 24 26.5H10C9.46957 26.5 8.96086 26.2893 8.58579 25.9142C8.21071 25.5391 8 25.0304 8 24.5V10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H17.5M26 20.5L22.914 17.414C22.5389 17.0391 22.0303 16.8284 21.5 16.8284C20.9697 16.8284 20.4611 17.0391 20.086 17.414L11 26.5M16 14.5C16 15.6046 15.1046 16.5 14 16.5C12.8954 16.5 12 15.6046 12 14.5C12 13.3954 12.8954 12.5 14 12.5C15.1046 12.5 16 13.3954 16 14.5Z"
                                    stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <input v-model="title" type="text" required placeholder="Заголовок*" class="modal-input-title" />
                    <textarea v-model="text" placeholder="Текст заметки" class="modal-textarea-text"
                        :class="{ 'with-image': imagePreview }"></textarea>
                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;" />

                    <div v-if="imagePreview" class="image-preview">
                        <img :src="imagePreview" alt="Предпросмотр изображения" />
                        <button type="button" @click="removeImage" class="image-preview__remove-btn">
                            &times;
                        </button>
                    </div>
                    <div class="button-group">
                        <button type="button" class="modal-btn-cancel" @click="closeModal">Отменить</button>
                        <button type="submit" class="modal-btn-add" :disabled="!isFormValid" :class="{ 'modal-btn-add--disabled': !isFormValid }">Сохранить</button>
                    </div>
                </form>
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
    width: 950px;
    transition: all 0.3s ease;
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

.modal-textarea-text {
    padding: var(--spacing-m);
    margin-bottom: var(--spacing-m);
    border: 1px solid var(--color-bg-card);
    border-radius: var(--border-radius-s);
    font-size: 16px;
    resize: vertical;
    min-height: 475px;
}

.modal-textarea-text.with-image {
    min-height: 240px;
}

.form-header {
    display: flex;
    justify-content: flex-end;
}

.modal-btn-add-image {
    background: none;
    border: none;
    cursor: pointer;
}

.image-preview {
    position: relative;
    margin-bottom: var(--spacing-l);
    max-width: 200px;
}

.image-preview img {
    width: 100%;
    border-radius: var(--border-radius-s);
    border: 1px solid var(--color-bg-card);
}

.image-preview__remove-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-m);
}

.modal-btn-cancel,
.modal-btn-add {
    padding: var(--spacing-s) var(--spacing-l);
    width: 240px;
    border-radius: var(--border-radius-l);
    cursor: pointer;
    font-size: var(--body-4);
}

.modal-btn-cancel {
    background-color: var(--color-white);
    color: var(--color-brand);
    border: 1px solid var(--color-brand);
}

.modal-btn-add {
    background-color: var(--color-brand);
    color: var(--color-white);
    border: none;
    transition: background-color 0.3s ease;
}

.modal-btn-add--disabled {
    background-color: var(--color-bg-card);
    cursor: not-allowed;
}

@media (max-width: 720px) {
    .modal {
        padding-top: 20px;
        max-width: 340px;
        height: 750px;
    }

    .modal-heading {
        border: none;
        display: none;
    }

    .modal-title {
        display: none;
    }

    .modal-input-title,
    .modal-textarea-text {
        width: 90%;
        margin-left: -5px;
    }

    .button-group {
        width: 100%;
    }

    .modal-textarea-text {
        height: 475px;
    }

    .modal-textarea-text.with-image {
        height: 240px;
    }

    .button-group {
        flex-direction: column;
        align-items: center;
    }

    .modal-btn-cancel,
    .modal-btn-add {
        width: 100%;
    }

    .modal-close-btn {
        display: none;
    }
}
</style>