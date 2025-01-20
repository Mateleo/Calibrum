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
      sizes="100px"
      quality="90"
      format="webp"
      class="h-[100px] w-[100px] rounded-full border-2 border-teal-400 shadow-md shadow-black/70"
    />
    <div
      v-if="$slots.left"
      class="absolute -bottom-[1px] right-16 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400 bg-blue-900 text-xs font-extrabold"
    >
      <slot name="left"></slot>
    </div>
    <div
      v-if="$slots.right"
      class="absolute -bottom-[1px] left-16 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400 bg-blue-900 text-xs font-extrabold"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style scoped></style>
