<script setup lang="ts">
interface props {
    padding?: boolean
    title: string
}

const { padding, title } = withDefaults(
    defineProps<props>(),
    {
        padding: true
    }
)

</script>
<template>
    <div>
        <CommonTitle>{{ title }}</CommonTitle>
        <CommonSection class="rounded-lg" :padding="padding">
            <slot></slot>
        </CommonSection>
    </div>
</template>