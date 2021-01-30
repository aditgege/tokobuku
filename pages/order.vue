<template>
  <div :class="loading ? 'text-center align-middle' : ''" class="min-h-screen">
    <div
      class="bg-yellow-600 py-5 text-center animate-pulse my-auto font-bold text-gray-900"
      v-if="loading"
    >
      Loading .....
    </div>
    <div v-else>
      <div
        class="p-4 mb-2 mt-10 w-full md:w-1/2 justify-between text-gray-900 mx-auto border-2 border-gray-900 bg-white"
      >
        <h1 class="text-center font-bold block">Order</h1>
        <div>
          <label class="block" for="name"> <small>Name</small> </label>
          <input
            type="text"
            v-model="name"
            class="border-2 w-full border-gray-900 px-2 py-2"
          />
        </div>

        <div>
          <label class="block" for="name"> <small>Address</small> </label>
          <textarea
            type="text"
            v-model="address"
            class="border-2 w-full border-gray-900 px-2 py-2"
          ></textarea>
        </div>

        <div>
          <label class="block" for="name"> <small>Phone</small> </label>
          <input
            type="text"
            v-model="phone"
            class="border-2 border-gray-900 w-full px-2 py-2"
          />
        </div>

        <div>
          <label class="block"> <small>Province</small> </label>
          <vSelect v-model="province" label="province" :options="provinces" />
        </div>
        <div v-if="province.id !== null">
          <label class="block"> <small>City</small> </label>
          <vSelect
            v-model="city"
            label="city_name"
            :options="citiesByProvince"
          />
        </div>
        <div class="w-full flex justify-items-end justify-end">
          <button
            @click="saveShipping"
            class="bg-gray-900 text-white px-10 mt-2 py-2 hover:bg-greeb-600 hover:text-white"
          >
            Save
          </button>
        </div>
      </div>

      <div
        class="p-4 flex space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-gray-900"
      >
        <div>
          <p>Your Shipping Cart</p>
          <!-- <p>{{ $auth.user.name }}</p> -->
          <!-- <p>{{ $auth.user }}</p> -->
        </div>
        <div>
          <!-- <button
          @click="logout"
            class="bg-white text-gray-900 px-3 py-2 hover:bg-red-600 hover:text-white"
          >
            Logout
          </button> -->
        </div>
      </div>
      <ul
        class="divide-y divide-gray-200 mb-1"
        v-for="cart in carts"
        :key="cart.title"
      >
        <article
          class="p-4 flex space-x-4 w-full md:w-1/2 mx-auto border-2 border-b-1 border-gray-900 bg-white"
        >
          <img
            :src="cart.cover"
            alt=""
            class="flex-none w-18 h-18 object-cart"
            width="100"
            height="100"
          />
          <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
            <h2 class="text-lg font-semibold text-black mb-0.5">
              {{ cart.title }}
            </h2>
            <div class="flex flex-wrap flex-col text-sm font-medium">
              <p>Rp. {{ cart.price }}</p>
            </div>
          </div>
          <div>
            <p class="text-bold font-weight-900 text-lg font-bold">
              {{ cart.quantity }} PCS
            </p>
          </div>
        </article>
      </ul>

      <div
        class="p-4 flex space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-yellow-500"
      >
        <div>
          <p class="text-gray-900">Subtotal</p>
        </div>
        <div>
          <p class="text-gray-900 font-bold">
            Rp. {{ totalPrice.toLocaleString("id-ID") }}
          </p>
        </div>
      </div>

      <div
        class="p-4 flex mt-2 space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-gray-900"
      >
        <div>
          <p class="text-white">Courier</p>
        </div>
      </div>

      <div
        class="p-4 mb-20 w-full md:w-1/2 justify-between text-gray-900 mx-auto border-2 border-gray-900 bg-white"
      >
        <div>
          <label class="block"> <small>Courier</small> </label>
          <vSelect v-model="courier" label="text" :options="couriers" />
        </div>

        <div v-if="courier !== ''">
          <label class="block"> <small>Services</small> </label>
          <vSelect
            @change="calculateBill"
            v-model="service"
            label="service"
            :options="services"
          />
        </div>

        <ul v-if="service !== ''">
          <li>Cost :{{ service.cost }}</li>
          <li>Estimasi :{{ service.estimation }} day</li>
        </ul>

        <div
          class="p-4 flex space-x-4 w-full mt-2 mb-3 justify-between text-white mx-auto border-2 border-gray-900 bg-yellow-500"
        >
          <div>
            <p class="text-gray-900">Grantotal</p>
          </div>
          <div>
            <p class="text-gray-900 font-bold">
              Rp. {{ totalBill.toLocaleString("id-ID") }}
            </p>
          </div>
        </div>

        <div class="w-full flex justify-items-end justify-end">
          <button
            @click="pay"
            class="bg-gray-900 text-white px-10 mt-2 py-2 hover:bg-greeb-600 hover:text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "~/assets/vue-select.css";
export default {
  components: {
    vSelect,
  },
  created() {
    this.getProvinces();
    this.getCities();
    this.name = this.$auth.user.name;
    this.address = this.$auth.user.address;
    this.phone = this.$auth.user.phone;

    if (this.couriers.length == 0) {
      this.getCouriers();
    }
    this.setAddress()
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      province: { id: 9, province: "Jawa Barat" },
      city: { id: null, city_name: "" },
      courier: "",
      couriers: [],
      service: "",
      services: [],
      citiesby: [],
      shippingCost: 0,
      totalBill: 0,
      dialogConfirm: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      provinces: "region/provinces",
      cities: "region/cities",
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
      totalWeight: "cart/totalWeight",
    }),
    citiesByProvince() {
      let province_id = this.province.id;
      return this.cities.filter((city) => {
        if (city.province_id == province_id) return city;
      });
    },
  },
  watch: {
    courier(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getServices();
      }
    },
    service(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.calculateBill();
      }
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setProvinces: "region/setProvinces",
      setCities: "region/setCities",
      setCart: "cart/set",
      setPayment: "setPayment",
    }),

    setAddress() {
        this.province.id = this.$auth.user.province_id;
        let prov = this.provinces.find((e) => e.id === this.province.id);
        this.province.province = prov == undefined ? null: prov.province; 
        this.city.id = this.$auth.user.city_id;
        let city = this.cities.find((e) => e.id === this.city.id);
        this.city.city_name = city == undefined ? null: city.city_name
        this.loading = false;
    },
    async saveShipping() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("address", this.address);
      formData.set("phone", this.phone);
      formData.set("province_id", this.province.id);
      formData.set("city_id", this.city.id);

      let config = {
        headers: {
          Authorization: "Bearer " + this.$auth.strategy.token.get(),
        },
      };

      try {
        let res = await this.$region.saveShipping(formData, config);
        console.log(res);
        this.setAlert({
          status: true,
          text: res.message,
          color: "success",
        });

        let fetch = await this.$auth.fetchUser();
      } catch (error) {
        let { data } = error;
        this.setAlert({
          status: true,
          text: data.message,
          color: "error",
        });
      }
    },

    async getServices() {
      let courier = this.courier.id;
      let encodedCart = JSON.stringify(this.carts);
      let formData = new FormData();
      formData.set("courier", courier);
      formData.set("carts", encodedCart);
      let config = {
        headers: {
          Authorization: "Bearer " + this.$auth.strategy.token.get(),
        },
      };

      try {
        let res = await this.$region.getServices(formData, config);
        if (res.data.status != "error") {
          this.services = res.data.services;
          this.setCart(res.data.safe_carts);
        }
        this.setAlert({
          status: true,
          text: res.data.message,
          color: res.data.status,
        });
      } catch (error) {
        let responses = error.response;
        this.setAlert({
          status: true,
          text: responses.data.message,
          color: "error",
        });
      }
    },
    calculateBill() {
      let selectedService = this.services.find((service) => {
        return service.service == this.service.service;
      });
      this.shippingCost = selectedService.cost;
      this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost);
    },
    async pay() {
      let courier = this.courier.id;
      let service = this.service.service;
      let safeCart = JSON.stringify(this.carts);
      let formData = new FormData();
      formData.set("courier", courier);
      formData.set("service", service);
      formData.set("carts", safeCart);
      let config = {
        headers: {
          Authorization: "Bearer " + this.$auth.strategy.token.get(),
        },
      };
      try {
        let res = await this.$region.pay(formData, config);
        if (res && res.status == "success") {
          this.setPayment(res.data);
          this.$router.push({ path: "/myorder" });
          this.setCart([]);
        }
        this.setAlert({
          status: true,
          text: res.message,
          color: res.status,
        });
      } catch (error) {
        let { data } = error.response;
        this.setAlert({
          status: true,
          text: error.response.message,
          color: "error",
        });
      }
    },
    cancel() {
      this.dialogConfirm = false;
    },

    async getCouriers() {
      try {
        let res = await this.$region.getCouriers();
        this.couriers = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getProvinces() {
      try {
        let res = await this.$region.getProvinces();
        this.setProvinces(res.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getCities() {
      try {
        let res = await this.$region.getCities();
        this.setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>