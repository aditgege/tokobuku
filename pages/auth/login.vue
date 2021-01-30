<template>
  <div class="flex w-full mx-auto">
    <div @click="$router.push('/auth/register')" class="bg-red-500 hover:bg-green-500 cursor-pointer px-3 py-4 right-0 absolute border-gray-900 border-2 text-white">
      <p>not have accout ?</p>
      <small class="text-gray-900">Click here</small>
    </div>
    <div
      class="bg-white mx-auto mt-32 border-2 border-gray-900 px-8 pt-6 pb-8 mb-4 flex flex-col"
    >
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="email"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          v-model="password"
          placeholder="******************"
        />
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="login"
          class="bg-gray-900 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "auth",
  auth: "guest",
  data() {
    return {
      email: "aditgege0@gmail.com",
      password: "aditgege",
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    async login() {
      try {
        let formData = {
          email: this.email,
          password: this.password,
        };
        let res = await this.$auth.loginWith("local", {
          data: formData,
        });
        this.setAlert({
          status: true,
          color: "success",
          text: "Login success",
        });
      } catch (error) {
        this.setAlert({
          status: true,
          color: "error",
          text: this.validationErrors(error.response.data.message),
        });
      }
    },
    validationErrors(data) {
      let errors = Object.values(data);
      errors = errors.flat();
      return errors[0];
    },
  },
};
</script>