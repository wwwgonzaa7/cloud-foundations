import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { CostsPage } from './pages/CostsPage'
import { DashboardPage } from './pages/DashboardPage'
import { InfrastructurePage } from './pages/InfrastructurePage'
import { PlanningPage } from './pages/PlanningPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { NetworkPage } from './pages/NetworkPage'
import { SecurityPage } from './pages/SecurityPage'
import { ServicesPage } from './pages/ServicesPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="planning" element={<PlanningPage />} />
        <Route path="costs" element={<CostsPage />} />
        <Route path="infrastructure" element={<InfrastructurePage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="network" element={<NetworkPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
