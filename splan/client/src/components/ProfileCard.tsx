import { Card, Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom' // Add this line

export default function ProfileCard({name, sport, image, age, level, country, username, id, bio}: {name: string, sport: string, image: string, age: number, level: string, country: string, username: string, id: string, bio: string}) {
return (
    <Card className="max-w-sm">
        <div className="flex justify-end px-4 pt-4">
            <Dropdown inline label="">
                <Dropdown.Item>
                    <Link
                        to={`/editprofile/${id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Edit
                    </Link>
                </Dropdown.Item>
            </Dropdown>
        </div>
        <div className="flex flex-col pb-10 dark:text-white">
            <div className='flex flex-col items-center pb-2'>
                <img
                    alt="Profile picture"
                    height="96"
                    src={image}
                    width="96"
                    className="border mb-3 rounded-full p-1 shadow-lg dark:border-gray-600"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <p className='text-gray-500 font-light mb-2 dark:text-gray-300'><Link to="#">@{username}</Link></p>
            </div>
            <ul className='list-disc pl-5 border-t py-2'>
                <li>
                    <span className="text-sm text-gray-800 dark:text-gray-300 mb-1">From <strong>{country}</strong></span>
                </li>
                <li>
                    <span className="text-sm text-gray-800 dark:text-gray-300 mb-1">Plays <strong>{sport}</strong> at <strong>{level}</strong> level</span>
                </li>
                <li>
                    <span className="text-sm text-gray-800 dark:text-gray-300 mb-3">Is <strong>{age}</strong> years old.</span>
                </li>
            </ul>
            <div className='flex flex-col items-start border-t pt-2'>
                <h5 className='mb-1 font-bold'>About me</h5>
                <p className="text-gray-800 dark:text-gray-400 text-sm text-center pl-1">{bio}</p>
            </div>
            
            
            
            <div className="mt-8 flex gap-4 justify-center lg:mt-12">
                <a
                    href="#"
                    className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
                >
                    Create Post
                </a>
                <a
                    href="#"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    Message
                </a>
            </div>
        </div>
    </Card>
)
}
