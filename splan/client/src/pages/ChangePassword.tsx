import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Navbar/logo-splan.png';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Button } from 'flowbite-react';

function ChangePassword() {

    const [checked, setChecked] = useState(true);

    const toggleChecked = () => setChecked(!checked);

    const redirect = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const form = e.target

        const formData = new FormData(form)

        if (formData.get('password') !== formData.get('confirm-password')) {
            toast.error('Passwords do not match')
            form.reset()
            return
        }

        try {
            await supabase.auth.updateUser({
                password: formData.get('password') as string
            })
  
        } catch (error) {
            console.log(error)
            toast.error('An error occured while changing password')
            form.reset()
            return
        }

        if (form) {
            toast.success('Your password has been changed successfully')
        }
        form.reset()
        redirect('/login')
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-800 max-sm:py-24 max-md:py-48">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                  Splan   
              </Link>
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                  <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Change Password
                  </h2>
                  <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="input-style" required />
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="input-style" required />
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="newsletter" onClick={toggleChecked} checked={checked} aria-describedby="newsletter" type="checkbox" className="w-4 h-4 cursor-pointer checked:bg-green-600 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link to="#" className="font-medium text-green-600 hover:underline dark:text-green-500">Terms and Conditions</Link></label>
                          </div>
                      </div> 
                      <Button type="submit" disabled={!checked} color='success' className='disabled:bg-gray-300'>Reset password</Button>
                  </form>
              </div>
          </div>
        </section>
        
    )
}

export default ChangePassword;