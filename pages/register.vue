<template>
  <div class="container">
    <div class="w-1/3">
      <h1 class="border-b-2 border-t-2 border-white mb-5 text-3xl text-white">AndRoom</h1>
      <div>
        <div>
            <label for="name" class="block text-white text-left pb-2">Name</label>
            <input class="p-2 w-full" name="name" type="text" placeholder="name">
        </div>
        <div>
            <label for="email" class="block text-white text-left pb-2 pt-2">Email</label>
            <input class="p-2 w-full" name="email" type="text" placeholder="email">
        </div>
        <div>
            <label for="password" class="block text-white text-left pb-2 pt-2">Password</label>
            <input class="p-2 w-full" name="password" type="password" placeholder="password">
        </div>
        <button class="block mt-8 border w-full border-white text-white p-2">Create Account</button>
        <p class="p-2 text-sm text-green-100">Already have an account? <nuxt-link to="/login">login</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      'title' : 'Registration',
      'user' : {
          'name' : null,
          'password' : null,
          'email' : null,
      }
    }
  }
}
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
