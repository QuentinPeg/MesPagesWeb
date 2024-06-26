function Contact() {
    return (
        <div className="flex flex-col gap-8 md:gap-4 md:flex-row md:justify-center  bg-pink-50 dark:bg-gray-800 py-48 dark:text-white">
            <div className="mx-auto flex flex-col relative">
                <h2 className="font-bold text-4xl">LET'S TALK</h2>
                <h1 className="font-bold mb-4 text-2xl">RIGHT NOW</h1>
                <p className="max-w-96">
                    Got a question, suggestion or just want to say hi ? 
                    <br />
                    <br />
                    Our contact page is the quickest and easiest way to get in touch with us.
                    <br />
                    <br />
                    Whether you're reaching out about a product, service, partnership or anything else, we're here and ready to assist.
                    <br />
                    <br />
                    Simply fill out the form, and we'ell get back to you as soon as possible.
                    <br />
                    <br />
                    Your feedback is invaluable to us, so don't hesitate to drop us a line.
                    <br />
                    <br />
                    We can't wait to connect with you.
                </p>
            </div>
            <div className="border-b-[1px] md:border-l-[1px] border-gray-300 mx-4"></div>
            <div className="mx-auto min-w-96 flex flex-col justify-between ">
                <div>
                    <h2 className="mb-4 font-bold">How can we help ?</h2>
                    <p className="mb-8">Feel free to contact us !</p>
                </div>
                <form className="flex flex-col" action="/submit" method="POST">
                    <input type="text" name="name" placeholder="Name" className="mb-4 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-900" />
                    <input type="email" name="email" placeholder="Email" className="mb-4 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-900" />
                    <input type="text" name="subject" placeholder="Subject" className="mb-4 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-900" />
                    <textarea name="message" placeholder="Message" className="mb-8 h-48 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-900"></textarea>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">Send</button>
                </form>

            </div>
            
        </div>
    )
}

export default Contact