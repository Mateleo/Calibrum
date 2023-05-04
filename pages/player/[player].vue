<script lang=ts setup>
const route = useRoute()
</script>
<template>
    <div class="text-4xl font-bold">{{ route.params.player }}
    </div>
    <div class="text-4xl font-semibold">{{ route.params.player }}
    </div>
    <div class="text-4xl">{{ route.params.player }}
    </div>
    <div class="text-4xl font-light">{{ route.params.player }}
    </div>
</template>