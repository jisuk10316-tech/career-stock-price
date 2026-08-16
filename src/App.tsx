import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Journey from './pages/Journey'
import CountryPage from './pages/CountryPage'
import InstitutionPage from './pages/InstitutionPage'
import CareerMarket from './pages/CareerMarket'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/journey/:countryId" element={<CountryPage />} />
        <Route path="/journey/:countryId/:institutionId" element={<InstitutionPage />} />
        <Route path="/market" element={<CareerMarket />} />
        <Route path="/market/:memberId" element={<CareerMarket />} />
      </Route>
    </Routes>
  )
}
