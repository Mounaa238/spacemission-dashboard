interface Props {
  title: string
  subtitle?: string
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  )
}
