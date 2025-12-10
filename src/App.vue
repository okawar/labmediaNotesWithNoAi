<script setup lang="ts">
import { computed, ref } from 'vue';
import Header from './components/Header.vue';
import ListNotes from './components/ListNotes.vue';
import Footer from './components/Footer.vue';
import DeleteModal from './components/DeleteModal.vue';

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

const modalDeleteVisible = ref(false);

function handleClickDelete() {
	modalDeleteVisible.value = true;
}

function handleCloseModal() {
	modalDeleteVisible.value = false;
}

const countNotes = computed(() => notes.value.length);
</script>

<template>
	<div class="container">
		<Header />
		<ListNotes @openDeleteModal="handleClickDelete" :notes="notes" />
		<Footer :count="countNotes"/>
		<div class="add-note">
			<button class="add-note__btn">
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
		<DeleteModal :modalDeleteVisible="modalDeleteVisible" @closeDeleteModal="handleCloseModal"/>
	</div>
</template>

<style scoped>
	.add-note {
		position: fixed;
		bottom: 30px;
		right: 30px;
	}

	.add-note__btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}
</style>
