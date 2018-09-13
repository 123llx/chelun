<template>
  <div class="wrap">
    <p>
      <input type="text" placeholder="请输入你的用户名" ref="username">
    </p>
    <p><input type="password" placeholder="请输入你的密码" ref="password"></p>
    <p class="btn">
      <button @click="login">登录</button>
    </p>

  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        let username = this.$refs.username.value
        let password = this.$refs.password.value
        if (username == '1602E' && password == '1602E') {
          window.localStorage.setItem('login', 'true')
          window.history.back()
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  .wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;

    p {
      // text-align: center;
      width: 70%;
      height: 30px;
    
      margin: 20px auto;

      input {
        display: block;
        width: 100%;
        height: 100%;
        outline-style: none;
      }
    }

    .btn {
      width: 80%;
      height: 35px;


      text-align: center;

      button {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 1px solid transparent; //自定义边框
        outline: none; //消除默认点击蓝色边框效果
        background: skyblue;
        color: #fff;
        font-size: .42rem;
      }
    }
  }

</style>
