<script lang="ts" setup>
interface Props {
  name: string
  isLive: boolean
  mainAccountId?:string
}

const props = withDefaults(defineProps<Props>(), {
  name: "Undefined",
  isLive: false
})

const {data:badges} = useLazyFetch(`/api/badges/${props.mainAccountId}`)

</script>
<template>
  <div>
  <NuxtLink
    :to="`/player/${name}`"
    class="flex w-[100px] text-base md:text-lg font-semibold transition-colors ease-in-out hover:text-cyan-400 md:w-[170px]"
  >
    {{ name
    }}<span class="relative flex h-2 w-2" v-if="isLive">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
    </span>
  </NuxtLink>
  <div>
    {{ badges }}
  </div>
</div>
</template>
