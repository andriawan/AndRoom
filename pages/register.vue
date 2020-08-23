<template>
  <div class="container">
    <div class="w-1/3">
      <h1 class="border-b-2 border-t-2 border-white mb-5 text-3xl text-white">
        AndRoom
      </h1>
      <div>
        <div>
          <label for="email" class="block text-white text-left pb-2 pt-2"
          >Email</label>
          <input
            class="p-2 w-full"
            name="email"
            id="email"
            v-model="user.email"
            type="text"
            @keypress.enter="createAccount"
            placeholder="email"
          />
        </div>
        <div>
          <label for="password" class="block text-white text-left pb-2 pt-2">Password</label>
          <input
            class="p-2 w-full"
            name="password"
            id="password"
            v-model="user.password"
            type="password"
            @keypress.enter="createAccount"
            placeholder="password"
          />
        </div>
        <button
          @click="createAccount"
          :disabled="button.register.disabled"
          class="block mt-8 border w-full border-white text-white p-2"
        >
          {{ button.register.label }}
        </button>
        <p class="p-2 text-sm text-green-100">
          Already have an account?
          <nuxt-link to="/login">login</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Registration',
      user: {
        password: null,
        email: null,
      },
      button: {
        register: {
          disabled: false,
          label: "Create Account"
        }
      },
      options : {
        toast : {
          fullWidth: true,
          theme: "bubble",
          duration: 5000,
          position: "bottom-center"
        }
      },
    }
  },
  watch: {
    "button.register.disabled": function (value) {
      if(value){
        this.button.register.label = "Please wait...";
      }else{
        this.button.register.label = "Create Account";
      }
    }
  },
  middleware: 'authenticated',
  methods: {
    async createAccount() {

      this.button.register.disabled = true;

      try {
        let data = await this.$fireAuth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        )
        this.$auth.$storage.setLocalStorage('isLogin', true)
        this.$auth.$storage.setLocalStorage('user', data.user, true)
        await this.$router.push({
          path: '/',
        })
      } catch (error) {
        this.button.register.disabled = false;
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
