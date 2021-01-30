const url = process.env.base
const model = $axios => ({
  getCategories () {
    return $axios.$get('/categories')
  },
  getBooksIncategory (slug) {
    return $axios.$get('/categories/slug/' + slug)
  }
})
export default ({
  $axios
}, inject) => {
  inject('category', model($axios))
}