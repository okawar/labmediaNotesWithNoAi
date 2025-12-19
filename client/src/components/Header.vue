<script setup lang="ts">

const emit = defineEmits(['search']);

defineProps<{
    isArchivePage: boolean;
}>();

</script>
<template>
    <header class="header">
        <h1 class="header-logo">Notes</h1>
        <div class="search-wrapper" v-if="!isArchivePage">
            <!-- Иконка поиска -->
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2619 15.0766 18.0303 16.6162L21.7031 20.2891C22.0936 20.6796 22.0936 21.3126 21.7031 21.7031C21.3126 22.0936 20.6796 22.0936 20.2891 21.7031L16.6162 18.0303C15.0766 19.2619 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2ZM11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z"
                    fill="#1B1B1B" />
            </svg>

            <label for="header-search"></label>
            <input class="header-search" type="text" id="header-search" name="header-search" placeholder="Поиск"
                @input="$emit('search', ($event.target as HTMLInputElement).value)" />
        </div>
        <router-link to="/archive" v-if="!isArchivePage" class="archive-link">
            <button class="header-button">
                <span class="archive-icon">
                    <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="36" rx="18" fill="#E1D9E8" fill-opacity="0.3"/>
                        <g clip-path="url(#clip0_221_5686)">
                        <path d="M24 28V19M32 19V22.87C32.0004 23.2474 31.8971 23.6177 31.7013 23.9405C31.5056 24.2632 31.2249 24.5259 30.89 24.7L24.89 27.78C24.6151 27.9229 24.3098 27.9975 24 27.9975C23.6902 27.9975 23.3849 27.9229 23.11 27.78L17.11 24.7C16.7751 24.5259 16.4944 24.2632 16.2987 23.9405C16.1029 23.6177 15.9996 23.2474 16 22.87V19M27.17 8.21C27.4191 8.07074 27.6997 7.99762 27.985 7.99762C28.2704 7.99762 28.551 8.07074 28.8 8.21L33 10.57C33.2975 10.7382 33.5449 10.9824 33.7171 11.2775C33.8893 11.5727 33.98 11.9083 33.98 12.25C33.98 12.5917 33.8893 12.9273 33.7171 13.2225C33.5449 13.5176 33.2975 13.7618 33 13.93L20.82 20.79C20.5702 20.9325 20.2876 21.0074 20 21.0074C19.7124 21.0074 19.4298 20.9325 19.18 20.79L15 18.43C14.7026 18.2618 14.4551 18.0176 14.2829 17.7225C14.1107 17.4273 14.02 17.0917 14.02 16.75C14.02 16.4083 14.1107 16.0727 14.2829 15.7775C14.4551 15.4824 14.7026 15.2382 15 15.07L27.17 8.21ZM33 18.43C33.2975 18.2618 33.5449 18.0176 33.7171 17.7225C33.8893 17.4273 33.98 17.0917 33.98 16.75C33.98 16.4083 33.8893 16.0727 33.7171 15.7775C33.5449 15.4824 33.2975 15.2382 33 15.07L20.83 8.2C20.5819 8.05791 20.3009 7.98315 20.015 7.98315C19.7291 7.98315 19.4481 8.05791 19.2 8.2L15 10.57C14.7026 10.7382 14.4551 10.9824 14.2829 11.2775C14.1107 11.5727 14.02 11.9083 14.02 12.25C14.02 12.5917 14.1107 12.9273 14.2829 13.2225C14.4551 13.5176 14.7026 13.7618 15 13.93L27.18 20.79C27.428 20.9325 27.709 21.0075 27.995 21.0075C28.281 21.0075 28.562 20.9325 28.81 20.79L33 18.43Z" stroke="#7733DD" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <path d="M46.8766 12.8H48.6366L52.7166 24H51.0846L50.0286 20.928H45.4046L44.3326 24H42.7966L46.8766 12.8ZM49.5486 19.552L47.7566 14.32H47.7246L45.8846 19.552H49.5486ZM54.2391 16H55.3591L55.5191 17.12H55.5511C55.9244 16.672 56.3137 16.352 56.7191 16.16C57.1351 15.968 57.6311 15.872 58.2071 15.872C58.6871 15.872 59.1244 15.9573 59.5191 16.128C59.9137 16.288 60.2551 16.5333 60.5431 16.864C60.8311 17.184 61.0497 17.5893 61.1991 18.08C61.3591 18.56 61.4391 19.1253 61.4391 19.776V20.224C61.4391 20.864 61.3591 21.4293 61.1991 21.92C61.0391 22.4 60.8151 22.8053 60.5271 23.136C60.2391 23.4667 59.8977 23.7173 59.5031 23.888C59.1084 24.048 58.6764 24.128 58.2071 24.128C57.6631 24.128 57.1937 24.0427 56.7991 23.872C56.4151 23.7013 56.0524 23.424 55.7111 23.04H55.6791V27.2H54.2391V16ZM57.8071 22.816C58.4577 22.816 58.9751 22.608 59.3591 22.192C59.7431 21.7653 59.9351 21.1093 59.9351 20.224V19.776C59.9351 18.912 59.7377 18.2667 59.3431 17.84C58.9591 17.4027 58.4471 17.184 57.8071 17.184C57.1564 17.184 56.6391 17.3973 56.2551 17.824C55.8711 18.24 55.6791 18.8907 55.6791 19.776V20.224C55.6791 21.088 55.8711 21.7387 56.2551 22.176C56.6497 22.6027 57.1671 22.816 57.8071 22.816ZM65.0337 19.872L62.3617 16H63.9937L65.9457 18.848L67.8977 16H69.4977L66.8257 19.84L69.6897 24H67.9937L65.9137 20.928L63.8337 24H62.1697L65.0337 19.872ZM71.1297 16H72.5697V22.24H72.6017L76.0897 16H78.0097V24H76.5697V17.76H76.5377L73.0497 24H71.1297V16ZM80.4109 16H83.5309C84.5763 16 85.3283 16.2027 85.7869 16.608C86.2563 17.0133 86.4909 17.552 86.4909 18.224C86.4909 18.5653 86.4056 18.8747 86.2349 19.152C86.0643 19.4187 85.8189 19.6427 85.4989 19.824V19.856C85.9149 20.0267 86.2349 20.272 86.4589 20.592C86.6936 20.9013 86.8109 21.264 86.8109 21.68C86.8109 22.4053 86.5763 22.976 86.1069 23.392C85.6483 23.7973 84.8963 24 83.8509 24H80.4109V16ZM84.9869 18.304C84.9869 17.9947 84.8749 17.7547 84.6509 17.584C84.4376 17.4027 84.0376 17.312 83.4509 17.312H81.8509V19.312H83.4509C84.0376 19.312 84.4376 19.2267 84.6509 19.056C84.8749 18.8747 84.9869 18.624 84.9869 18.304ZM85.3069 21.6C85.3069 21.2587 85.1949 20.9973 84.9709 20.816C84.7469 20.624 84.3469 20.528 83.7709 20.528H81.8509V22.688H83.7709C84.3469 22.688 84.7469 22.5973 84.9709 22.416C85.1949 22.224 85.3069 21.952 85.3069 21.6Z" fill="#1B1B1B"/>
                        <defs>
                        <clipPath id="clip0_221_5686">
                        <path d="M12 14C12 9.58172 15.5817 6 20 6H28C32.4183 6 36 9.58172 36 14V22C36 26.4183 32.4183 30 28 30H20C15.5817 30 12 26.4183 12 22V14Z" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </span>
                <span class="archive-text">Архив</span>
            </button>
        </router-link>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-logo {
    font-size: var(--heading-xl);
    -webkit-text-stroke: 1px var(--color-bg-card);
    color: var(--color-text);
    cursor: default;
}

.header-search {
    width: 100%;
    box-sizing: border-box;
    padding: var(--spacing-s) 0 var(--spacing-s) 50px;
    border-radius: var(--border-radius-l);
    border: none;
    background-color: var(--color-bg-card);
    font-size: var(--body-4);
    color: var(--color-black);
}

.header-button {
    width: 240px;
    padding: var(--spacing-sm) 0;
    background-color: var(--color-brand-a56);
    border: none;
    color: var(--color-white);
    border-radius: var(--border-radius-l);
    font-size: var(--body-4);
    cursor: pointer;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    margin: 0 var(--spacing-l);
}

.search-icon {
    position: absolute;
    left: var(--spacing-m);
}

.archive-icon {
    display: none;
}

@media (max-width: 720px) {
    .header {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "search search"
            "logo archive";
        gap: var(--spacing-m);
        align-items: center;
    }

    .search-wrapper {
        grid-area: search;
        margin: 0;
        width: 100%;
    }

    .header-logo {
        grid-area: logo;
    }

    .archive-link {
        grid-area: archive;
        justify-self: end;
    }

    .header-search {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
    }
    
    .header-button {
        width: 100px;
        height: 36px;
        background: var(--color-bg-card-a30);
        border-radius: var(--border-radius-l);
        color: var(--color-text);
        font-weight: var(--font-weight-medium);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }

    .header-button .archive-text {
        display: none;
    }

    .archive-icon{
        display: flex;
        cursor: pointer;
    }
}
</style>