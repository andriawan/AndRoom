<template>
  <div class="container">
    <div class="w-1/3">
      <h1 class="border-b-2 border-t-2 border-white mb-5 text-3xl text-white">
        AndRoom
      </h1>
      <div>
        <div v-show="options.login.mode == options.login.DEFAULT">
          <div>
            <label for="email" class="block text-white text-left pb-2"
            >Email</label
            >
            <input
              class="p-2 w-full"
              v-model="user.email"
              name="email"
              id="email"
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
              id="password"
              required
              @keypress.enter="doLogin"
              placeholder="password"
            />
          </div>
        </div>

        <div>
          <div v-show="options.login.mode == options.login.PHONE">
            <label for="phone" class="block text-white text-left pb-2"
            >Phone</label
            >
            <input
              class="p-2 w-full"
              v-model="user.phone"
              id="phone"
              name="phone"
              type="tel"
              @keypress.enter="doLogin"
              placeholder="+628xxxxx"
            />
          </div>
          <div id="recaptcha-container"></div>
          <div v-show="options.login.mode == options.login.OTP">
            <label for="otp" class="block text-white text-left pb-2"
            >Phone</label
            >
            <input
              class="p-2 w-full"
              v-model="user.phone"
              id="otp"
              name="otp"
              type="number"
              maxlength="7"
              @keypress.enter="doLogin"
              placeholder="please enter OTP"
            />
          </div>
        </div>
        <button
          @click="doLogin()"
          v-show="options.login.mode == options.login.DEFAULT || options.login.mode == options.login.PHONE"
          :disabled="button.login.disabled"
          class="block mt-8 border w-full border-white text-white p-2"
        >
          {{ button.login.label }}
        </button>
        <button
          @click="confirmOTP()"
          v-show="options.login.mode == options.login.OTP"
          :disabled="button.otp.disabled"
          class="block mt-8 border w-full border-white text-white p-2"
        >
          {{ button.otp.label }}
        </button>
        <div class="flex">
          <div class="w-1/2">
            <p class="p-2 text-sm text-green-100">
              don't have account?
              <nuxt-link to="/register">register</nuxt-link>
            </p>
          </div>
          <div class="w-1/2">
            <p @click="changeLoginMode()" class="cursor-pointer p-2 text-sm text-green-100">
              {{ options.login.label.text }}
            </p>
          </div>
        </div>
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
          disabled: false,
          DEFAULT: "Login",
          OTP: "Send OTP"
        },
        otp: {
          label: "Confirm",
          disabled: false,
        }
      },
      options: {
        toast: {
          fullWidth: true,
          theme: "bubble",
          duration: 5000,
          position: "bottom-center"
        },
        login: {
          label : {
            text: "login with phone number",
            DEFAULT : 'login with email & password',
            PHONE: 'login with phone number'
          },
          mode: 'default',
          DEFAULT : 'default',
          PHONE: 'phone',
          OTP: 'otp'
        }
      },
      user: {
        password: null,
        email: null,
        phone: null,
        otp: null,
        login: {
          data: null
        }
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
    confirmOTP(){
      // this.button.login.disabled = true;
      try {
        this.user.login.data.confirm(this.user.otp);
      }catch (error) {
        this.$toast.error(error.message, this.options.toast);
      }
    },
    changeLoginMode(){
      if(this.options.login.mode == this.options.login.PHONE){
        this.options.login.mode = this.options.login.DEFAULT;
        this.options.login.label.text = this.options.login.label.PHONE;
        this.button.login.label = this.button.login.DEFAULT;
      }else{
        this.options.login.mode = this.options.login.PHONE;
        this.options.login.label.text = this.options.login.label.DEFAULT;
        this.button.login.label = this.button.login.OTP;
      }
    },
    async signInWithEmailAndPassword({email, password}) {
      try {
        let data = await this.$fireAuth.signInWithEmailAndPassword(
          email, password)
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
    async signInWithPhoneNumber(phone){
      try {
        window.confirmationResult = await this.$fireAuth.signInWithPhoneNumber(
          phone, new this.$fireAuthObj.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log("response", response)
              this.options.login.mode = this.options.login.OTP;
            }
          }));

      } catch (error) {
        this.button.login.disabled = false;
        this.button.otp.disabled = false;
        this.$toast.error(error.message, this.options.toast);
      }
    },
    async doLogin() {

      this.button.login.disabled = true;

      if(this.options.login.mode == this.options.login.DEFAULT){
        await this.signInWithEmailAndPassword({
          email : this.user.email,
          password : this.user.password
        });
      }else{
        await this.signInWithPhoneNumber(this.user.phone)
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
