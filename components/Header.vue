<script setup lang="ts"></script>
<template>
  <header class="sticky top-0 z-10 h-[64px] gap-4 bg-[#22262b] py-2 shadow-lg shadow-black/30 md:gap-8">
    <div class="m-auto flex max-w-[2000px] justify-center md:grid md:grid-cols-3 lg:grid-cols-10">
      <div class="hidden md:block lg:col-span-3">
        <NuxtLink
          to="/"
          class="flex items-center border-r-[1px] border-gray-500/50 px-2 pr-4 md:border-transparent md:px-4"
        >
          <div class="ml-2 w-[48px]">
            <NuxtImg src="img/logo.png"></NuxtImg>
          </div>
          <div class="hidden flex-row-reverse px-2 md:flex" to="/">
            <h1 class="hidden text-4xl font-bold lg:block">Calibrum</h1>
          </div>
        </NuxtLink>
      </div>
      <HeaderSearchBar class=""></HeaderSearchBar>
      <nav class="mt-2 px-4 text-white/80 md:ml-auto md:text-white/95 lg:col-span-3">
        <!-- <NuxtLink
          to="/live-games"
          class="text-xs sm:text-base flex grow items-center whitespace-nowrap border-b-[4px] border-transparent pt-[6px] font-semibold transition-colors ease-in hover:border-cyan-300"
        >
          LIVE GAMES (WIP)
        </NuxtLink> -->
      </nav>
    </div>
  </header>
</template>
