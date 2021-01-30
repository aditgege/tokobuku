<template>
  <div class="flex w-full mx-auto">
    <div
      class="bg-white mx-auto mt-32 border-2 border-gray-900 px-8 pt-6 pb-8 mb-4 flex flex-col"
    >
      <div class="mb-4">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            type="text"
            v-model="name"
            placeholder="name"
          />
        </div>
        <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          v-model="username"
          placeholder="username"
        />
      </div>
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
        <p v-if="errorpass" class="text-red-800 italic text-xs">
          The password must be at least 6 characters
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="register"
          class="bg-gray-900 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Sign Up
        </button>
        <a
          @click="$router.push('/auth/login')"
          class="cursor-pointer inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
        >
          have account?
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
      name: "",
      username: "",
      email: "",
      password: "",
      errorpass: false,
    };
  },
  computed: {},
  watch: {
    password(val) {
      if (val.length < 6) {
        this.errorpass = true;
      } else {
        this.errorpass = false;
      }
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    async register() {
      try {
        let formData = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        let res = await this.$authentication.register(formData);

        this.login(res.data);
      } catch (error) {
        this.setAlert({
          status: true,
          color: "error",
          text: this.validationErrors(error.response.data.message),
        });
      }
    },
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