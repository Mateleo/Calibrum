<script setup lang="ts">
interface props {
    padding?: boolean
    title: string
    color?: string
}

const { padding, title, color } = withDefaults(
    defineProps<props>(),
    {
        padding: true
    }
)

</script>
<template>
    <div>
        <CommonTitle>{{ title }}</CommonTitle>
        <CommonSection class="rounded-lg" :padding="padding" :color="color">
            <slot></slot>
        </CommonSection>
    </div>
</template>