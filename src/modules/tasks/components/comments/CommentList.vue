<template>
  <CommentItem
    v-for="comment in comments"
    :key="comment.id"
    :author="comment.author"
    :content="comment.content"
    :time="comment.time"
    :edited="comment.edited"
  />
</template>

<script setup>
import { ref } from 'vue'
import CommentItem from './CommentItem.vue'

const comments = ref([
  {
    id: 1,
    author: 'Alex Lee',
    content: "I've set up the basic GitHub Actions workflow. The CI pipeline runs on every PR now.",
    time: '3 hours ago',
    edited: false,
  },
  {
    id: 2,
    author: 'Mai Pham',
    content: 'Should we add code coverage reporting too?',
    time: '2 hours ago',
    edited: true,
  },
  {
    id: 3,
    author: 'Alex Lee',
    content: "Good idea! I'll add Codecov integration in the next commit.",
    time: '1 hour ago',
    edited: false,
  },
])
</script>
