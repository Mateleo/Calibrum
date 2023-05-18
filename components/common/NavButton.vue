<script lang=ts setup>

interface Props {
    active: boolean
}

const props: Props = withDefaults(
    defineProps<Props>(), {
    active: false
}
)

</script>
<template>
    <button class="border-b-[4px] hover:border-cyan-300 transition-colors ease-in px-2 font-semibold text-white/80"
        :class="props.active ? 'border-cyan-300' : 'border-transparent'">
        <slot></slot>
    </button>
</template>