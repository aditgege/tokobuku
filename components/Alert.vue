<template>
  <div
    :class="colorAlert"
    class="flex items-center text-white text-sm font-bold px-4 py-3"
    role="alert"
  >
    <p>{{ text }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "alert",
  computed: {
    ...mapGetters({
      status: "alert/status",
      color: "alert/color",
      text: "alert/text",
    }),
    colorAlert() {
      if (this.color == "success") {
        return "bg-green-600";
      } else {
        return "bg-red-600";
      }
    },
    alert: {
      get() {
        return this.status;
      },
      set(value) {
        this.setAlert({
          status: value,
          type: "success",
          text: "test",
        });
      },
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    close() {
      this.setAlert({
        status: false,
      });
    },
  },
};
</script>