<script lang="ts" setup>
const props = defineProps({
  date: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String
  },
  tag: {
    type: String
  }
})
</script>
<template>
  <div class="mb-8 border-b border-white/20">
    <div class="flex flex-col text-white/70 md:mt-12">
      <p class="text-sm">
        <span class="font-medium text-[#00eaff]"> {{ props.tag }}</span> |
        {{ $dayjs(props.date, "DD/MM/YYYY").format("D MMMM YYYY") }}
      </p>
      <h1 class="mt-2 text-6xl font-bold text-white">{{ props.title }}</h1>
      <h2 class="custom text-lg text-white/70">{{ props.description }}</h2>
      <div class="my-6 -ml-4 flex gap-2">
        <NuxtLink
          v-if="props.author"
          v-for="(author, index) in props.author.split(',').map((item: string) => item.trim())"
          class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all ease-in hover:bg-white/10"
        >
          <div><img :src="`/content/author/${author}.png`" alt="" class="custom size-[38px] rounded-full" /></div>
          <div class="flex flex-col">
            <p class="custom font-semibold leading-none text-white">{{ author }}</p>
            <p class="custom text-xs text-white/50">@{{ author.toLocaleLowerCase() }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
