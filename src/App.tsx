// ============================================================
// CallFirst Client Template — App Router
// ============================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import ServicePage from '@/pages/ServicePage'
import ServicesPage from '@/pages/ServicesPage'
import AreaPage from '@/pages/AreaPage'
import AreasPage from '@/pages/AreasPage'
import EmergencyPage from '@/pages/EmergencyPage'
import AboutPage from '@/pages/AboutPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ScrollToTop from '@/components/common/ScrollToTop'

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Services */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/:slug" element={<ServicePage />} />

              {/* Areas */}
              <Route path="/areas" element={<AreasPage />} />
              <Route path="/areas/:slug" element={<AreaPage />} />

              {/* Emergency */}
              <Route path="/emergency" element={<EmergencyPage />} />

              {/* About */}
              <Route path="/about" element={<AboutPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
