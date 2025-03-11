<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const props = defineProps<{
  postId?: string
}>()

const router = useRouter()
const blogStore = useBlogStore()
const form = ref(null)
const loading = ref(false)

const isEditing = computed(() => !!props.postId)

const formData = ref({
  title: '',
  content: '',
  author: '',
})

onMounted(() => {
  if (isEditing.value && props.postId) {
    const post = blogStore.posts.find(p => p.id === props.postId)
    if (post) {
      formData.value = {
        title: post.title,
        content: post.content,
        author: post.author,
      }
    } else {
      router.push('/')
    }
  }
})

const submitForm = async () => {
  // @ts-expect-error - form validation
  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true

    try {
      if (isEditing.value && props.postId) {
        blogStore.updatePost({
          id: props.postId,
          ...formData.value,
          date: new Date().toISOString(),
        })
      } else {
        blogStore.createPost({
          ...formData.value,
          date: new Date().toISOString(),
        })
      }

      router.push('/')
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <v-form
    ref="form"
    @submit.prevent="submitForm"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ isEditing ? 'Edit Post' : 'Create New Post' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="formData.title"
          label="Title"
          required
          :rules="[v => !!v || 'Title is required']"
        />

        <v-textarea
          v-model="formData.content"
          label="Content"
          required
          :rules="[v => !!v || 'Content is required']"
          auto-grow
          rows="5"
        />

        <v-text-field
          v-model="formData.author"
          label="Author"
          required
          :rules="[v => !!v || 'Author is required']"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="error"
          variant="text"
          @click="router.push('/')"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          variant="text"
          type="submit"
          :loading="loading"
        >
          {{ isEditing ? 'Update' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
