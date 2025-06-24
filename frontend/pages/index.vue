<template>
  <div class="min-h-screen flex flex-col sm:flex-row justify-center items-center text-center p-8 bg-gray-50">
    <div class="sm:w-1/2 w-full mb-8 sm:mb-0">
      <h1 class="text-4xl font-bold mb-4">Welcome to the NoteApp</h1>
      <p class="mb-2 text-lg text-gray-700">Your number one notes sharing application</p>
      <p class="mb-6 text-gray-600">Share your notes with anybody across the globe</p>
      <NuxtLink to="/login">
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </NuxtLink>
    </div>
    <div class="sm:w-1/2 hidden sm:block">
      <img
        src="~assets/undraw_Sharing_articles_re_jnkp.svg"
        alt="Sharing Articles Illustration"
        class="w-full h-auto"
      />
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this page
</script>

<style>
/* Sample Tailwind apply (if preferred)
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>