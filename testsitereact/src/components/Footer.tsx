import { Link } from "react-router-dom";
import logo from '../assets/Navbar/logo.jpeg';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 px-4">
        <div className="md:flex md:justify-between">
          <div className="flex mb-6 md:mb-0 justify-center">
            <Link to="/" className="hover:underline flex items-center ">
              <img src={logo} className="h-8 rounded-full" alt="Logo Mon Chez Moi" />
              <span className=" ml-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mon Chez Moi</span>
            </Link>

          </div>



          <div className="flex flex-col justify-center items-center">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
            <ul className="flex flex-row gap-8 text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li className="mb-4">
                <Link to="/about" className="hover:underline">About</Link>
              </li>
              <li className="mb-4">
                <Link to="/services" className="hover:underline">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="flex flex-row gap-8 text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="/conditions" className="hover:underline">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">Mon Chez Moi™</Link>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
