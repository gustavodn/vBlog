<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BlogPostForm from '@/components/BlogPostForm.vue'

const route = useRoute()

// Type assertion to handle dynamic route params
const postId = computed(() => (route.params as { id: string }).id)
</script>

<template>
  <div>
    <v-btn
      icon
      variant="text"
      to="/"
      class="mb-4"
    >
      <v-icon>mdi-arrow-left</v-icon>
      <span class="ml-2">Back to Posts</span>
    </v-btn>

    <h1 class="text-h3 mb-6">
      Edit Post
    </h1>

    <BlogPostForm :post-id="postId" />
  </div>
</template>
