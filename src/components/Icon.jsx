import * as L from 'lucide-react'
export default function Icon({ name, size = 22 }) {
  const C = L[name] || L.Circle
  return <C size={size} strokeWidth={1.5} aria-hidden="true" />
}
