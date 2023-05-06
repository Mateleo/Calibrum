<script setup lang="ts"></script>
<template>
    <header class="grid grid-cols-5 gap-8 bg-[#22262b] shadow-lg shadow-black/30 items-center sticky top-0 h-[68px]">
        <NuxtLink to="/" class="flex items-center px-4">
            <div class="ml-2 w-[48px]">
                <NuxtImg src="logo.png"></NuxtImg>
            </div>
            <div class="px-2 flex flex-row-reverse" to="/">
                <h1 class="hidden lg:block text-4xl font-bold">Calibrum</h1>
            </div>
        </NuxtLink>
        <div
            class="col-span-3 w-full m-auto max-w-[500px] flex items-center border-2 border-gray-600 p-2 focus-within:outline-none focus-within:border-sky-400 focus-within:border-2 rounded-lg focus-within:shadow-lg focus-within:shadow-black/40">
            <input placeholder="Search..." class="w-full block bg-[#22262b] focus:outline-none" />
            <Icon name="material-symbols:search" size="1.6em"></Icon>
        </div>
        <nav class="flex h-full m-auto mr-0 px-4">
            <NuxtLink to="/live-games"
                class="border-b-[4px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in grow font-semibold pt-[6px] whitespace-nowrap">
                LIVE GAMES (WIP)
            </NuxtLink>
        </nav>
    </header>
</template>
