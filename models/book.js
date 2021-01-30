const url = process.env.base
const model = $axios => ({
  getBooks () {
    return $axios.$get('/books')
  },
  getBook (slug) {
    return $axios.$get('/books/slug/' + slug)
  }
})
export default ({
  $axios
}, inject) => {
  inject('book', model($axios))
}