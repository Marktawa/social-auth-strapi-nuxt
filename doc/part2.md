## Introduction

In this tutorial, we’ll be learning how to integrate social authentication into our [Strapi](https://strapi.io/) application. In order to do this we’ll be building a simple notes sharing application with Strapi backend and [Nuxt.js](https://nuxtjs.org/) frontend, we’ll also use [Quill.js](https://quilljs.com/) as our text editor, [Nodemailer](https://nodemailer.com/) for emails, we’ll integrate infinite scrolling and many more features.

This is the second part of the tutorial series on social authentication with strapi. The [first part](https://strapi.io/blog/social-authentication-with-strapi-and-nuxt-js-getting-started) was all about getting started, we looked at a couple of things like getting started with Strapi, installing Strapi, and building a backend API with Strapi.

What’ll you need for this tutorial:

*   Basic knowledge of [Vue.js](https://vuejs.org/)
*   Knowledge of JavaScript
*   [Node.js](https://nodejs.org/en/) (v14 recommended for Strapi)
*   [MongoDB](https://www.mongodb.com/)

Here’s what the final version of our application looks like

![](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617459545504_notes_app-notes5.jpg)

![](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617459752392_notes_app-notes6.jpg)

The GitHub repository for the front-end application can be found [here](https://github.com/oviecodes/nuxt-strapi-notesapp), the repo for the back-end application can be found [here](https://github.com/oviecodes/strapi_notesapp).

## Adding Login Providers

Table of contents

*   GitHub authentication and getting our GitHub credentials
*   Configuring the GitHub provider in our Strapi backend
*   Facebook authentication and getting our Facebook credentials
*   Configuring the Facebook provider in our Strapi backend
*   Building the Home page
*   Building the Login page
*   Building the Nuxt.js frontend to handle redirects
*   Building the user page

To learn more about adding login providers to your Strapi application, feel free to look at the official [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html). The documentation gives everything from login to JWT to adding 3rd parting providers.

## GitHub authentication and getting our GitHub credentials

1.  Visit the OAuth Apps list page [https://github.com/settings/developers](https://github.com/settings/developers)
2.  Click on **New OAuth App** button
3.  Fill the information
    *   **Application name**: strapi-notes-app
    *   **Homepage URL**: `http://localhost:1337/`
    *   **Application description**: Strapi notes sharing application
    *   **Authorization callback URL**: `http://localhost:1337/connect/github/callback`

## Configuring the GitHub provider in our Strapi backend

1.  Open up your Strapi application that’s hosted on `http://localhost:1337`
2.  Click on Settings
3.  Under settings, Click on Providers
4.  Click on the **GitHub** provider
5.  Fill the information (replace with your own client ID and secret):
    *   **Enable**: `ON`
    *   **Client ID**: `YOUR_GITHUB_CLIENT_ID`
    *   **Client Secret**: `YOUR_GITHUB_CLIENT_SECRET`
    *   **The redirect URL to your front-end app**: `http://localhost:3000/connect/github`

## Facebook authentication and getting our Facebook credentials

1.  Visit the Developer Apps list page [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
2.  Click on **Add a New App** button
3.  Fill the **Display Name** in the modal and create the app
4.  Setup a **Facebook Login** product
5.  Click on the **PRODUCTS > Facebook login > Settings** link in the left menu
6.  Fill the information and save:
    *   **Valid OAuth Redirect URIs**: `https://localhost:1337/connect/facebook/callback`
7.  Then, click on **Settings** in the left menu
8.  Then on **Basic** link
9.  You should see your Application ID and secret, save them for later

## Configuring the Facebook provider in our Strapi backend

1.  Open up your Strapi application that’s hosted on `http://localhost:1337`
2.  Click on Settings
3.  Under settings, Click on Providers
4.  Click on the **Facebook** provider
5.  Fill the information (replace with your own client ID and secret):
    *   **Enable**: `ON`
    *   **Client ID**: `YOUR_CLIENT_ID`
    *   **Client Secret**: `YOUR_CLIENT_SECRET`
    *   **The redirect URL to your front-end app**: `http://localhost:3000/connect/facebook`

## Building the Home page

Now, we can start building the frontend of our application. let’s start by building our components, but first let’s edit our layouts at `layouts/default.vue`.

*   To begin, open up your Nuxt.js project,
*   Head over to the `layouts` directory and open the `default.vue` file then fill it up with the following code.

```vue
 <template>
  <div>
    <Nuxt />
  </div>
</template>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--green:focus {
  outline: 0px !important;
}
.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid skyblue;
  color: blue;
  text-decoration: none;
  padding: 10px 30px;
}
.button--blue:hover {
  color: #fff;
  background-color: skyblue;
}
.button--blue:focus {
  outline: 0px !important;
}
.ql-container.ql-snow {
  border: 0px !important;
}
.quill-editor img {
  margin: 0 auto;
  width: 60%;
}
.ql-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  color: #fff;
  border: 0px !important;
}
.quill-editor {
  min-height: 200px;
  padding: 10%;
  overflow-y: auto;
}
.hex {
  z-index: 9999999999;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: fixed;
}
</style>
```

*   Open up the `index.vue` file in the `pages` directory,
*   Fill it up with the following code.

```vue
<template>
    <div
    class="min-h-screen flex justify-center items-center text-center mx-auto sm:pl-24 bg-yellow-200"
    >
    <div class="w-1/2 sm:text-left sm:m-5">
        <div>
        <h1
            class="text-3xl sm:text-6xl font-black sm:pr-10 leading-tight text-blue-900"
        >
            Welcome to the NoteApp
        </h1>
        <p class="sm:block hidden my-5">
            Your number one notes sharing application
            <br />
            Share your notes with anybody across the globe
        </p>
        </div>
        <div class="links">
        <NuxtLink to="/login" class="button--blue shadow-xl"> Login </NuxtLink>
        </div>
    </div>
    <div class="w-1/2 hidden sm:block">
        <img
        class=""
        src="~assets/undraw_Sharing_articles_re_jnkp.svg"
        />
        
    </div>
    </div>
</template>
<script>
export default {}
</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
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
```

With the above code we’ve built the homepage of our notes sharing application, the next task is to build a login page, from which users can login into our application.

## Building the Login page

Execute the following code to create a `login.vue` file.

```
cd pages
touch login.vue
```

Fill up the `login.vue` file with the code below

```vue
<template>
  <div
    class="min-h-screen flex justify-center items-center text-center mx-auto sm:pl-24 bg-yellow-200"
  >
    <div class="w-1/2 hidden sm:block m-5 p-6">
      <img src="~assets/undraw_secure_login_pdn4.svg" />
    </div>
    <div class="sm:w-1/2 w-4/5">
      <h2 class="m-5 font-black text-3xl">Social Login</h2>
      <div class="shadow-xl bg-white p-10">
        <a
          href="http://localhost:1337/connect/github"
          class="cursor-pointer m-3 button--blue shadow-xl"
        >
          <span><font-awesome-icon :icon="['fab', 'github']" /></span>
          Github
        </a>
        <a
          href="https://localhost:1337/connect/facebook"
          class="cursor-pointer m-3 button--blue shadow-xl"
        >
          <span>
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </span>
          Facebook
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
```

In the code above, we create links to our Strapi backend’s Facebook and GitHub logic using `<a><a/>` tags. When a user clicks on the link, our login logic is ready to execute. We are also using font-awesome to display icons, let’s see how to do that:

### Installing and using nuxt-fontawesome

In your terminal, execute the following code to install font-awesome

```
yarn add nuxt-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons. //using yarn

npm i nuxt-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons //using npm
```

*   Open up your `nuxt.config.js` file, and add the following lines of code

```js
modules : [
  //... other modules
  [
      'nuxt-fontawesome',
      {
          imports: [
              {
                  set: '@fortawesome/free-solid-svg-icons',
                  icons: [ 'fas' ]
              },
              {
                  set: '@fortawesome/free-brands-svg-icons',
                  icons: [ 'fab' ]
              }
          ]
      }
  ],
]
```

Now we should see the Facebook and GitHub icons displayed correctly.

## Building the Nuxt.js frontend to handle redirects

Execute the following

```
cd pages
mkdir connect
touch _provider.vue
```

Open up the `_provider.js` file and add the following code

```vue
<template>
  <div>
    <h1>user page</h1>
  </div>
</template>
<script>

export default {
  data() {
    return {
      provider: this.$route.params.provider,
      access_token: this.$route.query.access_token,
    }
  },
  async mounted() {
    const res = await this.$axios.$get(
      `/auth/${this.provider}/callback?access_token=${this.access_token}`
    )
    
    const { jwt, user } = res
    // store jwt and user object in localStorage
    this.$auth.$storage.setUniversal('jwt', jwt)
    this.$auth.$storage.setUniversal('user', { username: user.username, id: user.id, email: user.email })

    this.$router.push(`/users/${user.id}`)
  },
}
</script>
<style lang="scss" scoped></style>
```

In the code segment above, we’re handling redirects from the Strapi backend, Nuxt.js has a routing pattern that we’re taking advantage of `/connect/_provider` where provider could be GitHub or Facebook in our case or any other 3rd party login provider.

We get an access token from the provider which we store as `access_token`, then we make an API call to the backend in the mounted lifecycle method which returns a response that contains the `user` and a JWT. We then store the user and JWT in both cookies and localStorage using a package called [@nuxtjs/auth-next](https://auth.nuxtjs.org/).

Finally we redirect to the user account page where they can create a note and view their existing notes if any is available. Before we create the user page, lets see how to install and use the @nuxtjs/auth-next package.

### Installing and using @nuxtjs/auth-next

Execute the following to install @nuxtjs/auth-next

```
yarn add @nuxtjs/auth-next //using yarn

npm install @nuxtjs/auth-next //using npm
```

Open up your `nuxt.config.js` file and add the following code

```js
modules: [
  //...other modules
  '@nuxtjs/auth-next',
]
```

## Building the user page

Execute the following

```
cd pages
mkdir user
touch _id.vue
```

Open up the `_id.vue` file and fill it up with the following code

```vue
<template>
  <div>
    <Nav/>
    <div class="sm:w-2/3 w-4/5 mt-10 mx-auto">
      <button class="button--blue" @click="createNewNote">Create Note</button>
      <h1 class="my-5 text-2xl font-black">Your Notes</h1>
      <div v-if="notes" class="mx-auto sm:grid grid-cols-3 gap-2">
        <div
          v-for="(note, i) in notes"
          :key="i"
          class="rounded border-5 border-blue-400 p-10 sm:flex shadow-lg h-48 items-center justify-center text-center"
        >
        <NuxtLink :to="`/notes/${note.id}`">
          <h1 class="text-xl">
            {{ note.title }}
          </h1>
        </NuxtLink>
        
        </div>
      </div>
      <infinite-loading  spinner="spiral" @infinite="infiniteHandler" />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $strapi, route, $axios, $auth }) {
    const user = await $axios.$get(`/users/${ route.params.id }`, {
      headers: {
        Authorization: `Bearer ${ $auth.$storage.getUniversal('jwt') }`
      }
    })
    const notes = await $strapi.$notes.find({
      'users_permissions_user.id': route.params.id,
      _sort: `published_at:DESC`,
      _start: `0`,
      _limit: `3`
    })
    return { notes, user }
  },
  data() {
    return {
      title: `New Note`,
      content: `<p>Start Writing</p>`,
      start: 3,
      limit: 3,
      token: this.$auth.$storage.getUniversal('jwt')
    }
  },
  methods: {
    async createNewNote() {
      const newNote = await this.$axios.$post(`/notes`, {
        title: this.title,
        content: this.content,
        users_permissions_user: this.user,
        Editors: [],
      },
      {
        headers: {
          Authorization: `Bearer ${ this.token }`
        }
      }
      )
      console.log(newNote)
      this.$router.push(`/notes/${newNote.id}`)
    },
    async infiniteHandler($state) {
      const newData = await this.$strapi.$notes.find({
        'users_permissions_user.id': this.$route.params.id,
        _sort: `published_at:DESC`,
        _start: `${this.start}`,
        _limit: `${this.limit}`
      })
      if(newData.length) {
        this.start += this.limit
        this.notes.push(...newData)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

Here, we just build our user page. We fetch the user and their notes from our Strapi backend, then display the notes appropriately and also enable the user create a new note. We are also integrating infinite scrolling for our notes, and we’re using both the [@nuxtjs/axios](https://axios.nuxtjs.org/) and [@nuxtjs/strapi](https://strapi.nuxtjs.org/) packages for fetching data from the backend.

### Setting up @nuxtjs/axios

[@nuxtjs/axios](https://axios.nuxtjs.org/) is automatically integrated with Nuxt.js if you chose the option while installing Nuxt.js. We just have to set up our `baseURL` .

Open up your `nuxt.config.js` file and add the following lines of code.

```js
// Axios module configuration: https://go.nuxtjs.dev/config-axios
axios: {
    baseURL: 'https://strapi-notesapp.herokuapp.com'
},
```

### Installing and Setting up @nuxtjs/strapi

Execute the following lines of code to install @nuxtjs/strapi.

```
yarn add @nuxtjs/strapi //using yarn

npm install @nuxtjs/strapi //using npm
```

Open up your `nuxt.config.js` file and add the following lines of code.

```js
modules: [
  //...other modules
  @nuxtjs/strapi
]

strapi: {
    entities: [ 'notes', 'users' ],
    url: 'http://localhost:1337'
}
```

### Installing and using vue-infinite-loading

[Vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) is a package that allows us integrate infinite scrolling into our application.

Execute the following lines of code to install @nuxtjs/strapi.

```
yarn add vue-infinite-loading //using yarn

npm install vue-infinite-loading //using npm
```

Open up your `nuxt.config.js` file and add the following lines of code.

```js
plugins: [
  //...other plugins
  {
    src: '~/plugins/infiniteloading',
    ssr: false
  }
]
```

Create a file called `infiniteloading.js` in the plugins directory and fill it up with the following code.

```js
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading', InfiniteLoading)
```

### Building the Nav component

Execute the following to create a `Nav.vue` file

```
cd components
touch Nav.vue
```

Open up the `Nav.vue` file and fill it up with the following code.

```vue
<template>
  <div class="p-6 mb-4 shadow-lg bg-dark">
    <div class="sm:w-2/3 mx-auto flex justify-between items-center">
        <div>
            <h1> NotesApp </h1>
        </div>
        <div class="flex sm:space-x-5 space-x-2 items-center">
            <NuxtLink :to="`/users/${userId}`">
             <p v-if="username"><span><font-awesome-icon :icon="['fas', 'user']" /></span> {{ username }}</p>
            </NuxtLink>
            <button class="button--blue" @click="logout" v-if="username" > Logout </button>
            <NuxtLink class="button--green" v-if="!username" to="/login" > Sign in </NuxtLink>
        </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Nav',
  data() {
    return {
      username: this.$auth.$storage.getUniversal('user')?.username,
      userId: this.$auth.$storage.getUniversal('user')?.id
    }
  },
  methods: {
    logout() {
      this.$auth.$storage.removeUniversal('user')
      this.$auth.$storage.removeUniversal('jwt')
      this.$router.push(`/login`)
    },
  },
}
</script>
<style scoped></style>
```

## Conclusion

We’ve come to the end of the second article, in the next article we’ll look at how we can integrate vue-quill-editor to enable users create contents, image uploads, copying links and email sharing.

This tutorial is divided into 3 parts

*   1- [Getting started](https://strapi.io/blog/social-authentication-with-strapi-and-nuxt-js-getting-started) ✅
*   2- Adding Login Providers ✅
*   3- [Customization](https://strapi.io/blog/social-authentication-with-strapi-and-nuxt-js-customization) ⏭️

