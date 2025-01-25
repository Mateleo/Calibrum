<script setup lang="ts">
const props = defineProps({
  toc: {
    type: Object
  },
  activeSection: {
    type: String,
    default: null
  }
})

// Smooth scroll function
// J'aimerais pouvoir faire autrement... A delete également
const smoothScroll = (event: MouseEvent, id: string) => {
  event.preventDefault()
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })

    setTimeout(() => {
      window.history.replaceState(null, "", `#${id}`)
    }, 500)
  }
}
</script>

<template>
  <div>
    {{ props.activeSection }}
    <ul class="custom" v-if="toc && toc.links">
      <li
        class="custom mb-2 transition-all ease-in"
        :style="{
          paddingLeft: `${Math.max(12 * (link.depth - 2), 0)}px`,
          color: activeSection === link.id ? 'blue' : 'red' // Change color based on active section
        }"
        v-for="link in toc.links"
        :key="link.text"
      >
        <a class="custom" :href="`#${link.id}`" @click="(event) => smoothScroll(event, link.id)">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
