<script setup lang="ts">
const router = useRouter()
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

    setTimeout(async () => {
      await router.push(`#${id}`)
      history.replaceState({ ...history.state }, "")
    }, 500)
  }
}
</script>

<template>
  <div>
    <ul class="custom" v-if="toc && toc.links">
      <li
        class="custom mb-[10px] opacity-100 transition-all"
        :style="{
          paddingLeft: `${Math.max(12 * (link.depth - 2), 0)}px` // Change color based on active section
        }"
        :class="activeSection === link.id ? 'text-[#00eaff]/90' : 'text-gray-300 hover:text-white'"
        v-for="link in toc.links"
        :key="link.text"
      >
        <a class="custom" :href="`#${link.id}`" @click="(event) => smoothScroll(event, link.id)">
          {{ link.text }}
        </a>
        <div v-if="link.children" class="mt-[10px]">
          <li
            class="custom mb-[10px] opacity-100 transition-all"
            :style="{
              paddingLeft: `${Math.max(15 * (deepLink.depth - 2), 0)}px` // Change color based on active section
            }"
            :class="activeSection === deepLink.id ? 'text-[#00eaff]/90' : 'text-gray-300 hover:text-white'"
            v-for="deepLink in link.children"
            :key="deepLink.text"
          >
            <a class="custom" :href="`#${deepLink.id}`" @click="(event) => smoothScroll(event, deepLink.id)">
              {{ deepLink.text }}
            </a>
          </li>
        </div>
      </li>
    </ul>
  </div>
</template>
