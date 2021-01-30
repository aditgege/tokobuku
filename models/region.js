const url = process.env.base
const model = $axios => ({
  getCouriers () {
    return $axios.$get(url + '/couriers')
  },
  getCities () {
    return $axios.$get(url + '/cities')
  },
  getProvinces () {
    return $axios.$get(url + '/provinces')
  },

  getServices (data, config) {
    return $axios.$post(url + '/services', data, config)
  },

  saveShipping(data, config) {
    return $axios.$post(url + '/shipping', data, config)
  },

  pay(data, config) {
    return $axios.$post(url + '/payment', data, config)
  }
})
export default ({
  $axios
}, inject) => {
  inject('region', model($axios))
}