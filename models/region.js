const url = process.env.base
const model = $axios => ({
  getCouriers () {
    return $axios.$get('/couriers')
  },
  getCities () {
    return $axios.$get('/cities')
  },
  getProvinces () {
    return $axios.$get('/provinces')
  },

  getServices (data, config) {
    return $axios.$post('/services', data, config)
  },

  saveShipping(data, config) {
    return $axios.$post('/shipping', data, config)
  },

  pay(data, config) {
    return $axios.$post('/payment', data, config)
  }
})
export default ({
  $axios
}, inject) => {
  inject('region', model($axios))
}