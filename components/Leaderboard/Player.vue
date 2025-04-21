<script lang="ts" setup>
interface Props {
  name: string
  isLive: boolean
  mainAccountId?: string
  unranked: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: "Undefined",
  isLive: false,
  unranked: false
})

const { data: badges } = await useLazyFetch(`/api/badges/${props.mainAccountId}`)

const specialPlayers = ["Turdyo", "Eskuns", "Manguier", "Dioubot", "Kurnoth"]
const isSpecialPlayer = computed(() => specialPlayers.includes(props.name))
</script>
<template>
  <div>
    <NuxtLink
      :to="`/player/${name}`"
      :class="unranked ? 'pointer-events-none' : ''"
      class="group relative flex w-[100px] items-center gap-2 text-base font-semibold transition-colors ease-in-out md:w-[170px] md:text-lg"
    >
      <span
        v-if="isSpecialPlayer"
        class="animate-mask-moving bg-gradient-to-r from-yellow-300 via-yellow-800 to-yellow-300 bg-[length:200%] bg-clip-text"
      >
        {{ name }}
      </span>
      <span v-else>{{ name }}</span>
      <Icon v-if="isSpecialPlayer" name="twemoji:crown" />
      <span class="relative flex h-2 w-2" v-if="isLive">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
      </span>
      <div
        v-if="isSpecialPlayer"
        class="absolute left-1/2 top-8 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#22262b] p-4 text-sm font-medium shadow-xl group-hover:block"
      >
        A gagné la Gamers Assembly 2025
      </div>
    </NuxtLink>
    <div class="flex gap-1">
      <div v-for="icon in badges" class="group relative cursor-pointer">
        {{ icon.icon.repeat(icon.count) }}
        <div
          class="absolute left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#22262b] p-4 shadow-xl group-hover:block"
        >
          {{ icon.icon.repeat(icon.count) }} {{ icon.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.animate-mask-moving {
  background-size: 200%;
  animation: mask-moving 2s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes mask-moving {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
