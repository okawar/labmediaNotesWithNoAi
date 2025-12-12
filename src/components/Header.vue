<script setup>

const emit = defineEmits(['search'])

</script>
<template>
    <header class="header">
        <router-link to="/">
            <h1 class="header-logo">Notes</h1>
        </router-link>
        <div class="search-wrapper">
            <!-- Иконка поиска -->
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2619 15.0766 18.0303 16.6162L21.7031 20.2891C22.0936 20.6796 22.0936 21.3126 21.7031 21.7031C21.3126 22.0936 20.6796 22.0936 20.2891 21.7031L16.6162 18.0303C15.0766 19.2619 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2ZM11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z"
                    fill="#1B1B1B" />
            </svg>

            <label for="header-search"></label>
            <input class="header-search" type="text" id="header-search" name="header-search" placeholder="Поиск"
                @input="$emit('search', $event.target.value)" />
        </div>
        <router-link to="/archive">
            <button class="header-button">Архив</button>
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
    font-size: 42px;
    -webkit-text-stroke: 1px var(--color-card-border);
}

.header-search {
    width: 820px;
    padding: var(--spacing-s) 0 var(--spacing-s) 50px;
    border-radius: var(--border-radius-l);
    border: none;
    background-color: var(--color-bg-card);
    font-size: 18px;
    color: #000;
}

.header-button {
    width: 240px;
    padding: 15px 0;
    background-color: var(--color-brand);
    border: none;
    color: #fff;
    border-radius: var(--border-radius-l);
    font-size: 18px;
    cursor: pointer;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    left: var(--spacing-m);
}
</style>