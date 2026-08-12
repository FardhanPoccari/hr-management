import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/employees/$id")({
  component: EmployeeDetailPage,
})

function EmployeeDetailPage() {
  return (
    <div
      style={{
        padding: 50,
        fontSize: 40,
      }}
    >
      HALAMAN DETAIL BERHASIL
    </div>
  )
}