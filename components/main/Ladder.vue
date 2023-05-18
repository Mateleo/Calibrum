<script setup lang="ts">

const { pending, error, data: players } = await useLazyFetch('/api/leaderboard')

</script>
<template>
    <CommonInnerTitleSection title="Ladder">
        <div v-for="player in players">
            {{ player.name }}
        </div>
    </CommonInnerTitleSection>
</template>