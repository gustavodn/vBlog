<script setup lang="ts">
  //
</script>

<template>
  <v-app-bar
    color="primary"
    app
    flat
  >
    <v-app-bar-title>
      <router-link
        class="text-white text-decoration-none"
        to="/"
      >
        VBlog
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <v-btn
      to="/"
      variant="text"
      class="text-white"
    >
      Home
    </v-btn>

    <v-btn
      to="/create"
      variant="text"
      class="text-white"
    >
      Create Post
    </v-btn>
  </v-app-bar>
</template>



