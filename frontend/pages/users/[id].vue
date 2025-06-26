<template>
  <div>
    <Nav />
    <div>
      <button @click="createNewNote">Create Note</button>
      <h1>Your Notes</h1>
      <div v-if="notes">
        <div v-for="note in notes" :key="note.id">
          <NuxtLink :to="`/notes/${note.id}`">
            <h2>{{ note.title }}</h2>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// Get stored authentication data
const jwt = process.client ? sessionStorage.getItem('jwt') : null
const user = process.client ? JSON.parse(sessionStorage.getItem('user') || '{}') : {}

// Fetch user and notes data
const { data: userData } = await $fetch(`/users/${route.params.id}`, {
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${jwt}`
  }
})

const { data: notes } = await $fetch('/notes', {
  baseURL: 'http://localhost:1337/api',
  query: {
    'filters[users_permissions_user][id][$eq]': route.params.id,
    'sort[0]': 'publishedAt:desc',
    'pagination[start]': 0,
    'pagination[limit]': 10
  }
})

const createNewNote = async () => {
  try {
    const { data } = await $fetch('/notes', {
      baseURL: 'http://localhost:1337/api',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          title: 'New Note',
          content: 'Start Writing',
          users_permissions_user: user.id
        }
      }
    })
    
    await router.push(`/notes/${data.id}`)
  } catch (error) {
    console.error('Error creating note:', error)
  }
}
</script>