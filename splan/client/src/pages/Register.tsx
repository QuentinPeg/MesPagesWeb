import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Navbar/logo-splan.png';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast'
import { Button, Checkbox, Datepicker, Label, TextInput } from 'flowbite-react';

function Register() {

    const [checked, setChecked] = useState(true);
    const toggleChecked = () => setChecked(!checked);
    const redirect = useNavigate()

    const handleSubmit = async (e: any) => {
            
            e.preventDefault()
            
            const form = e.target
    
            const formData = new FormData(form)

            if (formData.get('password') !== formData.get('confirmPassword')) {
                toast.error('Passwords do not match')
                form.reset()
                return
            }

            const birthdayString = formData.get('birthday') as string;
            const birthdayDate = new Date(birthdayString).toISOString();

            if (new Date(birthdayDate) > new Date()) {
                toast.error('Birthday date cannot be in the future')
                form.reset()
                return
            }
    
            try {
                
                const { data, error } = await supabase.auth.signUp({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    options: {
                        emailRedirectTo: "http://localhost:5173/emailconfirmed" as string,
                    }
                })

                if (error) {
                    throw error
                }
                
                const response = await supabase.from('profile').insert([
                    {
                        id: data?.user?.id,
                        name: formData.get('name'),
                        birthday: birthdayDate,
                        email: formData.get('email')
                    }
                ])

                if (response.error) {
                    throw response.error
                }
        
                if (error) {
                    throw error
                }
    
                toast.success('User registered successfully, confirm your email to login')
                redirect('/login')
    
            } catch (error) {
                console.log(error)
                toast.error('An error occured while registering user')
            }
    
            form.reset()
            
        }

    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                Splan   
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Full name</Label>
                            </div>
                            <TextInput name="name" id="name" placeholder="John Doe" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Your email</Label>
                            </div>
                            <TextInput type="email" name="email" id="email" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='birthday'>Birthday</Label>
                            </div>
                            <Datepicker name="birthday" id="birthday" maxDate={new Date()} required /> 
                            
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <TextInput type="password" name="password" id="password" placeholder="••••••••" minLength={6} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="confirm-password">Confirm password</Label>
                            </div>
                            <TextInput type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" required />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Checkbox id="terms" checked={checked} onChange={toggleChecked} color="green"  />
                            </div>
                            <div className="ml-3 text-sm">
                                <Label htmlFor="terms">I accept the <Link to="/conditions" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</Link></Label>
                            </div>
                        </div>
                        <Button type="submit" disabled={!checked} color="success" size="lg" className='disabled:bg-green-300' >Create an account</Button>
                        
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-green-600 hover:underline dark:text-green-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>

    )
}

export default Register;
