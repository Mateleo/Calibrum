<script lang=ts setup>
import { Account } from '@prisma/client';



const selected = ref(0)


interface Props {
    accounts?: Pick<Account, "name" | "profileIcon">[]
    onAccountChange: (acc:number) => void
}

const props = withDefaults(
    defineProps<Props>(),
    {
        accounts: () => [
            {
                name: "Smurf",
                profileIcon: "fjeizfjizej"
            }
        ]
    }
)



</script>
<template>
    <div class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4">
        <button v-for="(account, index) in props.accounts">
            <CommonSection class="flex gap-2 items-center rounded-md px-4 py-2 border-[1px] font-medium" :padding="false"
                @click="selected = index;props.onAccountChange(index)" :color="selected === index ? '#17191d' : undefined"
                :class="selected === index ? 'border-gray-600/70 text-sky-400' : 'border-transparent'">
                <NuxtImg :src="account.profileIcon"
                    class="rounded-full w-[26px]"></NuxtImg>
                <p>{{ account.name }}</p>
            </CommonSection>
        </button>
    </div>
</template>