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
</script>
<template>
  <div>
    <NuxtLink
      :to="`/player/${name}`"
      :class="unranked ? 'pointer-events-none' : ''"
      class="flex w-[100px] text-base font-semibold transition-colors ease-in-out hover:text-cyan-400 md:w-[170px] md:text-lg"
    >
      {{ name }}
      <span class="relative flex h-2 w-2" v-if="isLive">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
      </span>
    </NuxtLink>
    <div>
      <div v-for="icon in badges" :title="icon.message" class="cursor-pointer">
        {{ icon.icon.repeat(icon.count) }}
      </div>
    </div>
  </div>
</template>
