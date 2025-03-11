// Utilities
import { defineStore } from 'pinia'

export interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
  }),

  actions: {
    initPosts() {
      const savedPosts = localStorage.getItem('blog-posts')
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts)
      }
    },

    savePosts() {
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    },

    createPost(post: Omit<BlogPost, 'id'>) {
      const newPost = {
        ...post,
        id: Date.now().toString(),
      }
      this.posts.push(newPost)
      this.savePosts()
      return newPost
    },

    updatePost(post: BlogPost) {
      const index = this.posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        this.posts[index] = post
        this.savePosts()
        return true
      }
      return false
    },

    deletePost(id: string) {
      const index = this.posts.findIndex(p => p.id === id)
      if (index !== -1) {
        this.posts.splice(index, 1)
        this.savePosts()
        return true
      }
      return false
    },
  },
})