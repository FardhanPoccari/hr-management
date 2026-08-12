import { create } from 'zustand'

import type { Todo } from '../types'

interface TodoState {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
}))
