<template>
  <div class="flex flex-col min-h-screen">
    <!-- header -->
    <header
      class="flex justify-center items-center h-20 bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <p class="text-xl md:text-2xl text-sky-950">人口推移グラフ</p>
    </header>
    <!-- page container -->
    <main class="flex-1">
      <slot></slot>
    </main>
  </div>
</template>
