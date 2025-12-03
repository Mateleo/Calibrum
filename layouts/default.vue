<template>
  <div>
    <div class="bg-[#00eaff] px-4 py-1 text-center text-lg font-bold">
      <NuxtLink to="/blog/calibrum/2025-december-wrapped-launch"> Calibrum Wrapped 2025 est disponible </NuxtLink>
    </div>
    <LazyHeader></LazyHeader>
    <main class="pb-[50px]">
      <slot />
    </main>
    <Footer></Footer>
  </div>
</template>
<style>
body {
  position: relative;
  min-height: 100vh;
}
</style>
