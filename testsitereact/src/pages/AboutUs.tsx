import { ImageSection, ResultatLOL } from '../components/components.ts'

function AboutUsPage() {
    let text = "Splan is a sports-focused social network, connecting fans, athletes, and active individuals in a vibrant online community. Share your passion, celebrate victories, and find support with live updates and exclusive content. Whether you're seeking to improve your game, find workout buddies, or simply enjoy the thrill of sports, Splan offers a welcoming space to achieve your goals. Join us today and elevate your sports experience to new heights."

    return (
        <div className='aboutUs bg-pink-50 dark:bg-gray-800 py-32 w-full flex items-center flex-col'>
            <div className='w-10/12'>
                <section className="pb-8 flex flex-wrap justify-evenly align-middle gap-10" >
                    <ResultatLOL pageUrl={"https://lol.fandom.com/wiki/LEC/2024_Season/Spring_Season"}/>
                </section>
            </div>
        </div>
    )
}

export default AboutUsPage