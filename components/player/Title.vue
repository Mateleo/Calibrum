<script lang=ts setup></script>
<template>
    <div>
        <CommonSection class="flex flex-col max-w-[300px] gap-2 items-center rounded-lg">
            <div class="relative flex justify-center">
                <NuxtImg src="https://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/1211.png"
                    class="rounded-full w-[35%] shadow-md shadow-black/70 border-2 border-teal-400"></NuxtImg>

                <div class="absolute -bottom-[1px] left-[95px] flex items-center justify-center w-10 h-10
                text-xs font-extrabold bg-blue-950 border-2 border-teal-400 rounded-full">
                    <NuxtImg src="/positions/adc.svg" class="w-[50%]">
                        245</NuxtImg>
                </div>
            </div>
            <h1 class="text-2xl font-semibold text-center">Mateleo</h1>

        </CommonSection>
    </div>
</template>