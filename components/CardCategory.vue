<template>
    <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col cursor-pointer">
        <a @click="$router.push('/category/' + category.slug)">
            <img class="hover:grow hover:shadow-lg" :src="category.image">
            <div class="pt-3 flex items-center justify-between">
                <p class="">{{ category.name }}</p>
            </div>
        </a>
    </div>
</template>
<script>
export default {
    props:['category'],
    name: 'card-book',
    methods: {
        getImage(path) {
            return  'http://localhost:8000/storage/' + path
        }
    }
}
</script>