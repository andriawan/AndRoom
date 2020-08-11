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
            placeholder="password"
          />
        </div>
        <button
          @click="doLogin()"
          class="block mt-8 border w-full border-white text-white p-2"
        >
          Login
        </button>
        <p class="p-2 text-sm text-green-100">
          don't have account? <nuxt-link to="/register">register</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      'title' : 'Login',
      'user' : {
          'password' : null,
          'email' : null,
      }
    }
  },
  middleware: 'authenticated',
  methods: {
    doLogin : function(){
    }
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
