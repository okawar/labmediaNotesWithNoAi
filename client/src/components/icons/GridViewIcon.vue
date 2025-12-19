<script setup lang="ts">
defineProps<{
  isActive: boolean
}>();
</script>

<template>
    <div v-if="isActive">
        <!-- Иконка активной плитки -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="9.41177" fill="var(--color-brand-add)" fill-opacity="0.9" />
            <path
                d="M16.4706 9.41174H10.5882C9.93847 9.41174 9.41174 9.93847 9.41174 10.5882V16.4706C9.41174 17.1203 9.93847 17.647 10.5882 17.647H16.4706C17.1203 17.647 17.647 17.1203 17.647 16.4706V10.5882C17.647 9.93847 17.1203 9.41174 16.4706 9.41174Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M29.4117 9.41174H23.5294C22.8796 9.41174 22.3529 9.93847 22.3529 10.5882V16.4706C22.3529 17.1203 22.8796 17.647 23.5294 17.647H29.4117C30.0615 17.647 30.5882 17.1203 30.5882 16.4706V10.5882C30.5882 9.93847 30.0615 9.41174 29.4117 9.41174Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M29.4117 22.3529H23.5294C22.8796 22.3529 22.3529 22.8796 22.3529 23.5294V29.4117C22.3529 30.0615 22.8796 30.5882 23.5294 30.5882H29.4117C30.0615 30.5882 30.5882 30.0615 30.5882 29.4117V23.5294C30.5882 22.8796 30.0615 22.3529 29.4117 22.3529Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M16.4706 22.3529H10.5882C9.93847 22.3529 9.41174 22.8796 9.41174 23.5294V29.4117C9.41174 30.0615 9.93847 30.5882 10.5882 30.5882H16.4706C17.1203 30.5882 17.647 30.0615 17.647 29.4117V23.5294C17.647 22.8796 17.1203 22.3529 16.4706 22.3529Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
    <div v-else>
        <!-- Иконка неактивной плитки -->
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.588235" y="0.588235" width="38.8235" height="38.8235" rx="8.82353" stroke="var(--color-brand-add)"
                stroke-opacity="0.9" stroke-width="1.17647" />
            <path
                d="M16.4706 9.41174H10.5882C9.93847 9.41174 9.41174 9.93847 9.41174 10.5882V16.4706C9.41174 17.1203 9.93847 17.647 10.5882 17.647H16.4706C17.1203 17.647 17.647 17.1203 17.647 16.4706V10.5882C17.647 9.93847 17.1203 9.41174 16.4706 9.41174Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M29.4117 9.41174H23.5294C22.8796 9.41174 22.3529 9.93847 22.3529 10.5882V16.4706C22.3529 17.1203 22.8796 17.647 23.5294 17.647H29.4117C30.0615 17.647 30.5882 17.1203 30.5882 16.4706V10.5882C30.5882 9.93847 30.0615 9.41174 29.4117 9.41174Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M29.4117 22.3529H23.5294C22.8796 22.3529 22.3529 22.8796 22.3529 23.5294V29.4117C22.3529 30.0615 22.8796 30.5882 23.5294 30.5882H29.4117C30.0615 30.5882 30.5882 30.0615 30.5882 29.4117V23.5294C30.5882 22.8796 30.0615 22.3529 29.4117 22.3529Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M16.4706 22.3529H10.5882C9.93847 22.3529 9.41174 22.8796 9.41174 23.5294V29.4117C9.41174 30.0615 9.93847 30.5882 10.5882 30.5882H16.4706C17.1203 30.5882 17.647 30.0615 17.647 29.4117V23.5294C17.647 22.8796 17.1203 22.3529 16.4706 22.3529Z"
                stroke="var(--color-text)" stroke-width="2.35294" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
</template>