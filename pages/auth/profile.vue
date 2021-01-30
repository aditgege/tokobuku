<template>
  <div class="h-screen">
		<div
      class="p-4 mb-2 mt-10 w-full md:w-1/2 justify-between text-gray-900 mx-auto border-2 border-gray-900 bg-white"
    >
		<h1 class=" text-center font-bold block">PROFILE</h1>
      <div>
				<label class="block" for="name"> <small>Name</small> </label>
				<input type="text" :value="$auth.user.username" class="border-2 border-gray-900 px-2 py-2">
      </div>

			<div>
				<label class="block" for="name"> <small>Email</small> </label>
				<input type="text" :value="$auth.user.email" class="border-2 border-gray-900 px-2 py-2">
      </div>
			
    </div>
    <div
      class="p-4 flex space-x-4 w-full md:w-1/2 justify-between text-white mx-auto border-2 border-gray-900 bg-gray-900"
    >
      <div>
        <!-- <p>{{ $auth.user.name }}</p> -->
        <!-- <p>{{ $auth.user }}</p> -->
      </div>
      <div>
        <button
				@click="logout"
          class="bg-white text-gray-900 px-3 py-2 hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	methods: {
		async logout() {
			await this.$auth.logout()
		}
	}
}
</script>