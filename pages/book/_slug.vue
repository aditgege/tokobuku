<template>
  <div>
		<section class="bg-white py-8">
    <div
      class="container mx-auto w-full lg:w-2/3 flex items-center flex-wrap pt-4 pb-12"
    >
      <div class="w-full md:w-1/2 xl:w-1/2 p-6 flex flex-col cursor-pointer">
        <img class="hover:grow hover:shadow-lg" :src="book.cover" />
      </div>
      <div class="w-full md:w-1/3 xl:w-1/2 p-6 grid mb-auto">
        <div class="pt-3 flex">
          <p class="text-3xl">{{ book.title }}</p>
        </div>
        <p class="pt-1 text-gray-900 fotn-weight-900">RP. {{ book.price }}</p>
        <small class="pt-1 text-gray-900 fotn-weight-900">Stock: {{ book.stock }}</small>
        <counter v-if="book.stock > 0" v-model="qty" :stock="book.stock" class="mt-10 mb-6" />
				<small v-else class="text-red-500 mt-10 mb-6">OUT OF STOCK</small>
        <button
					:disabled="qty == 0 || qty > book.stock"
					:class="qty == 0 || qty > book.stock ? 'cursor-not-allowed': 'cursor-pointer'"
          @click="buy"
          class="hover:bg-gray-900 disabled:hover:bg-white px-2 text-black hover:text-white bg-white border-2 border-gray-900"
        >
          <span class="m-auto text-2xl"> Add to Cart</span>
        </button>
      </div>
    </div>

  </section>
	<BookProperty :book="book" />
	</div>
</template>
<script>
import Counter from "~/components/Counter";
import BookProperty from "~/components/BookProperty";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
		Counter,
		BookProperty
  },
  data() {
    return {
      book: {
        cover: null,
        title: null,
      },
      qty: 0,
    };
  },
  computed: {
    ...mapGetters({
      carts: "cart/carts",
    }),
  },
  mounted() {
    this.getBook();
  },
  methods: {
    ...mapActions({
      addCart: "cart/add",
      setAlert: "alert/set",
    }),
    buy() {
      this.addCart(this.book);
      this.setAlert({
        status: true,
        color: "success",
        text: "Added to cart",
      });
    },
    async getBook() {
      try {
        const req = await this.$book.getBook(this.$route.params.slug);
        this.loading = false;
        this.book = req.data;
        console.log("test", req.data);
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>