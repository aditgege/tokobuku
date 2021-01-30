<template>
  <div>
    <alert v-show="status" />

    <Nuxt />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Alert from "~/components/Alert";

export default {
  components: {
    Alert,
  },
  computed: {
    ...mapGetters({
      status: "alert/status",
    }),
  },
  watch: {
    status(value) {
      if (value == true) {
        setTimeout(() => {
          this.setAlert({
            status: false,
          });
        }, 3000);
      }
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
  },
};
</script>