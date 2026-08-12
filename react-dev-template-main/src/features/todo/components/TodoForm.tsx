import { z } from 'zod'

import { useAppForm } from '../hooks/useTodoForm'
import { useTodoStore } from '../hooks/useTodoStore'

export function TodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo)

  const form = useAppForm({
    defaultValues: {
      judul: '',
      deskripsi: '',
      selesai: false,
    },
    validators: {
      onChange: z.object({
        judul: z.string().min(1, 'Judul wajib diisi'),
        deskripsi: z.string(),
        selesai: z.boolean(),
      }),
    },
    onSubmit: ({ value }) => {
      addTodo(value)
      form.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <form.AppField name="judul">
        {(field) => (
          <field.TextField label="Judul" placeholder="Masukkan judul todo" />
        )}
      </form.AppField>

      <form.AppField name="deskripsi">
        {(field) => (
          <field.TextArea
            label="Deskripsi"
            rows={4}
            placeholder="Masukkan deskripsi todo"
          />
        )}
      </form.AppField>

      <form.AppField name="selesai">
        {(field) => <field.Switch label="Tandai sebagai selesai" />}
      </form.AppField>

      <div className="flex justify-end">
        <form.SubscribeButton label="Simpan Todo" />
      </div>
    </form>
  )
}
