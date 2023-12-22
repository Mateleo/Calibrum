<script lang="ts" setup></script>
<template>
  <footer class="absolute bottom-0 w-full" v-once>
    <div class="flex justify-between px-6 pb-2 text-xs text-white/50">
      <div class="flex gap-2">
        <!-- <NuxtLink to="/faq" class="transition-all ease-in hover:text-white">FAQ</NuxtLink>
        <NuxtLink to="/dev-team" class="transition-all ease-in hover:text-white">DevTeam</NuxtLink>
        <NuxtLink to="/" class="hover:text-white transition-all ease-in">Terms of services</NuxtLink> -->
        <p>Made by Turdyo & <a href="https://mateo-siam.com" target="_blank" class="underline">Mateleo</a></p>
      </div>
      <!-- <div>Copyright © 2023 4eSport Tous droits réservés.</div> -->
      <div class="flex gap-6">
        <a href="https://www.discord.gg/4eSport" target="-blank" class="transition-all ease-in hover:text-white">
          <Icon name="ic:sharp-discord" size="1.6em" cursor="pointer"></Icon>
        </a>
        <a
          href="https://www.instagram.com/4esport_efrei/"
          target="-blank"
          class="transition-all ease-in hover:text-white"
        >
          <Icon name="mdi:instagram" size="1.6em" cursor="pointer"></Icon>
        </a>
        <a href="https://twitter.com/4esport_efrei" target="-blank" class="transition-all ease-in hover:text-white">
          <Icon name="mdi:twitter" size="1.6em" cursor="pointer"></Icon>
        </a>
        <a
          href="https://4esport.fr/"
          target="-blank"
          class="w-[22px] opacity-50 transition-all ease-in hover:opacity-100"
        >
          <NuxtImg src="img/4es_logo.png"></NuxtImg>
        </a>
      </div>
    </div>
  </footer>
</template>
