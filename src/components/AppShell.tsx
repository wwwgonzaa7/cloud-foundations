import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { allNavigationItems } from '../data/navigation'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const currentItem = allNavigationItems.find((item) => item.path === pathname) ?? allNavigationItems[0]
  const headerTitle = pathname === '/dashboard' ? 'Panel principal' : currentItem.label

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-h-screen md:pl-20 lg:pl-72">
        <Header title={headerTitle} description={currentItem.description} onOpenMenu={() => setIsSidebarOpen(true)} isMenuOpen={isSidebarOpen} />
        <main className="control-grid min-h-[calc(100vh-76px)] min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
