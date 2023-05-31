<script lang="ts" setup>
interface Props {
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  name: "Undefined"
})

const { data: playerLive } = useLazyFetch(`/api/player/${props.name}/live`)
</script>
<template>
  <NuxtLink
    :to="`/player/${name}`"
    class="flex w-[170px] text-lg font-semibold transition-colors ease-in-out hover:text-cyan-400"
  >
    {{ name
    }}<span class="relative flex h-2 w-2" v-if="playerLive">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
    </span>
  </NuxtLink>
</template>
