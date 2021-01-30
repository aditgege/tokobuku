const url = process.env.base
const model = $axios => ({
  getBooks () {
    return $axios.$get(url + '/books')
  },
  getBook (slug) {
    return $axios.$get(url + '/books/slug/' + slug)
  }
})
export default ({
  $axios
}, inject) => {
  inject('book', model($axios))
}