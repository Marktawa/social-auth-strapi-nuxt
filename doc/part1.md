## Introduction

Social Authentication is becoming popular in the software industry because of the convenience it provides to users.

In this tutorial, we'll be learning how to integrate social authentication into our [Strapi](https://strapi.io/) Application, and we'll be building a simple Notes Sharing Application with Strapi backend and [Nuxt.js](https://strapi.io/integrations/nuxtjs-cms) frontend, we'll also use [Quill.js](https://quilljs.com/) as our text editor, [Nodemailer](https://nodemailer.com/) for emails, we'll integrate infinite scrolling and many more features.

## Prerequisites

What you will need for this tutorial:
- Basic knowledge of [Vue.js](https://vuejs.org/)
- Knowledge of JavaScript
- [Node.js](https://nodejs.org/en/) (v14 recommended for Strapi)
- MongoDB (Get started [here](https://masteringbackend.com/posts/mongodb-tutorial-the-ultimate-guide))

## What you will build

Here's what the final version of our Application looks like:

[Application preview](https://api-prod.strapi.io/uploads/Application_preview_d0be607826.png)

![Application preview](https://api-prod.strapi.io/uploads/Application_preview_d0be607826.png)

You can find the GitHub repository for the [frontend application](https://github.com/oviecodes/nuxt-strapi-notesapp) and the repository for the [backend application](https://github.com/oviecodes/strapi_notesapp).

Let's get started with our Strapi Backend setup.

## What is Strapi?

The [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html) says that "Strapi is a flexible, open-source Headless CMS that gives developers the freedom to choose their favorite tools and frameworks while also allowing editors to manage and distribute their content easily."

By making the admin panel and API extensible through a plugin system, Strapi enables the world's largest companies to accelerate content delivery while building beautiful digital experiences.

## Installing Strapi

The [documentation](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/cli.html) walks you through installing Strapi from the CLI, the minimum requirements for running Strapi, and how to create a quickstart project.

The Quickstart project uses SQLite as the default database, but we want to use MongoDB as our database, so we will do things a little differently here and head over to [Strapi docs](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations/databases/mongodb.html) for MongoDB.

Make sure that you have the MongoDB server running before you start the process and leave the username and password options blank by pressing enter when prompted for them.

> For latest updates on Strapi and MongoDB, please reference this [blog post](https://strapi.io/blog/mongo-db-support-in-strapi-past-present-and-future).

```bash
yarn create strapi-app my-project # using yarn
npx create-strapi-app my-project  # using npx
```

Replace `my-project` with the name you wish to call your application directory. Your package manager will create a directory with the name and will install Strapi.

If you have followed the instructions correctly, you should have Strapi installed on your machine.

```bash
cd my-project
yarn develop # using yarn
npm run develop # using npm
```

To start our development server, Strapi starts our app on `http://localhost:1337/admin`

## Basic overview of a Strapi application

Strapi provides an admin panel to edit, create APIs, and provide editable code, and it's easy to edit the code and use JavaScript.

On the Strapi admin panel, we have the `collection types`, and these are similar to models or schema in a database. A collection type has fields that are like properties. Strapi offers a wide range of options for fields, including Text, Short Text, Relations, and many more.

We also have the `Plugins` section, which contains the `content-type` builder and the `media library`. The Content Builder allows users to create different content types, while the Media Library contains all the media uploads done by users.

![User-uploaded image: notes_app-note3.jpg](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617428649379_notes_app-note3.jpg)

Finally, we have the `General` section, which has the `marketplace`, the `plugins`, and `settings`. The `settings` section allows us to set the user permissions, roles, and many more essential functions.

Strapi also provides us with code generated based on the User's setting and actions in the admin panel, and we can open up this code with our favorite code editor to explore it more.

I'm using visual studio code.

![](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617446720420_notes_app_note4.jpg)

The `API` section (directory) contains the different Content-Type present in our Application. It has a code to edit depending on what goals we plan to achieve with our Application.

We can edit default settings, and we can create new services, routes, endpoints, add environment variables and do so much more all from the code.

For more information about the code composition of Strapi and what each section (directory) does, feel free to look at the Strapi [project structure](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/file-structure.html).

## Building the backend API

Now that the Strapi backend is up and running, we can start building the backend API. We'll create the backend using the Strapi admin panel.

![Strapi admin panel](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617425574221_notes_app-note1.jpg)

# Building the Notes collection-type

Next, we are going to create the Notes Collection Type. Follow these steps below to create your first Collection Types.

1.  Open up the Strapi admin panel.
2.  Navigate to the content builder section
3.  Under Collection Types, click "create new collection type."
4.  A popup window should come up and prompt you to enter a display name, type `note` and then click Continue.
5.  Another popup should come up where you can choose the fields you want the Collection-Type to have.

Next, we are going to choose all the fields on the Notes Collection Type. Follow the step below to choose your types.

1.  On the popup window, click `Text`, name the field `title`, leave the type selection as `Short Text`, and add another field.
2.  Select `Rich Text`, name the field `content`, then click on add another field
3.  Select `JSON`, name the field `Editors`, then click on add another field
4.  Finally, select `Relations`, and then click on the dropdown that's on the right side of the popup window, select `User (from: users-permissions-user)`, then click on Users have many notes. It should look like the image below.

![](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617428491349_notes_app-note2.jpg)

If you follow the steps above correctly, the final notes collection type schema should look like the image below.

![](https://paper-attachments.dropbox.com/s_79BF70BAA3D70DB191E3093D0EAD323EB7F6E2886FE3F69EF110CEB48794F12A_1617428649379_notes_app-note3.jpg)

### Setting the permissions

Now, we have successfully created our Notes Content Types, let's add and assign a permission level on the notes Collection-Type for authenticated User by following the steps below.

1.  Click on Settings under `GENERAL` in the side menu
2.  Click on Roles under Users and Permissions Plugin.
3.  It will display a list of roles. Click on authenticated
4.  Scroll down, under Permissions, click on Application, then check all the checkboxes except `Count and Find`.

### Setting user-permissions for authenticated user

Next, we will also create and assign user permissions for an authenticated user by following the steps below.

1.  Scroll down, under User-Permissions, navigate to User, then check `findOne` and me.
2.  Click Save, then go back.

### Setting the permissions on the notes collection-type for public user

Next, we will also create and assign permissions on notes collection-type for our public users by following the steps below.

1.  Click public
2.  Scroll down, under permissions, click on Application, then check findOne and find.

### Setting the upload permissions for public user

We will also create and assign upload permissions for our public users by following the steps below.

1.  Scroll down.
2.  Under uploads.
3.  Select find, destroy, findOne and upload.

### Setting user-permissions for public user

Lastly, we will also create and assign user permissions for our public users by following the steps below.

1.  Scroll down.
2.  Under User-Permissions
3.  Navigate to User.
4.  Then check find, findOne, and me.

## Using MongoDB Atlas

Up until now, we used our local Mongo DB server on our local machine as the database for our application. However, if we want to successfully host our Strapi Application, we need a database that is hosted somewhere on the web because hosting providers cannot talk to your localhost.

To get started with MongoDB Atlas, follow the instructions below:

1.  Create a Mongo DB account on the [MongoDb website](https://www.mongodb.com/cloud/atlas1).

2.  Create a Project and a Cluster

*   Click on `Create a new Project`.
*   Then click `Build a Cluster`, from the options page:
    *   Choose AWS as your Cloud Provider & Region.
    *   Select a Region that has a free tier
    *   Under Cluster Tier, select Shared Sandbox, _Tier_ `MO`.
    *   Under Cluster Name, name your cluster.
*   Click the green `Create Cluster` button.

3.  Under `Overview` click on the `Database Access` in the left menu :
    *   Click the green `+ ADD NEW USER` button:
        *   Enter a `username`.
        *   Enter a `password`.
        *   Under `User Privileges` ensure `Read and write to any database` is selected. Then click `Add User`.

4.  Click on `Network Access`, under `Security` in the left menu:
    *   Click the green `+ ADD IP ADDRESS`
    *   Click `ADD CURRENT IP ADDRESS` or **manually** enter in an IP address to `whitelist`.
    *   Next add `0.0.0.0/0` in the `Whitelist Entry`.
    *   Leave a comment to label this IP Address. E.g. `Anywhere`.
    *   Click `Confirm`. Then wait until the status turns from `Pending` to `Active`.

5.  Retrieve database credentials In order to retrieve your database credentials do the following:
    *   Under `Atlas` in the left-hand, click on `Clusters`.
    *   Click `CONNECT` and then `Connect Your Application`.
    *   Under `1. Choose your driver version`, select `DRIVER` as `Node.js` and `VERSION` as `3.6 or later`.
    *   Your `CONNECTION STRING` should be similar to this:

`mongodb+srv://alecGodwin<password>@cluster0.5gjqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

Please replace `<password>` with your Mongo DB Atlas password.

6.  Open up your `config/database.js` file and add the following lines of code

```js
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI'),
      },
      options: {
         ssl: true,
       },
     },
   },
 });
```

7.  Open up your `.env` file then add your `connection string` from instruction 5 as your `DATABASE_URI` .

## Installing Nuxt.js

Next, we will install and configure NuxtJs to work with our Strapi backend.

To install Nuxt.js, visit [the Nuxt.js docs](https://nuxtjs.org/docs/2.x/get-started/installation) or run one of these commands to get started.

```
yarn create nuxt-app <project-name> //using yarn
npx create-nuxt-app <project-name> //using npx
npm init nuxt-app <project-name> //using npm
```

The command will ask you some questions (name, Nuxt options, U.I. framework, TypeScript, linter, testing framework, etc.).

We want to use Nuxt in SSR mode, Server Hosting, and Tailwind CSS as our preferred CSS framework, so select those, then choose whatever options for the rest.

Preferably leave out C.I., commit-linting, style-linting, and the rest but do whatever you like. All we'll be needing in this tutorial is what I've mentioned above.

Once all questions are answered, it will install all the dependencies. The next step is to navigate to the project folder and launch it.

```
cd <project-name

yarn dev //using yarn
npm run dev //using npm
```

We should have the Nuxt.js Application running on [`http://localhost:3000`](http://localhost:3000).

## Conclusion

That should be all for now. The following article will examine how we can add various providers (Facebook, GitHub) to our Strapi backend and build the appropriate frontend pages to handle redirects.

This tutorial is divided into 3 parts 1) Getting started ✅ 2) [Adding Login Providers](https://strapi.io/blog/social-authentication-with-strapi-and-nuxt-js-adding-social-providers) ⏭️ 3) [Customization](https://strapi.io/blog/social-authentication-with-strapi-and-nuxt-js-customization)