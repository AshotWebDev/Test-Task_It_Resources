import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import instance from '../api/instance'

export const useUserStore = defineStore('user', () => {
  const cachedUsers = localStorage.getItem("users");
  const parsedUsers = JSON.parse(cachedUsers);
  const users = ref([])
  const usersViewType = ref('table')
  const originalUsers = ref(parsedUsers || []) 
  const loading = ref(false)
  const error = ref(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)  

  const totalPages = computed(() => {
    return Math.ceil(users.value.length / itemsPerPage.value)
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return users.value.slice(start, start + itemsPerPage.value)
  })

  const fetchUser = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await instance.get('users')
      users.value = res.data
      originalUsers.value = [...res.data]
      currentPage.value = 1 
    } catch (err) {
      error.value = err.response?.data?.message || 'User fetch failed'
    } finally {
      loading.value = false
    }
  }

  const sortUsers = (field, order = 'asc') => {
    if (!users.value) return

    const getFieldValue = (user) => {
      switch (field) {
        case 'address':
          return user.address?.city?.toLowerCase() || ''
        case 'company':
          return user.company?.name?.toLowerCase() || ''
        case 'name':
        case 'username':
        case 'email':
        case 'phone':
        case 'website':
          return user[field]?.toLowerCase() || ''
        case 'id':
          return user.id
        default:
          return ''
      }
    }

    users.value.sort((a, b) => {
      const valA = getFieldValue(a)
      const valB = getFieldValue(b)

      if (valA < valB) return order === 'asc' ? -1 : 1
      if (valA > valB) return order === 'asc' ? 1 : -1
      return 0
    })
    currentPage.value = 1 
  }

  const resetSort = () => {
    if (originalUsers.value) {
      users.value = [...originalUsers.value]
      currentPage.value = 1
    }
  }

  const setViewType = (viewType) => {
    usersViewType.value = viewType
  }

  const searchUsers = (field, query) => {
    if (!originalUsers.value) return
    const lowerQuery = query.toLowerCase().trim()

    users.value = originalUsers.value.filter((user) => {
      const matchesField = (value) =>
        value?.toString().toLowerCase().includes(lowerQuery)

      if (!field || field === 'all') {
        return (
          matchesField(user.name) ||
          matchesField(user.id) ||
          matchesField(user.email) ||
          matchesField(user.username) ||
          matchesField(user.phone) ||
          matchesField(user.website) ||
          matchesField(user.address?.city) ||
          matchesField(user.company?.name)
        )
      }

      switch (field) {
        case 'name':
          return matchesField(user.name)
        case 'id':
          return matchesField(user.id)
        case 'email':
          return matchesField(user.email)
        case 'username':
          return matchesField(user.username)
        case 'phone':
          return matchesField(user.phone)
        case 'website':
          return matchesField(user.website)
        case 'address':
          return matchesField(user.address?.street)
        case 'company':
          return matchesField(user.company?.name)
        default:
          return false
      }
    })
    currentPage.value = 1 
  }


const setItemsPerPage = (count) => {
  itemsPerPage.value = count;
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
    users,
    usersViewType,
    loading,
    error,
    fetchUser,
    sortUsers,
    resetSort,
    setViewType,
    searchUsers,

    currentPage,
    itemsPerPage,
    totalPages,
    paginatedUsers,
    setItemsPerPage,
    goToPage,
    nextPage,
    prevPage
  }
})
