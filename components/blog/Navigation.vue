<script setup lang="ts">
const props = defineProps({
  toc: {
    type: Object
  }
})
</script>

<template>
  <div>
    <ul class="custom" v-if="toc && toc.links">
      <li
        class="custom mb-2"
        :style="{
          paddingLeft: `${Math.max(12 * (link.depth - 1), 0)}px`
        }"
        v-for="link in toc.links"
        :key="link.text"
      >
        <a class="custom" :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
