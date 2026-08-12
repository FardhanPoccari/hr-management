import { createFileRoute } from '@tanstack/react-router'

import { TodoForm } from '#/features/todo'

export const Route = createFileRoute('/todo')({
  component: TodoPage,
})

function TodoPage() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-2xl p-6">
        <h1 className="display-title mb-5 text-2xl font-bold text-[var(--sea-ink)]">
          Tambah Todo
        </h1>
        <TodoForm />
      </section>
    </main>
  )
}
