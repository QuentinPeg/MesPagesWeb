import { ImageSection, Banner } from '../components/components.ts'
import map from '../assets/AboutUs/map.webp'
import couple from '../assets/AboutUs/couples.webp'
import eco from '../assets/AboutUs/eco.webp'
import logo from '../assets/AboutUs/logo-splan.png'

function AboutUsPage() {
    let text = "Splan is a sports-focused social network, connecting fans, athletes, and active individuals in a vibrant online community. Share your passion, celebrate victories, and find support with live updates and exclusive content. Whether you're seeking to improve your game, find workout buddies, or simply enjoy the thrill of sports, Splan offers a welcoming space to achieve your goals. Join us today and elevate your sports experience to new heights."

    return (
        <main className='aboutUs bg-gray-50 dark:bg-gray-800 py-32 w-full flex items-center flex-col'>
            <div className='w-10/12'>
                <div className='w-full'>
                    <ImageSection isImageLeft={true} title={'Who are we ?'} text={text} image={logo} />
                </div>
                <h1 className='text-center dark:text-white text-5xl font-bold mt-4 mb-10'>Why sould you choose us ?</h1>
                <section className="pb-8 flex flex-wrap justify-evenly align-middle gap-10" >
                    <Banner image={map} description="Splan offers comprehensive planning tools to enhance your sporting experience. Whether you're organizing a local tournament, coordinating team practices, or setting up a personal fitness regimen, our platform provides the resources you need. Our planning features include customizable schedules, event reminders, and collaborative tools for team management. With Splan, you can easily streamline your sports activities, stay organized, and focus on achieving your goals. Join us today and discover how Splan can help you plan and succeed in your sporting endeavors." />
                    <Banner image={couple} description="Splan boasts the best algorithm for connecting athletes, ensuring you find the perfect match for your sporting needs. Our advanced technology analyzes your preferences, skill levels, and activity interests to pair you with like-minded sports enthusiasts. Whether you're looking for a workout buddy, a team for a local league, or someone to share your passion for a particular sport, Splan’s algorithm delivers the most relevant and compatible connections. Join us today and experience seamless, tailored networking that elevates your athletic journey." />
                    <Banner image={eco} description='Splan is dedicated to ecological responsibility by reducing physical waste through its digital community, encouraging sustainable practices among members, and promoting active transportation like biking and walking. We host eco-friendly virtual events and partner with green organizations to amplify environmental missions. Our content often highlights sustainability in sports, and our merchandise is sourced from eco-conscious materials. Additionally, Splan uses green hosting solutions to minimize our carbon footprint. Join Splan to enhance your sports experience while contributing to a healthier planet' />
                </section>
            </div>
        </main>
    )
}

export default AboutUsPage