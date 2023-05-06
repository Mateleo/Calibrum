<script lang=ts setup>

interface props {
    active: boolean
}

const props: props = withDefaults(
    defineProps<props>(), {
    active: false
}
)

</script>
<template>
    <button class="border-b-[4px] hover:border-cyan-300 border-transparent transition-colors ease-in px-2"
        :class="props.active ? 'border-cyan-300' : ''">
        <slot></slot>
    </button>
</template>