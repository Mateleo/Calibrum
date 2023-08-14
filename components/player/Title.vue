<script lang="ts" setup>
interface Props {
  role?: string
  profileIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  role: "adc",
  profileIcon:
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3890.jpg"
})
</script>
<template>
  <CommonSection class="flex md:w-[300px] shrink-0 flex-col items-center gap-2 rounded-lg">
    <PlayerProfileIcon :profile-icon="props.profileIcon">
      <template #left>
        <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]" />
      </template>
    </PlayerProfileIcon>
    <h1 class="text-center text-2xl font-semibold">
      <slot />
    </h1>
  </CommonSection>
</template>
