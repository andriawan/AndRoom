<template>
  <div class="container">
    <div class="w-full">
      <p class="p-2 text-xs text-white w-full" v-for="(value, name) of user">{{ name }} : {{ value }}</p>
      <button
        @click="doLogout()"
        class="mt-8 border border-white text-white p-2"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'oke',
    }
  },
  computed: {
    user: function () {
      console.log(this.$auth.$storage.getLocalStorage('user'))
      return this.$auth.$storage.getLocalStorage('user')
    }
  },
  middleware: 'guest',
  methods: {
    doLogout: function () {
      this.$fireAuth.signOut().then(() => {
        this.$auth.$storage.setLocalStorage('isLogin', false)
        this.$auth.$storage.setLocalStorage('user', null)
        this.$router.push({
          path: '/login',
        })
      })
    },
  },
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
