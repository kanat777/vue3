import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default {
  setup() {
    const todos = ref<Todo[]>([])

    const addTodo = (text: string) => {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false,
      })
    }

    const removeTodo = (id: number) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }

    const filteredTodos = (filter: string) => {
      return computed(() => {
        switch (filter) {
          case 'active':
            return todos.value.filter(todo => !todo.completed)
          case 'completed':
            return todos.value.filter(todo => todo.completed)
          default:
            return todos.value
        }
      })
    }

    const sortTodos = (order: 'asc' | 'desc') => {
      todos.value.sort((a, b) => {
        if (order === 'asc') {
          return Number(a.completed) - Number(b.completed)
        } else {
          return Number(b.completed) - Number(a.completed)
        }
      })
    }

    return {
      todos,
      methods: {
        addTodo,
        removeTodo,
        sortTodos,
      },
      computed: {
        filteredTodos,
      },
    }
  },
}