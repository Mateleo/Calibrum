<script setup lang="ts"></script>
<template>
  <header
    class="z-10 m-auto mt-4 h-[64px] w-[94%] max-w-[1500px] gap-4 rounded-md bg-[#22262b] py-2 shadow-lg shadow-black/30 md:gap-8 md:rounded-xl"
  >
    <div class="flex h-full justify-between gap-4 px-2 md:grid md:grid-cols-10 md:justify-center md:px-0">
      <div class="flex md:col-span-3">
        <NuxtLink to="/" class="flex items-center border-r-[1px] md:px-4">
          <div class="w-[42px] md:ml-2">
            <NuxtImg src="img/logo.png" sizes="64px" format="webp" quality="70"></NuxtImg>
          </div>
          <div class="hidden flex-row-reverse px-2 md:flex" to="/">
            <h1 class="hidden text-3xl font-semibold md:block">Calibrum</h1>
          </div>
        </NuxtLink>
      </div>
      <HeaderSearchBar class="grow md:col-span-4"></HeaderSearchBar>
      <nav class="flex flex-col md:col-span-3 md:ml-auto md:px-4">
        <NuxtLink
          to="/blog"
          class="-mt-1 flex grow items-center gap-1 whitespace-nowrap border-b-[4px] border-transparent pt-[6px] text-xs font-semibold transition-colors ease-in hover:border-cyan-300 sm:text-base"
        >
          <span class="relative mr-1 flex size-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-sky-500"></span>
          </span>
          Blog
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
