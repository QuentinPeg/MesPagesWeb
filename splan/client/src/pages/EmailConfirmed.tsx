import { Button } from "flowbite-react";


export default function EmailConfirmed() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-48">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center pt-20 dark:text-white">Email confirmed</h1>
        <p className="text-lg text-center px-8 md:px-32 py-8 dark:text-white">Your email has been confirmed. You can now log in to your account.</p>
        <Button color="success" size="lg" onClick={() => { window.location.href = '/login' }}>Log in</Button>
      </div>
    </div>
  )
}
