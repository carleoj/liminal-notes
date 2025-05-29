<template>
  <header class="site-header">
    <nav class="navbar">
      <h1 class="logo">Liminal Notes</h1>

      <!-- Logged-in links -->
      <ul v-if="isLoggedIn" class="nav-links">
        <li><router-link to="/notes">Notes</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
        <li><a href="#" @click.prevent="handleLogout">Logout</a></li>
      </ul>

      <!-- Guest link -->
      <ul v-else class="nav-links">
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </header>
  <div v-if="isLoggedIn" class="greeting">
    <h2>Welcome back, {{ userName }}!</h2>
  </div>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      userName: '',
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
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.length > 0) {
      this.userName = user[0].name || 'User';
    }
    this.updateLoginState();
    window.addEventListener('auth-change', this.updateLoginState);
  },
  beforeDestroy() {
    window.removeEventListener('auth-change', this.updateLoginState);
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
