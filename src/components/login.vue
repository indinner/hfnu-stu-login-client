<template>
  <div class="login-container">
    <form @submit.prevent="submitForm">
      <h1>Login</h1>
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="state.username" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="state.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="tips">
      默认用户名密码为:user 123
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {login_} from "@/apis/login.api.js";

const state=reactive({
  username:'',
  password:''
})

const submitForm = async () => {
  let res = await login_(state.username,state.password)
  console.log(res)
  if(res.data){
    alert('登录成功')
  }else {
    alert('请检查你的账号密码')
  }
};
</script>

<style scoped>
.tips{
  font-size: 12px;
  margin-top: 20px;
}
.login-container {
  max-width: 300px;
  margin: 200px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 93%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #5c6bc0;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3f51b5;
}
</style>
