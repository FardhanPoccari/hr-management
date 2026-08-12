interface Props {
  name: string
  photo?: string
}

export default function EmployeeAvatar({
  name,
  photo,
}: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="h-28 w-28 rounded-full object-cover border-4 border-cyan-500"
      />
    )
  }

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-600 text-4xl font-bold text-white">
      {initials}
    </div>
  )
}