<template>
  <div>
    <Header></Header>
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
