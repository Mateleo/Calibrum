<script setup lang="ts">
const { data: player } = await useLazyFetch("/api/player/Kurnoth")
</script>
<template>
  <CommonInnerTitleSection v-if="player" title="Player of the Year 2025">
    <div class="flex items-center justify-center text-center">
      <NuxtLink :to="`/player/${player.name}`" class="group flex items-center gap-4 text-[#d0d1d2]">
        <NuxtImg
          sizes="120px"
          quality="70"
          format="webp"
          class="size-[70px] rounded-lg"
          :src="player.accounts[0].profileIcon"
        />
        <div class="flex flex-col items-start gap-2">
          <p class="transition-all ease-in group-hover:text-sky-500">
            {{ player.name }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </CommonInnerTitleSection>
</template>
