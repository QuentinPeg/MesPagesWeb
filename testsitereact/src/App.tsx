import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {Navbar, Footer} from './components/components.ts';
import './index.css'; // Import the global css
import {Home, AboutUs, Services, Contact, Conditions, Privacy} from './pages/pages.ts';
import 'flowbite-react'; // Import the flowbite css

function App() {
  return (
    <main className='bg-gray-50 dark:bg-gray-800 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Conditions" element={<Conditions />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  )
}

export default App
