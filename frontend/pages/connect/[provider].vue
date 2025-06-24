<template>
  <div>
    <h1>Authenticating...</h1>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const provider = route.params.provider
const access_token = route.query.access_token

onMounted(async () => {
  try {
    const data = await $fetch(`/auth/${provider}/callback?access_token=${access_token}`, {
      baseURL: 'http://localhost:1337/api'
    })
    
    const { jwt, user } = data
    
    // Store in session storage
    sessionStorage.setItem('jwt', jwt)
    sessionStorage.setItem('user', JSON.stringify({
      username: user.username,
      id: user.id,
      email: user.email
    }))
    
    await router.push(`/users/${user.id}`)
  } catch (error) {
    console.error('Authentication error:', error)
    await router.push('/login')
  }
})
</script>