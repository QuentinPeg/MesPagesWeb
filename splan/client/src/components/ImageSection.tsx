type ImageSectionProps = {
  isImageLeft: boolean;
  title: string;
  text: string;
  image: string
}

import React from 'react';

const ImageSection: React.FC<ImageSectionProps> = ({ isImageLeft, title, text, image }) => {
  let imgDiv = <div className='w-[600px] max-md:w-full bg-green-200 dark:bg-gray-700 rounded-lg m-8'><img src={image} className="h-full w-full object-cover rounded-lg"/></div>
  let textDiv = <div className='w-[600px] max-md:w-full m-8'>
    <h2 className="text-5xl font-bold">{title}</h2>
    <br />
    <p className=" text-lg " dangerouslySetInnerHTML={{ __html: text }}></p>
  </div>

  return (
    <div className={`flex ${isImageLeft ? 'flex-row' : 'flex-row-reverse'} max-md:flex-col-reverse items-center justify-between transition-flex dark:text-white gap-16 xl:gap-32 ImageSection`}>
      {imgDiv}
      {textDiv}
    </div>
  )
}


export default ImageSection

