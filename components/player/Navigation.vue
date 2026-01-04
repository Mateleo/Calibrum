<script lang="ts" setup>
import { ref } from "vue"
const emit = defineEmits<{ change: [value: string] }>()

const selected = ref("accounts")

const tabs = [
  { label: "ACCOUNTS", value: "accounts" },
  // { label: "2025 WRAPPED", value: "wrapped2025" }
]

function selectTab(value: string) {
  selected.value = value
  emit("change", value)
}
</script>

<template>
  <nav class="flex h-[40px] gap-2 text-sm">
    <CommonNavButton
      v-for="tab in tabs"
      :key="tab.value"
      :active="selected === tab.value"
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </CommonNavButton>
  </nav>
</template>
