const url = process.env.base
const model = $axios => ({
  login (data) {
    return $axios.$post(url + '/login', data )
  },

  register (data) {
      return $axios.$post(url + '/register', data)
  }
})
export default ({
  $axios
}, inject) => {
  inject('authentication', model($axios))
}