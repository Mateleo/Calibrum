<script setup lang="ts"></script>
<template>
    <header class="gap-4 md:gap-8 bg-[#22262b] shadow-lg shadow-black/30 sticky top-0 py-1">
        <div class="flex md:grid md:grid-cols-3 lg:grid-cols-10 items-center max-w-[2000px] m-auto">
            <div class="lg:col-span-3">
                <NuxtLink to="/"
                    class="flex items-center px-2 md:px-4 border-r-[1px] border-gray-500/50 md:border-transparent pr-4">
                    <div class="ml-2 w-[48px]">
                        <NuxtImg src="img/logo.png"></NuxtImg>
                    </div>
                    <div class="hidden md:flex flex-row-reverse p-2" to="/">
                        <h1 class="hidden lg:block text-4xl font-bold">Calibrum</h1>
                    </div>
                </NuxtLink>
            </div>
            <div
                class="hidden lg:col-span-4 w-full m-auto max-w-[500px] md:flex items-center border-2 border-gray-600 p-2 focus-within:outline-none focus-within:border-sky-400 focus-within:border-2 rounded-lg focus-within:shadow-lg focus-within:shadow-black/40">
                <input placeholder="Search..." class="w-full block bg-[#22262b] focus:outline-none" />
                <Icon name="material-symbols:search" size="1.6em"></Icon>
            </div>
            <nav class="px-4 md:ml-auto text-white/80 md:text-white/95 lg:col-span-3">
                <NuxtLink to="/live-games"
                    class="border-b-[4px] hover:border-cyan-300 border-transparent flex items-center transition-colors ease-in grow font-semibold pt-[6px] whitespace-nowrap">
                    LIVE GAMES (WIP)
                </NuxtLink>
            </nav>
        </div>
    </header>
</template>
