<template>
  <div>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  background-color: #12171c;
  color: white;
  font-family: "Inter";
  color-scheme: dark;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
