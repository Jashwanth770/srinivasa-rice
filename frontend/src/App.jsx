import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningPage from './pages/OpeningPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveTicker from './components/LiveTicker';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Packaging from './pages/Packaging';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import MarketDashboard from './pages/MarketDashboard';

import { Toaster } from 'react-hot-toast';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative transition-opacity duration-1000 opacity-100">
      <LiveTicker />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/market-rates" element={<MarketDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          {/* Fallback to home if no other route matches */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <WhatsAppWidget />
      <Footer />
    </div>
  );
}

export default App;
