import ImageSection from '../components/ImageSection'
import '/src/pages/style/Home.scss'
import { Newsletter } from '../components/components'

const title = 'What is our purpose ?'
const text = "Looking for a sports-focused social network where you can connect with fellow enthusiasts? Join us! Our platform is designed for fans, athletes, and active individuals alike. <br/> <br/> Share your passion, celebrate victories, and support each other through every game and match. With live updates, exclusive content, and a welcoming community, you'll always stay engaged and connected. <br/> <br/> Whether you're looking to improve your game, find workout buddies, or simply enjoy the thrill of sports, our network is here to help you achieve your goals. Join us today and elevate your sports experience!"
import image from '/src/assets/home/man-sprinting.jpg'
import { Link } from 'react-router-dom'

function HomePage() {

  return (
    <>
      <main className='homeMain bg-gray-50 dark:bg-gray-800 py-32 mx-4 xl:mx-32'>
        
        <div className='fImage border-b-gray-400'>
          <img src="/src/assets/home/giga_planet.jpg" alt="planet" className=' rounded-xl ' />
          <div>
            <h1>Find Your Next Trip Now !</h1>
            <Link to="/login">
              <button>Discover Now</button>
            </Link>
          </div>
        </div>

        <div className='presentImage pt-24 w-full'>
          <ImageSection isImageLeft={false} title={title} text={text} image={image} />
        </div>

      </main>
      <div className='xl:mx-32 mb-24'>
        <Newsletter />
      </div>
    </>
  )
}

export default HomePage
