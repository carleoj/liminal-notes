<template>
    <header class="site-header">
        <nav class="navbar">
            <h1 class="logo">Liminal Notes</h1>
            <ul v-show="isLoggedIn" class="nav-links">
                <li><router-link to="notes"> Notes</router-link></li>
                <li><router-link to="about"> About</router-link></li>
                <li><router-link to="settings"> Settings</router-link></li>
                <li><router-link to="logout"> Logout</router-link></li>
            </ul>
            <ul class="nav-links">
                <li><router-link to="login"> Login</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>    
    export default{
        data(){
            return{
                isLoggedIn: false
            }
        },
        methods: {
            
        }
    }
</script>

<style>
.navbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.site-header{
    background-color: rgb(47, 157, 91);
    padding: 1.5rem;
}
.logo{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    font-weight: bold;
}
.nav-links{
    list-style: none;
    display: flex;
    gap: 3rem;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
    flex-grow: 1;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.nav-links li{
    display: inline;
}
.nav-links a{
    text-decoration: none;
    color: rgb(255, 255, 255);
}
.nav-links a:hover {
  text-decoration: underline;
}
</style>