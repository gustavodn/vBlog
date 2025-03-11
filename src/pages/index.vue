<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogPostCard from '@/components/BlogPostCard.vue'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.initPosts()
})
</script>

<template>
  <div>
    <h1 class="text-h3 mb-6">
      Blog Posts
    </h1>

    <v-row v-if="blogStore.posts.length > 0">
      <v-col
        v-for="post in blogStore.posts"
        :key="post.id"
        cols="12"
      >
        <BlogPostCard :post="post" />
      </v-col>
    </v-row>

    <v-card
      v-else
      class="pa-4 text-center"
    >
      <v-card-text>
        <p class="text-h6">
          No blog posts yet.
        </p>
        <v-btn
          color="primary"
          to="/create"
          class="mt-4"
        >
          Create Your First Post
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
