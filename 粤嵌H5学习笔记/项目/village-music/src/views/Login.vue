<template>
  <form class="login" action="login">
    <fieldset>
      <legend>用户登录</legend>
      <p>
        <label for="username">姓名：</label><br />
        <input
          id="username"
          v-model="values.username"
          type="text"
          placeholder="请输入用户名"
          required
        />
      </p>
      <p>
        <label for="password">密码：</label><br />
        <input
          id="password"
          type="password"
          placeholder="请输入密码"
          required
        />
      </p>
      <br>
      <p>
        <input type="submit" value="登录" />
      </p>
    </fieldset>
  </form>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      from: null,
      values: {
        username: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.storeFrom(from);
    });
  },
  methods: {
    storeFrom(f) {
      this.from = f;
    },
    login() {
      // ajax 请求数据并判断是否登录成功
      this.$store.commit("login", this.values.username);
      this.$router.push(this.from); //登录成功后跳转到的页面
    },
  },
};
</script>
<style lang="stylus" scoped>
form {
    width: 100%;
}

input,
meter {
    width: 100%;
}

input {
    height: 30px;
    /* debug：input 设置 padding 会使 input 不居中=》负 margin 调整 */
    margin: 0 -4px;
    padding: 0 4px;
    border: none;
    border-radius: 2px;
    box-shadow: 0 0 2px;
    font-size: 16px;
}

meter {
    border-radius: 50%;
}
</style>
