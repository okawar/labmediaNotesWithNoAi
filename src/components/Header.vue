<script setup>

</script>
<template>
    <header class="header">
        <h1 class="header-logo">Notes</h1>
        <div class="search-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <label for="header-search"></label>
            <input class="header-search" type="text" id="header-search" name="header-search"
                placeholder="Search notes..." />
        </div>
        <button class="header-button">Архив</button>
    </header>
</template>

<style scoped>

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-logo{
        font-size: 42px;
        -webkit-text-stroke: 1px #7733DD;
    }

    .header-search{
        padding: 13px 600px 13px 40px;
        border-radius: 50px;
        border: none;
        background-color: #E1D9E8;
        font-size: 18px;
        color: #000;
    }

    .header-button{
        width: 240px;
        padding: 15px 0;
        background-color: #7733DD;
        border: none;
        color: #fff;
        border-radius: 50px;
        font-size: 18px;
        cursor: pointer;
    }

    .search-wrapper{
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 15px;
    }

</style>