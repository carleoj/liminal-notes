<template>
  <div class="main-layout">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: { Header }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  background-color: rgb(240, 241, 201);
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
