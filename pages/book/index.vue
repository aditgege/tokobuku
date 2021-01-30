<template>
  <section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <card-book v-for="book in books" :book="book" :key="book.id"/>
    </div>
  </section>
</template>
<script>
import BookCard from "~/components/BookCard"
export default {
    components: {
        BookCard
    }
}
</script>
<script>
export default {
    data() {
        return {
            books: []
        }
    },
    created () {
        this.getBook()
    },
    methods: {
        async getBook() {
            try {
                const req = await this.$book.getBooks();
                this.loading = false;
                this.books = req.data
            } catch (error) {
                this.loading = false;
            }
        },
    }
}
</script>