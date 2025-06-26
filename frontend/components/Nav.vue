<template>
  <nav>
    <div>
      <h1>NotesApp</h1>
    </div>
    <div>
      <NuxtLink v-if="user?.id" :to="`/users/${user.id}`">
        {{ user.username }}
      </NuxtLink>
      <button v-if="user?.username" @click="logout">Logout</button>
      <NuxtLink v-else to="/login">
        <button>Sign in</button>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const router = useRouter()

const user = ref({})

onMounted(() => {
  if (process.client) {
    const userData = sessionStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    }
  }
})

const logout = () => {
  if (process.client) {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('jwt')
  }
  router.push('/login')
}
</script>