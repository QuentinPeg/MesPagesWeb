import { Link } from 'react-router-dom';
import logo from '../assets/Navbar/logo-splan.png';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast';
import { Button } from 'flowbite-react';

function ForgotPassword() {

    const redirectURL = 'http://localhost:5173/changepassword';

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const form = e.target

        const formData = new FormData(form)

        try {
            supabase.auth.resetPasswordForEmail(formData.get('email') as string, { redirectTo: redirectURL });
        } catch (error) {
            toast.error('Email not found')
            console.log(error)
        }

        if (form) {
            toast.success('Password reset email sent')
        }

        form.reset()
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                  Splan   
              </Link>
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                  <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Forgot Password ?
                  </h2>
                  <h5 className='mt-4'>
                        Enter your email address to reset your password.
                  </h5>
                  <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" className="input-style" placeholder="name@company.com" required />
                      </div>
                      <div className='flex gap-2'>
                        <Button type="submit" color='success'>Reset password</Button>
                        <Link to="/login"><Button type="button" color='success' outline>Go back</Button></Link>

                      </div>
                      
                  </form>
              </div>
          </div>
        </section>
        
    )
}

export default ForgotPassword;