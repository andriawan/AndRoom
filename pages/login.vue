<template>
  <div class="container">
    <div class="w-1/3">
      <h1 class="border-b-2 border-t-2 border-white mb-5 text-3xl text-white">
        AndRoom
      </h1>
      <div>
        <div>
          <label for="email" class="block text-white text-left pb-2"
          >Email</label
          >
          <input
            class="p-2 w-full"
            v-model="user.email"
            name="email"
            type="email"
            required
            @keypress.enter="doLogin"
            placeholder="email"
          />
        </div>
        <div>
          <label for="password" class="block text-white text-left pb-2 pt-2"
          >Password</label
          >
          <input
            class="p-2 w-full"
            v-model="user.password"
            name="password"
            type="password"
            required
            @keypress.enter="doLogin"
            placeholder="password"
          />
        </div>
        <button
          @click="doLogin()"
          :disabled="button.login.disabled"
          class="block mt-8 border w-full border-white text-white p-2"
        >
          {{ button.login.label }}
        </button>
        <p class="p-2 text-sm text-green-100">
          don't have account?
          <nuxt-link to="/register">register</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Login',
      button: {
        login: {
          label: "Login",
          disabled: false
        }
      },
      options: {
        toast: {
          fullWidth: true,
          theme: "bubble",
          duration: 5000,
          position: "bottom-center"
        }
      },
      user: {
        password: null,
        email: null,
      },
    }
  },
  watch: {
    "button.login.disabled": function (value) {
      if(value){
        this.button.login.label = "Please wait...";
      }else{
        this.button.login.label = "Login";
      }
    }
  },
  middleware: 'authenticated',
  methods: {
    async doLogin() {

      this.button.login.disabled = true;

      try {
        let data = await this.$fireAuth.signInWithEmailAndPassword(
          this.user.email, this.user.password)
        this.$auth.$storage.setLocalStorage('isLogin', true)
        this.$auth.$storage.setLocalStorage('user', data.user, true)
        await this.$router.push({
          path: '/',
        })

      } catch (error) {
        this.button.login.disabled = false;
        this.$toast.error(error.message, this.options.toast);
      }
    },
  },
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
