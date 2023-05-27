<script setup lang="ts">
interface Props {
  profileIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  profileIcon:
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3890.jpg"
})
</script>
<template>
  <div class="relative flex justify-center">
    <NuxtImg
      :src="props.profileIcon"
      class="h-[100px] w-[100px] rounded-full border-2 border-teal-400 shadow-md shadow-black/70"
    />
    <div
      v-if="$slots.left"
      class="absolute -bottom-[1px] right-16 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400 bg-blue-950 text-xs font-extrabold"
    >
      <slot name="left"></slot>
    </div>
    <div
      v-if="$slots.right"
      class="absolute -bottom-[1px] left-16 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400 bg-blue-950 text-xs font-extrabold"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style scoped>
.border-teal-400 {
  border: solid rgb(45 212 191) 2px;
}
</style>
