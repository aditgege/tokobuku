<template>
  <section class="pt-20 min-h-screen ">
	<div v-if="carts.length > 0">
		<ul class="divide-y divide-gray-200 mb-1" v-for="cart in carts" :key="cart.title">
		<article class="p-4 flex space-x-4 w-full md:w-1/2 mx-auto border-2 border-b-1 border-gray-900 bg-white">
		<img :src="cart.cover" alt="" class="flex-none w-18 h-18 object-cart" width="144" height="144" />
		<div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
			<h2 class="text-lg font-semibold text-black mb-0.5">
				{{ cart.title }}
			</h2>
			<div class="flex flex-wrap flex-col text-sm font-medium">
				<p>
					Rp. {{ cart.price}}
				</p>
			</div>
		</div>
		<div>
			<Counter v-model="cart.quantity" :required="false" />
		</div>
	</article>
	</ul>
	<div class="p-4 flex space-x-4 w-full md:w-1/2 justify-between  text-white mx-auto border-2 border-gray-900 bg-gray-900">
		<div>
			<p>Total Price ({{totalQuantity}} items)</p>
			<p>Rp. {{totalPrice}}</p>
		</div>
		<div>
			<button @click="checkout" class="bg-white text-gray-900 px-3 py-2 hover:bg-red-600 hover:text-white">CHECKOUT</button>
		</div>
	</div>
	</div>
	<div v-else>
		  <div class="p-4 flex space-x-4 w-full md:w-1/2 justify-between  text-white mx-auto border-2 border-gray-900 bg-red-500">
			<div>
				<p>Cart is empty</p>
			</div>
			<div>
				<button @click="$router.push('/book')" class="bg-white text-gray-900 px-3 py-2 hover:bg-green-600 hover:text-white">SHOP</button>
			</div>
		</div>
	</div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import Counter from "~/components/Counter";

export default {
  components: {
    Counter,
  },
  data() {
    return {
      qty: "",
    };
  },
  computed: {
    ...mapGetters({
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
      totalWeight: "cart/totalWeight",
    }),
  },
  methods: {
	checkout() {
		if (this.$auth.loggedIn) {
			this.$router.push('/order')
		}else {
			this.$router.push('/auth/login')
		}
	}
  }
};
</script>