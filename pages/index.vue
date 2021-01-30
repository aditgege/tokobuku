<template>
  <div>
    <Carousel />
    <div>
      <Category /> 
    </div>
    <div>
      <Books />
    </div>
  </div>
</template>

<script>
import Carousel from '~/components/Carousel'
import Category from '~/components/Category'
import Books from '~/components/Books'


export default {
  components: {
    Carousel,
    Category,
    Books
  }
}
</script>
