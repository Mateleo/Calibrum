<script lang=ts setup>

interface props {
    role?: string
    profileIcon?: string
}

const props = withDefaults(defineProps<props>(), {
    role: "adc",
    profileIcon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3890.jpg"
})


</script>
<template>
    <div>
        <CommonSection class="flex flex-col w-[300px] shrink-0 gap-2 items-center rounded-lg">
            <div class="relative flex justify-center">
                <NuxtImg :src="props.profileIcon"
                    class="rounded-full w-[35%] shadow-md shadow-black/70 border-2 border-teal-400"></NuxtImg>

                <div class="absolute -bottom-[1px] left-[95px] flex items-center justify-center w-10 h-10
                    text-xs font-extrabold bg-blue-950 border-2 border-teal-400 rounded-full">
                    <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]">
                    </NuxtImg>
                </div>
            </div>
            <h1 class="text-2xl font-semibold text-center">
                <slot></slot>
            </h1>

        </CommonSection>
    </div>
</template>