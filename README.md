# VBlog - Vue & Vuetify Blog Application

A simple blog application built with Vue 3 and Vuetify 3, featuring a complete CRUD system for managing blog posts.

## Features

- **Home Page**: Displays all blog posts with options to read, edit, or delete.
- **Create Post**: Add new blog posts with title, content, and author information.
- **Read Post**: View the full content of a blog post.
- **Edit Post**: Modify existing blog posts.
- **Delete Post**: Remove blog posts with confirmation.
- **Persistent Storage**: Blog posts are saved to localStorage and persist through page refresh.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with ESLint

```sh
npm run lint
```

## Application Structure

- **Components**:
  - `AppBar.vue`: Navigation bar component
  - `BlogPostCard.vue`: Card component for displaying blog post previews
  - `BlogPostForm.vue`: Form component for creating and editing blog posts

- **Pages**:
  - `index.vue`: Home page displaying all blog posts
  - `create.vue`: Page for creating new blog posts
  - `post/[id].vue`: Page for viewing a single blog post
  - `edit/[id].vue`: Page for editing an existing blog post

- **Store**:
  - `blog.ts`: Pinia store for managing blog posts with CRUD operations

## Technologies Used

- Vue 3
- Vuetify 3
- Vue Router
- Pinia for state management
- TypeScript
- Vite
