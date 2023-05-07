<script lang=ts setup>

let selected = ref(0)

</script>
<template>
    <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
        <CommonSection class="flex gap-2 items-center rounded-md px-4 py-2 border-[1px]" :padding="false"
            @click="selected = 0" :color="selected === 0 ? '#17191d' : undefined"
            :class="selected === 0 ? 'border-gray-600/70' : 'border-transparent'">
            <NuxtImg src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/1211.png"
                class="rounded-full w-[24px]"></NuxtImg>
            <p>Mateleo</p>
        </CommonSection>
        <CommonSection class="flex gap-2 items-center rounded-md px-4 py-2 border-[1px]" :padding="false"
            @click="selected = 1" :color="selected === 1 ? '#17191d' : undefined"
            :class="selected === 1 ? 'border-gray-600/70' : 'border-transparent'">
            <NuxtImg src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/1211.png"
                class="rounded-full w-[24px]"></NuxtImg>
            <p>Mateleo</p>
        </CommonSection>
        <CommonSection class="flex gap-2 items-center rounded-md px-4 py-2 border-[1px]" :padding="false"
            @click="selected = 2" :color="selected === 2 ? '#17191d' : undefined"
            :class="selected === 2 ? 'border-gray-600/70' : 'border-transparent'">
            <NuxtImg src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/1211.png"
                class="rounded-full w-[24px]"></NuxtImg>
            <p>Mateleo</p>
        </CommonSection>
    </div>
</template>