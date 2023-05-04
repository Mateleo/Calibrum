<template>
    <div class="min-w-min shadow-black/50 shadow-2xl"
        :style="`background-color: ${color}; ${padding ? 'padding: 8px' : ''}`">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

interface props {
    color?: string
    padding?: boolean
}

const { color, padding } = withDefaults(
    defineProps<props>(),
    {
        color: "#22262b",
        padding: true
    }
)
</script>