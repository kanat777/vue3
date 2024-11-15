<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Assignment</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="flex">
                <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" />
                <button @click="addTodo" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                  Add
                </button>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="filter" value="all" class="form-radio" />
                  <span class="ml-2">All</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input type="radio" v-model="filter" value="active" class="form-radio" />
                  <span class="ml-2">Active</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input type="radio" v-model="filter" value="completed" class="form-radio" />
                  <span class="ml-2">Completed</span>
                </label>
              </div>
              <button @click="sortTodos" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                Sort by {{ sortOrder === 'asc' ? 'Completed' : 'Incomplete' }}
              </button>
            </div>
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <transition-group name="fade" tag="ul">
                <li v-for="todo in filteredTodos" :key="todo.id" class="flex items-center space-x-3">
                  <input type="checkbox" v-model="todo.completed" class="form-checkbox h-5 w-5 text-blue-600" />
                  <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
                  <button @click="removeTodo(todo.id)" class="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none">
                    &times;
                  </button>
                </li>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import todoMixin from './todoMixin'

export default defineComponent({
  name: 'TodoApp',
  mixins: [todoMixin],
  setup() {
    const newTodo = ref('')
    const filter = ref('all')
    const sortOrder = ref('asc')

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoMixin.methods.addTodo(newTodo.value)
        newTodo.value = ''
        nextTick(() => {
          const lastTodo = document.querySelector('ul li:last-child')
          if (lastTodo) {
            lastTodo.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }
    }

    const removeTodo = (id: number) => {
      todoMixin.methods.removeTodo(id)
    }

    const filteredTodos = computed(() => {
      return todoMixin.computed.filteredTodos(filter.value)
    })

    const sortTodos = () => {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      todoMixin.methods.sortTodos(sortOrder.value)
    }

    watch(filter, () => {
      console.log('Filter changed:', filter.value)
    })

    return {
      newTodo,
      filter,
      sortOrder,
      addTodo,
      removeTodo,
      filteredTodos,
      sortTodos,
    }
  },
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>