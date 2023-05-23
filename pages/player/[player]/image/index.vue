<script lang=ts setup>
definePageMeta({
    layout: false
});
defineOgImageDynamic({
    component: 'MyOgImage',
    title: 'Welcome to my site!',
    width: 800,
    height: 400,
    provider: 'browser'
})
</script>
<template>
    <div>
        <div>TEST</div>
    </div>
</template>