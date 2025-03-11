<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const dialog = ref(false)

onMounted(() => {
  blogStore.initPosts()
})

const postId = computed(() => (route.params as { id: string }).id)

const post = computed(() => {
  return blogStore.posts.find(p => p.id === postId.value)
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const confirmDelete = () => {
  dialog.value = true
}

const deletePost = () => {
  blogStore.deletePost(postId.value)
  dialog.value = false
  router.push('/')
}
</script>

<template>
  <div v-if="post">
    <v-btn
      icon
      variant="text"
      to="/"
      class="mb-4"
    >
      <v-icon>mdi-arrow-left</v-icon>
      <span class="ml-2">Back to Posts</span>
    </v-btn>

    <v-card>
      <v-card-title class="text-h4">
        {{ post.title }}
      </v-card-title>

      <v-card-subtitle class="pt-2">
        By {{ post.author }} on {{ formatDate(post.date) }}
      </v-card-subtitle>

      <v-divider class="mx-4 my-2" />

      <v-card-text class="text-body-1">
        <p style="white-space: pre-line;">
          {{ post.content }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="warning"
          variant="text"
          :to="`/edit/${post.id}`"
        >
          Edit
        </v-btn>

        <v-btn
          color="error"
          variant="text"
          @click="confirmDelete"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete Post
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this post? This action cannot be undone.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            variant="text"
            @click="deletePost"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div v-else>
    <v-alert
      type="error"
      title="Post Not Found"
      text="The requested blog post could not be found."
    >
      <template #append>
        <v-btn
          color="primary"
          variant="text"
          to="/"
        >
          Return to Home
        </v-btn>
      </template>
    </v-alert>
  </div>
</template>
