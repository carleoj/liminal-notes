<template>
  <header class="site-header">
    <nav class="navbar">
      <h1 class="logo">Liminal Notes</h1>

      <!-- Logged-in links -->
      <ul v-if="isLoggedIn" class="nav-links">
        <li><router-link to="/notes">Notes</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
        <li><a href="#" @click.prevent="handleLogout">Logout</a></li>
      </ul>

      <!-- Guest link -->
      <ul v-else class="nav-links">
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    updateLoginState() {
      this.isLoggedIn = !!localStorage.getItem('user');
    },
    handleLogout() {
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
      this.$router.push('/login');
    }
  },
  mounted() {
    this.updateLoginState();
    window.addEventListener('auth-change', this.updateLoginState);
  },
  beforeDestroy() {
    window.removeEventListener('auth-change', this.updateLoginState);
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-header {
  background-color: rgb(47, 157, 91);
  padding: 1.5rem;
}
.logo {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  font-weight: bold;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 3rem;
  margin: 0;
  padding: 0;
  justify-content: flex-end;
  flex-grow: 1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.nav-links li {
  display: inline;
}
.nav-links a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.nav-links a:hover {
  text-decoration: underline;
}
</style>
