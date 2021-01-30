<template>
<div>
    <div class="container w-32">
        <div class="vertical-center">
            <div class="custom-number-input h-10 w-32">
                    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button @click="decrement" class=" bg-gray-900 text-white  h-full w-20 cursor-pointer outline-none">
                        <span class="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input type="number" v-model="inputValue" class="outline-none border-2 border-gray-900 bg-white focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"/>
                    <button @click="increment" class="bg-gray-900 text-white  h-full w-20 cursor-pointer">
                        <span class="m-auto text-2xl font-thin">+</span>
                    </button>

                </div>
            </div>
        </div>
    </div>
    <small v-if="required && inputValue > stock" class="text-red-500">Tidak dapat melebihi Stok yang tersedia</small>

</div>
</template>
<style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      counter: 0
    }
  },
  computed: {
    inputValue:{
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    decrement() {
      if (this.inputValue > 0) {
        this.inputValue--
      }
    },
    increment() {
      this.inputValue++
    }
  }
}
</script>