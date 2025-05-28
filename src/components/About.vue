<template>
  <div>
    <h2>Users' Names: </h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.username }})
      </li>
    </ul>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      users: [],
    }
  },
  mounted(){
    this.fetchAllUser()
  },
  methods: {
    async fetchAllUser() {
      try{
        const res = await axios.get('http://localhost:3000/api/getUsers')
        this.users = res.data
      }catch(error){
        console.error('Fetch error: ', error)
      }
    }
  }
}
</script>

<style scoped>
</style>
