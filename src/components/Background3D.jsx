import { Component, lazy, Suspense, useMemo } from 'react'
const Scene = lazy(() => import('./Scene.jsx'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function Background3D() {
  const ok = useMemo(hasWebGL, [])
  return (
    <div className="bg3d" aria-hidden="true">
      <div className="bg3d__fallback" />
      {ok && (
        <Boundary>
          <Suspense fallback={null}><Scene /></Suspense>
        </Boundary>
      )}
    </div>
  )
}
