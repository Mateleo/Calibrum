<script setup lang="ts">

interface Props {
    profileIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
    profileIcon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3890.jpg"
})

</script>
<template>
    <div class="relative flex justify-center">
        <NuxtImg :src="props.profileIcon"
            class="w-[100px] h-[100px] rounded-full shadow-md shadow-black/70 border-2 border-teal-400" />
        <div v-if="$slots.left" class="absolute -bottom-[1px] right-16 flex items-center justify-center w-10 h-10
                text-xs font-extrabold bg-blue-950 border-2 border-teal-400 rounded-full">
            <slot name="left"></slot>

        </div>
        <div v-if="$slots.right" class="absolute -bottom-[1px] left-16 flex items-center justify-center w-10 h-10
                text-xs font-extrabold bg-blue-950 border-2 border-teal-400 rounded-full">
            <slot name="right"></slot>
        </div>
    </div>
</template>