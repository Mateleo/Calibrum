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
<template>
    <div class="min-w-min"
        :style="`background-color: ${color}; ${padding ? 'padding: 8px' : ''}`">
        {{color}}
        <slot></slot>
    </div>
</template>
