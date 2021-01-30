const url = process.env.base
const model = $axios => ({
  getCategories () {
    return $axios.$get(url + '/categories')
  },
  getBooksIncategory (slug) {
    return $axios.$get(url + '/categories/slug/' + slug)
  }
})
export default ({
  $axios
}, inject) => {
  inject('category', model($axios))
}