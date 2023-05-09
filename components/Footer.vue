<script lang=ts setup></script>
<template>
    <footer class="fixed bottom-0 w-full">
        <div class="flex justify-between px-6 text-white/50 text-xs pb-2">
            <div class="flex gap-2">
                <a>FAQ</a>
                <a>DevTeam</a>
                <a>Terms of services</a>
            </div>
            <!-- <div>Copyright © 2023 4eSport Tous droits réservés.</div> -->
            <div class="flex gap-6">
                <a href="https://www.discord.gg/4eSport" target="-blank" class="hover:text-white transition-all ease-in">
                    <Icon name="ic:sharp-discord" size="1.6em" cursor="pointer"></Icon>
                </a>
                <a href="https://www.instagram.com/4esport_efrei/" target="-blank"
                    class="hover:text-white  transition-all ease-in">
                    <Icon name="mdi:instagram" size="1.6em" cursor="pointer"></Icon>
                </a>
                <a href="https://twitter.com/4esport_efrei" target="-blank"
                    class="hover:text-white  transition-all ease-in">
                    <Icon name="mdi:twitter" size="1.6em" cursor="pointer"></Icon>
                </a>
                <a href="https://4esport.fr/" target="-blank"
                    class="w-[22px] hover:opacity-100 opacity-50  transition-all ease-in">
                    <NuxtImg src="4es_logo.png"></NuxtImg>
                </a>
            </div>
        </div>
</footer></template>