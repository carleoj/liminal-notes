<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="form-title">{{ isSignUp ? "Create a new account" : "Log into your account" }}</p><br /><br />

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>

    <div class="input-container" v-if="isSignUp">
      <input type="text" placeholder="Enter name" v-model="name" />
      <span></span>
    </div>

    <div class="input-container" v-if="isSignUp">
      <input type="text" placeholder="Enter email" v-model="email" />
      <span></span>
    </div>

    <div class="input-container" v-if="!isSignUp">
      <input type="email" placeholder="Enter email" v-model="email" />
      <span></span>
    </div>

    <div class="input-container">
      <input type="password" placeholder="Enter password" v-model="password" />
    </div>

    <button type="submit" class="submit">
      {{ isSignUp ? "Sign up" : "Log in" }}
    </button>

    <p class="signup-link">
      {{ isSignUp ? "Already have an account?" : "No account?" }}
      <a href="#" @click.prevent="toggleForm">{{ isSignUp ? "Log in" : "Sign up" }}</a>
    </p>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data() {
    return {
      isSignUp: false,
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    toggleForm() {
      this.errorMessage = "";
      this.successMessage = "";
      this.isSignUp = !this.isSignUp;
      this.name = "";
      this.email = "";
      this.password = "";
    },
    async handleSubmit() {
        if (this.isSignUp) {
        await this.handleSignup();
        } else {
        await this.handleLogin();
        }
    },
    async handleLogin(){
        try{
            const response = await axios.post('http://localhost:3000/api/login', {
                username: this.email,
                password: this.password,
            })
            
            const { user, token } = response.data.data;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                window.dispatchEvent(new Event('auth-change'));
                
                this.$router.push('/notes');
            } 
        }catch(error){
            console.error("Login failed", error);
             this.errorMessage = "Login failed: " + (error.response?.data?.message || error.message)
        }
    },
    async handleSignup() {
        try {
        const response = await axios.post('http://localhost:3000/api/signup', {
            name: this.name,
            username: this.email,
            password: this.password,
        });
        console.log('Signup successful', response.data);
        // You might want to automatically switch to login after signup:
        this.toggleForm();
        this.successMessage = "Signup successful! Please log in.";
        } catch (error) {
        console.error("Signup failed", error);
        this.errorMessage = "Signup failed: " + (error.response?.data?.message || error.message);
        }
    },
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
.form {
  background-color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: block;
  padding: 1rem;
  width: 350px;
  max-width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  box-sizing: border-box;
  background-color: #fff;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #3c8945;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  border: none;
}

.submit:hover {
  cursor: pointer;
  background-color: #0c5c16;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}
</style>
