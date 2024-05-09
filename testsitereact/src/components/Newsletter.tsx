import { Link } from 'react-router-dom';

function Newsletter() {
  return (
    <div className='flex flex-col gap-4 justify-center items-start px-8 py-8 mx-8 my-4 dark:mx-0 border shadow-md dark:shadow-none rounded-sm dark:text-white dark:border-none'>
      <h1 className='text-2xl font-bold'>Get access to exclusive content</h1>
      <p className='text-large'>Subscribe to our newsletter</p>
      <form className='flex flex-row gap-4' action='/subscribe' method='POST'>
        <input className="input-style" type="text" placeholder="Your email adress" />
        <button className='bg-green-600 w-64 rounded-md text-white px-4 hover:bg-green-700' type="submit">Subscribe</button>
      </form>
      <p>By subscribing, you agree with Splan's <Link className='text-green-600 hover:underline' to="/conditions">Terms of Service</Link> and <Link className='text-green-600 hover:underline'  to="/privacy">Privacy Policy</Link>.</p>
    </div>
  );
}

export default Newsletter;