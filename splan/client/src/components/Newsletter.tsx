import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast'



function Newsletter() {

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const email = formData.get('email') as string;

    const { error } = await supabase
      .from('newsletter')
      .insert([{ email }])

    if (error) {
      toast.error('Email already subscribed')
    } else {
      toast.success('Subscribed successfully')
    }

    form.reset()
  }

  return (
    <div className='mx-3 p-4 sm:p-6 lg:p-8 my-8 dark:mx-0 border shadow-md dark:shadow-none rounded-sm dark:text-white dark:border-none'>
      <h1 className='text-2xl mb-3 font-bold'>Get access to exclusive content</h1>
      <p className='text-large mb-5'>
      Do you want to get notified when a new event is added to Splan? 
      Sign up for our newsletter and you'll be among the first to find out about new features, events and promos.
      </p>
      <form className='flex gap-4 mb-6 max-sm:flex-col' onSubmit={handleSubmit}>
        <input className="input-style-not-full md:w-96" type="email" name='email' placeholder="Your email adress..." required/>
        <button className='bg-green-600 max-sm:py-[10px] rounded-md text-white px-4 hover:bg-green-700' type="submit">Subscribe</button>
      </form>
      <p>By subscribing, you agree with Splan's <Link className='text-green-600 hover:underline' to="/conditions">Terms of Service</Link> and <Link className='text-green-600 hover:underline'  to="/privacy">Privacy Policy</Link>.</p>
    </div>
  );
}

export default Newsletter;