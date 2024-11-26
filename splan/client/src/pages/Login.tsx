import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Navbar/logo-splan.png';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';

function Login() {
    const [remember, setRemember] = useState(false);
    
    const handleRememberChange = (e: any) => {
        const isChecked = e.target.checked;
        setRemember(isChecked);

        if (!isChecked) {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
    }


    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (email && password) {
            document.getElementById('email')?.setAttribute('value', email);
            document.getElementById('password')?.setAttribute('value', password);
            setRemember(true);
        }
    }, []) 

    const checkProfileSetup = async () => {
        try {
            await supabase
                .from('profile')
                .select('has_setup_profile')
                .eq('id', (await supabase.auth.getUser()).data?.user?.id)
                .single()
                .then((response) => {
                    
                    return response.data?.has_setup_profile
                    
                })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const redirect = useNavigate()

    const handleSubmit = async (e: any) => {

        e.preventDefault()
        
        const form = e.target

        const formData = new FormData(form)

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (remember) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }

        try {

            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error) {
                form.reset()
                throw error
            }
            
            const profileIsSetup = await checkProfileSetup();

            if (profileIsSetup) {
                toast.success("Welcome, please complete your profile to continue'")
                redirect('/welcome')
            } else {
                toast.success('Signed in successfully')
                redirect('/Feed')
            }

        } catch (error) {
            console.log(error)
            toast.error('Your email or password is incorrect')
        }

        form.reset()
        
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-24 md:py-4 lg:p-0">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                  Splan    
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign in to your account
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" name="email" id="email" className="input-style" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" className="input-style" required />
                          </div>
                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input onChange={handleRememberChange} checked={remember} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 cursor-pointer border border-gray-300 checked:bg-green-600 rounded bg-gray-50 focus:ring-3 focus:ring-green-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                  </div>
                              </div>
                              <Link to="/forgotpassword" className="text-sm font-medium text-green-600 hover:underline dark:text-green-500">Forgot password?</Link>
                          </div>
                          <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign in</button>
                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet? <Link to="/register" className="font-medium text-green-600 hover:underline dark:text-green-500">Sign up</Link>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
        </section>
    )
}

export default Login;