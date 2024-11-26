import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {Navbar, Footer} from './components/components.ts';
import './index.css'; // Import the global css
import {
  Home,
  AboutUs,
  Services,
  Contact,
  Register,
  Login,
  ForgotPassword,
  ChangePassword,
  Conditions,
  Privacy,
  Welcome,
  EmailConfirmed,
  Profile,
  EditProfile,
  Feed,
  Settings
} from './pages/pages.ts';
import 'flowbite-react'; // Import the flowbite css
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <main className='bg-gray-50 dark:bg-gray-800'>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path="/Conditions" element={<Conditions />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/EmailConfirmed" element={<EmailConfirmed />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  )
}

export default App
