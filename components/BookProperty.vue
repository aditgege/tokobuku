<template>
    <section class="bg-white py-8 relative">
        <div class="container py-8 px-6 mx-auto">
            <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8" href="#">
			    TENTANG BUKU
		    </a>
            <div>
                <span class="mt-8">Penulis : {{ book.author}}</span>
            <span class="mt-8 mb-8">Penerbit : {{ book.publisher}}</span>
            </div>
            <br>
            <p class="mb-8 break-all">
                Deskripsi:
                {{ book.description }}
            </p>
        </div>
    </section>
</template>
<script>
export default {
    props: ['book']
}
</script>