<script lang="ts" setup>
import { type Account } from "@prisma/client"

const selected = defineModel<number>("selected")

interface Props {
  accounts?: Pick<Account, "name" | "profileIcon" | "sumonerLvl">[]
}

const props = defineProps<Props>()
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
    <button v-for="(account, index) in props.accounts" :key="account.name" class="select-text">
      <CommonSection
        class="flex items-center gap-2 rounded-md border-[1px] px-4 py-2 font-medium"
        :padding="false"
        @click="selected = index"
        :color="selected === index ? '#17191d' : undefined"
        :class="selected === index ? 'border-gray-600/70 text-sky-400' : 'border-transparent'"
      >
        <NuxtImg sizes="32px" format="webp" quality="60" :src="account.profileIcon" class="w-[26px] rounded-full" />
        <div class="flex flex-col items-start">
          <p>{{ account.name }}</p>
          <p class="text-xs opacity-80">Level {{ account.sumonerLvl }}</p>
        </div>
      </CommonSection>
    </button>
  </div>
</template>
