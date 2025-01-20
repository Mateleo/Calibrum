<script setup lang="ts"></script>
<template>
  <header
    class="z-10 m-auto mt-4 h-[64px] w-[98%] max-w-[1500px] gap-4 rounded-md bg-[#22262b] py-2 shadow-lg shadow-black/30 md:w-[95%] md:gap-8 md:rounded-xl"
  >
    <div class="flex h-full justify-between gap-4 px-2 md:grid md:justify-center md:px-0 lg:grid-cols-10">
      <div class="hidden md:flex lg:col-span-3">
        <NuxtLink
          to="/"
          class="flex items-center border-r-[1px] border-gray-500/50 px-2 pr-4 md:border-transparent md:px-4"
        >
          <div class="ml-2 w-[42px]">
            <NuxtImg src="img/logo.png" sizes="64px" format="webp" quality="70"></NuxtImg>
          </div>
          <div class="hidden flex-row-reverse px-2 md:flex" to="/">
            <h1 class="hidden text-3xl font-bold lg:block">Calibrum</h1>
          </div>
        </NuxtLink>
      </div>
      <HeaderSearchBar class="grow"></HeaderSearchBar>
      <nav class="flex flex-col md:ml-auto md:px-4 lg:col-span-3">
        <NuxtLink
          to="/live-games"
          class="flex grow items-center whitespace-nowrap border-b-[4px] border-transparent pt-[6px] text-xs font-semibold transition-colors ease-in hover:border-cyan-300 sm:text-base"
        >
          Blog (WIP)
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
