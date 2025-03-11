<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore, type BlogPost } from '@/stores/blog'

const props = defineProps<{
  post: BlogPost
}>()

const router = useRouter()
const blogStore = useBlogStore()
const dialog = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const truncateContent = (content: string) => {
  if (content.length <= 150) return content
  return content.substring(0, 150) + '...'
}

const confirmDelete = () => {
  dialog.value = true
}

const deletePost = () => {
  blogStore.deletePost(props.post.id)
  dialog.value = false

  if (router.currentRoute.value.path.includes(`/post/${props.post.id}`)) {
    router.push('/')
  }
}
</script>

<template>
  <v-card class="mb-4">
    <v-card-title class="text-h5">
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle>
      By {{ post.author }} on {{ formatDate(post.date) }}
    </v-card-subtitle>

    <v-card-text>
      <p>{{ truncateContent(post.content) }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="text"
        :to="`/post/${post.id}`"
      >
        Read More
      </v-btn>

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
</template>
