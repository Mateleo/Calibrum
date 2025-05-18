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

// const specialPlayers = ["Turdyo", "Eskuns", "Manguier", "Dioubot", "Kurnoth"]
// const isSpecialPlayer = computed(() => specialPlayers.includes(props.name))
const isSpecialPlayer = ref(false)
</script>

<template>
  <div>
    <NuxtLink
      :to="`/player/${name}`"
      :class="unranked ? 'pointer-events-none' : ''"
      class="group relative flex w-[100px] items-center gap-2 text-base font-semibold transition-colors ease-in-out md:w-[170px] md:text-lg"
    >
      <div class="relative inline-block">
        <span
          v-if="isSpecialPlayer"
          class="animate-mask-moving bg-gradient-to-r from-yellow-300 via-yellow-600 to-yellow-300 bg-[length:200%] bg-clip-text text-transparent"
        >
          {{ name }}
        </span>
        <span v-else>{{ name }}</span>

        <!-- Glow effect -->
        <span
          v-if="isSpecialPlayer"
          class="absolute inset-0 -z-10 opacity-70 blur-md"
          :style="{
            background:
              'linear-gradient(90deg, rgba(253,224,71,0.5) 0%, rgba(161,98,7,0.5) 50%, rgba(253,224,71,0.5) 100%)',
            backgroundSize: '200% 100%',
            animation: 'mask-moving 2s linear infinite'
          }"
        ></span>
      </div>

      <Icon v-if="isSpecialPlayer" name="twemoji:crown" class="drop-shadow-glow text-yellow-400" />
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
    <div class="flex">
      <ClientOnly>
        <UiHoverCard v-for="icon in badges" class="group relative cursor-pointer" :open-delay="0" :close-delay="0">
          <UiHoverCardTrigger class="cursor-pointer">{{ icon.icon.repeat(icon.count) }}</UiHoverCardTrigger>
          <UiHoverCardContent>{{ icon.icon.repeat(icon.count) }} {{ icon.message }}</UiHoverCardContent>
        </UiHoverCard>
      </ClientOnly>
    </div>
  </div>
</template>

<style>
@keyframes mask-moving {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.drop-shadow-glow {
  filter: drop-shadow(0 0 4px rgba(253, 224, 71, 0.7));
}

/* Enhanced text animation */
.animate-mask-moving {
  background-size: 200%;
  animation:
    mask-moving 2s linear infinite,
    text-pulse 1.5s ease-in-out infinite alternate;
  text-shadow: 0 0 8px rgba(253, 224, 71, 0.3);
  position: relative;
  z-index: 1;
}

@keyframes text-pulse {
  0% {
    transform: scale(1);
    text-shadow: 0 0 8px rgba(253, 224, 71, 0.3);
  }
  100% {
    transform: scale(1.02);
    text-shadow: 0 0 12px rgba(253, 224, 71, 0.6);
  }
}
</style>
