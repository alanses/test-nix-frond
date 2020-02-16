<template>
  <div class="wrapper">
    <div class="container">
      <div class="form">
        <form @submit.prevent="login">
          <h2>Login</h2>
          <div class="form-error" v-show="errors.hasErrors">
            <p>Login or password are incorrect</p>
          </div>
          <div class="group">
            <label for="email">Email:</label>
            <input type="email" id="email" required v-model="email" />
          </div>
          <div class="group">
            <label for="password">Password:</label>
            <input id="password" type="password" required v-model="password" />
          </div>
          <div class="submit-button">
            <input type="submit" value="Login" id="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { AutificationService, ApiService } from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import Vue from "vue";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {
        hasErrors: false
      }
    };
  },

  methods: {
    getDataForLogin() {
      return {
        password: this.password,
        email: this.email
      };
    },

    login() {
      AutificationService.login("login", this.getDataForLogin())
        .then(result => {
          let token = result.data.data.content.access_token;
          this.setToken(token);
          this.$router.push({ name: "products" });
        })
        .catch(error => {
          this.errors.hasErrors = true;
        });
    },

    setToken(token) {
      JwtService.saveToken(token);
      Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  font-family: "Open Sans", sans-serif;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 700px;
  background-color: white;
  text-align: center;
  padding: 70px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
}

form {
  width: 70%;
  margin: 0 auto;
  text-align: left;
}

div.group {
  margin-top: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

div.group input {
  width: 100%;
  padding: 10px 4px;
  outline: none;
}

a.forget-link {
  color: black;
  display: block;
  margin: 10px 0;
}

input[type="submit"] {
  padding: 15px 35px;
  outline: none;
  border: None;
  background-color: #20c198;
  color: white;
  transition: all 0.3s ease-in-out;
}

input[type="submit"]:hover {
  cursor: pointer;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.4);
}

.form {
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
}

.form-error p {
  color: #ff0000;
}

.submit-button {
  margin-top: 10px;
}
</style>
