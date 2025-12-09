<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import ListNotes from './components/ListNotes.vue';

const notes = ref([
	{
		number: 1,
		title: 'Обязательный заголовок',
		content: 'Composition API — это новый способ организации и написания компонентов в Vue.js, который был представлен в версии 3.0. Он предоставляет более гибкий и мощный подход к созданию компонентов по сравнению с Options API.',
		// imgSrc: 'https://fastly.picsum.photos/id/1060/70/70.jpg?hmac=ERAlIoEotrmvKFrS0mxV49-ku45vMSnvqTWKJV-TwYo',
		created_at: '03.03.2004',
	},
	{
		number: 2,
		title: 'Второй заголовок',
		content: 'Еще один пример заметки с использованием Composition API в Vue.js. Этот подход позволяет лучше структурировать код и повторно использовать логику между компонентами.',
		imgSrc: 'https://fastly.picsum.photos/id/1060/70/70.jpg?hmac=ERAlIoEotrmvKFrS0mxV49-ku45vMSnvqTWKJV-TwYo',
		created_at: '15.07.2021',
	},	
	{
		number: 3,
		title: 'Идеи для нового проекта',
		content: 'Нужно продумать стек технологий для нового пет-проекта. Возможно, стоит попробовать SvelteKit или SolidStart для разнообразия. Также рассмотреть использование tRPC для типизированного API.',
		created_at: '21.11.2023',
	},
	{
		number: 4,
		title: 'Список покупок',
		content: 'Молоко, хлеб, яйца, сыр, овощи.',
		imgSrc: 'https://fastly.picsum.photos/id/237/70/70.jpg?hmac=6OKP2b3cT20T2t2v5utBbl2r-a-5fPynX22v-9i5stc',
		created_at: '01.02.2024',
	},
	{
		number: 5,
		title: 'Подготовка к встрече',
		content: 'Собрать все необходимые документы и подготовить презентацию по итогам квартала. Встреча в 15:00.',
		created_at: '10.05.2024',
	},
	{
		number: 6,
		title: 'Рецепт пасты Карбонара',
		content: 'Спагетти, гуанчале (или бекон), яичные желтки, сыр Пекорино Романо, черный перец. Главное – не добавлять сливки!',
		imgSrc: 'https://fastly.picsum.photos/id/1080/70/70.jpg?hmac=nSGrGf_Gc-wdg_20a3sAnN0Z9iTBp2yrj2_iL-d2EL4',
		created_at: '08.08.2022',
	}

]);
</script>

<template>
	<div class="container">
		<Header />
		<ListNotes :notes="notes" />
	</div>
</template>

<style scoped></style>
