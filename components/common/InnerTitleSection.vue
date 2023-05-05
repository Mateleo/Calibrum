<script setup lang="ts">
interface props {
    padding?: boolean
    title: string
    color?: string
}

const { padding, title, color } = withDefaults(
    defineProps<props>(),
    {
        padding: true,
        color: "#22262b"
    }
)
</script>


<template>
    <CommonSection :color="`${color}5a`" class="rounded-lg">
        <h2 class="font-semibold text-[#08bcd5] mb-2 text-xl">{{ title }}</h2>
        <CommonSection class="rounded-lg" :padding="padding" :color="color">
            <slot></slot>
        </CommonSection>
    </CommonSection>
</template>