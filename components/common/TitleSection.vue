<script setup lang="ts">
interface props {
    padding?: boolean
    title: string
    color?: string
}

const props = withDefaults(
    defineProps<props>(),
    {
        padding: true
    }
)

const { padding, title, color } = toRefs(props)

</script>
<template>
    <div class="flex flex-col">
        <CommonTitle class="mb-2">{{ title }}</CommonTitle>
        <CommonSection class="rounded-lg h-full" :padding="padding" :color="color">
            <slot></slot>
        </CommonSection>
    </div>
</template>