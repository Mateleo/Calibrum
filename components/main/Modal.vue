<script lang="ts" setup>
const visible = ref(false)

const hideButton = () => {
  visible.value = false
  localStorage.setItem("buttonHidden", "true")
}

// Check if the button was hidden before when the component mounts
onBeforeMount(() => {
  const buttonHidden = localStorage.getItem("buttonHidden")
  if (buttonHidden === "true") {
    visible.value = true
  }
})
</script>
<template>
  <div>
    <button
      v-if="visible"
      @click="hideButton"
      class="font-semibold mt-12 rounded-md border-[1px] border-sky-400 bg-white/5 p-4 text-left text-sky-500 transition-colors ease-in hover:bg-sky-400/10"
    >
      Voici notre dernier projet ! Calibrum est une récriture complète du Lolpros de 4eSport. Tout le monde est le
      bienvenue, alors n'hésitez pas à vous incrire via notre bot sur le Discord de l'association <a class="underline" href="https://discord.gg/YsA7Md2">ici</a>.
      <p class="italic text-sm">@Turdyo & @Mateleo</p>
    </button>
  </div>
</template>
