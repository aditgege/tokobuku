const url = process.env.base
const model = $axios => ({
  login (data) {
    return $axios.$post('/login', data )
  },

  register (data) {
      return $axios.$post('/register', data)
  }
})
export default ({
  $axios
}, inject) => {
  inject('authentication', model($axios))
}