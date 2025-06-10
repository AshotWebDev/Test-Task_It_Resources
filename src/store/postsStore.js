import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import instance from '../api/instance'

export const usePostStore = defineStore('post', () => {
  const cachedPosts = localStorage.getItem("posts");
  const parsedPosts = JSON.parse(cachedPosts);
  const posts = ref([])
  const post = ref({})
  const postsViewType = ref('table')
  const originalPosts = ref(parsedPosts || [])
  const loading = ref(false)
  const error = ref(null)

  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const totalPages = computed(() => {
    return Math.ceil(posts.value.length / itemsPerPage.value)
  })

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return posts.value.slice(start, start + itemsPerPage.value)
  })

  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await instance.get('posts')
      posts.value = res.data
      originalPosts.value = [...res.data]
      currentPage.value = 1
    } catch (err) {
      error.value = err.response?.data?.message || 'Posts fetch failed'
    } finally {
      loading.value = false
    }
  }

  const fetchPostById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const res = await instance.get(`posts/${id}`)
      post.value = res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Post fetch failed'
    } finally {
      loading.value = false
    }
  }

  const sortPosts = (field, order = 'asc') => {
    if (!posts.value) return

    const getFieldValue = (post) => {
      switch (field) {
        case 'title':
        case 'body':
          return post[field]?.toLowerCase() || ''
        case 'id':
        case 'userId':
          return post[field]
        default:
          return ''
      }
    }

    posts.value.sort((a, b) => {
      const valA = getFieldValue(a)
      const valB = getFieldValue(b)

      if (valA < valB) return order === 'asc' ? -1 : 1
      if (valA > valB) return order === 'asc' ? 1 : -1
      return 0
    })
    currentPage.value = 1
  }

  const resetSort = () => {
    if (originalPosts.value) {
      posts.value = [...originalPosts.value]
      currentPage.value = 1
    }
  }

  const setViewType = (viewType) => {
    postsViewType.value = viewType
  }

  const searchPosts = (field, query) => {
    if (!originalPosts.value) return
    const lowerQuery = query.toLowerCase().trim()

    posts.value = originalPosts.value.filter((post) => {
      const matchesField = (value) =>
        value?.toString().toLowerCase().includes(lowerQuery)

      if (!field || field === 'all') {
        return (
          matchesField(post.title) ||
          matchesField(post.body) ||
          matchesField(post.id) ||
          matchesField(post.userId)
        )
      }

      switch (field) {
        case 'title':
          return matchesField(post.title)
        case 'body':
          return matchesField(post.body)
        case 'id':
          return matchesField(post.id)
        case 'userId':
          return matchesField(post.userId)
        default:
          return false
      }
    })
    currentPage.value = 1
  }

  const setItemsPerPage = (count) => {
    itemsPerPage.value = count
    currentPage.value = 1
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    posts,
    post,
    postsViewType,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    sortPosts,
    resetSort,
    setViewType,
    searchPosts,

    currentPage,
    itemsPerPage,
    totalPages,
    paginatedPosts,
    setItemsPerPage,
    goToPage,
    nextPage,
    prevPage
  }
})
