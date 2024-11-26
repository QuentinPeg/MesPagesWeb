import Post from '../components/Post'

export default function Feed() {
  return (
    <div className="py-32">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-4xl mb-2 font-semibold dark:text-white">Feed</h1>
        <p className="text-lg text-center  dark:text-white">Try to match with athletes around you !</p>
      </div>
      <div className='flex flex-col items-center'>
      <Post 
        author='Matteo Mathian' 
        date='12 April at 09.28 PM'
        title='Another easy win at Volley against Toni' 
        profile_picture='pp-volley.jpg'
        content='This match was easier than expected, thought that Toni was better, final score : 21 - 12.' 
        imageUrl_1='volley.jpg' 
        imageUrl_2='volley-2.jpg' 
        comments={5} 
        likes={19}
      />
      <Post
        author='John Doe'
        date='15 April at 02.45 PM'
        title='Hilarious Soccer Fail'
        profile_picture='pp-soccer.jpg'
        content='Check out this hilarious soccer fail! The player tried to score a goal but ended up hitting the referee instead.'
        imageUrl_1='soccer.jpg'
        imageUrl_2='fail.jpg'
        comments={10}
        likes={35}
      />
      <Post
        author='Jane Smith'
        date='18 April at 08.15 AM'
        title='Epic Basketball Dunk'
        profile_picture='pp-basket.jpg'
        content='Witness this epic basketball dunk! The player jumped from the free-throw line and slammed the ball into the hoop.'
        imageUrl_1='basketball-dunk.jpg'
        imageUrl_2='basketball-dunk-2.jpg'
        comments={8}
        likes={42}
      />
      <Post
        author='Sarah Johnson'
        date='20 April at 11.30 AM'
        title='Amazing Tennis Match'
        profile_picture='pp-tennis.jpeg'
        content='Witness this amazing tennis match! The players showcased their skills with powerful serves and intense rallies.'
        imageUrl_1='tennis-match.jpg'
        imageUrl_2='tennis-match-2.jpg'
        comments={12}
        likes={28}
      />
      <Post
        author='Michael Brown'
        date='23 April at 03.20 PM'
        title='Unbelievable Golf Shot'
        profile_picture='pp-golf.jpg'
        content='Check out this unbelievable golf shot! The player hit the ball from a difficult lie and it landed perfectly on the green.'
        imageUrl_1='golf-shot.jpeg'
        imageUrl_2='golf-shot-2.jpeg'
        comments={6}
        likes={17}
      />
      <Post
        author='Emily Wilson'
        date='26 April at 09.45 AM'
        title='Spectacular Surfing Wave'
        profile_picture='pp-surf.jpg'
        content='Experience this spectacular surfing wave! The surfer rode a massive wave and performed incredible maneuvers.'
        imageUrl_1='surfing_wave.jpg'
        imageUrl_2='surfing_wave-2.jpg'
        comments={15}
        likes={39}
      />
      </div>
      
    </div>
  )
}
