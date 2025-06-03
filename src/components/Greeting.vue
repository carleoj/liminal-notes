<template>
  <div class="greeting">
    <h2>Welcome back, {{ userName }}!</h2>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  data() {
    return {
      userName: ''
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.length > 0) {
      this.userName = user.name || 'User';
    }
  }
};
</script>

<style scoped>
.greeting {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2rem;
  text-align: left;
  margin: 1.5rem 0;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  color: #216e36;
  border:#333 solid 1px
}

@media (max-width: 600px) {
  .greeting {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1rem;
    padding: 6px;
  }
}
</style>
