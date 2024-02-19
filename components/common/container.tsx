export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`px-[16px] ${className}`}>
      <div className="mx-auto desktop:container">{children}</div>
    </div>
  )
}
