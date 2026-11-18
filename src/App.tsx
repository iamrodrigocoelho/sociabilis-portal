import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { routes } from './routes'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, page: { Component } }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  )
}
