<template>
  <section class="pt-20 min-h-screen">
    <div v-if="items.length > 0" class="mb-10">
        <h1 class=" text-center text-gray-900">MY ORDER</h1>
      <ul
        class="divide-y divide-gray-200 mb-1"
        v-for="item in items"
        :key="item.id"
      >
        <article
          class="p-4 flex space-x-4 w-full md:w-1/2 mx-auto border-2 border-b-1 border-gray-900 bg-white"
        >
          <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
            <h2 class="text-lg font-semibold text-black mb-0.5">
              Invoice no: {{ item.invoice_number }}
            </h2>
            <div class="flex flex-wrap flex-col text-sm font-medium">
              Total Payment: <p>Rp. {{ item.total_bill }}</p>
            </div>
          </div>
          <div>
              {{ item.courier_service }}
          </div>
        </article>
      </ul>
      <!-- <div
        class="p-4 flex space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-gray-900"
      >
        <div>
          <p>Total Price ({{ totalQuantity }} items)</p>
          <p>Rp. {{ totalPrice }}</p>
        </div>
        <div>
          <button
            @click="checkout"
            class="bg-white text-gray-900 px-3 py-2 hover:bg-red-600 hover:text-white"
          >
            CHECKOUT
          </button>
        </div>
      </div> -->
    </div>
    <div v-else>
      <div
        class="p-4 flex space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-red-500"
      >
        <div>
          <p>Orders is Empty</p>
        </div>
        <div>
          <button
            @click="$router.push('/book')"
            class="bg-white text-gray-900 px-3 py-2 hover:bg-green-600 hover:text-white"
          >
            SHOP
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
  },
  mounted() {
    // let config = {
    //   headers: {
    //     Authorization: "Bearer " + this.$auth.user.token.get(),
    //   },
    // };

    this.getOrder()

  },
  methods: {
    async getOrder() {
      try {
        let res = await this.$region.getMyOrders();
        this.items = res.data;
      } catch (error) {
        let { data } = error.response;
        this.setAlert({
          status: true,
          text: data.message,
          color: "error",
        });
      }
    },
  },
};
</script>