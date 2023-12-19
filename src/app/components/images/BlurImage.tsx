import { Photo } from '@/app/types/schema';
import { useState } from "react";
import Image from 'next/image';
import React from "react";

export const BlurImage = React.forwardRef(function BlurImage(photo: Photo, ref: React.Ref<HTMLAnchorElement>) {
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <a ref={ref} href={photo.url} target='_blank'>
      <div 
          className='relative'          
          onMouseOver={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}>
        <div 
          className={`aspect-w-2 aspect-h-3 w-full overflow-hidden ${!showDetails && 'rounded-lg'} duration-700 bg-gray-200`}
        >
          <Image
            src={photo.src.original}
            alt={photo.alt}
            className={`object-cover ${showDetails && 'scale-105'} duration-700 ease-in-out
                        ${loading? 'grayscale blur-2xl scale-110':'grayscale-0 blur-0 scale-100'}`}
            onLoad={() => setLoading(false)}
            priority={true}
            fill={true}
            sizes='(max-width: 715px) calc(100vw-64px), (max-width: 819px) calc((100vw-60px)/2), (max-width: 1119px) calc((100vw-219px)/2), 320px'
          />  
        </div>
        <div 
          className={`text-white duration-700 absolute bottom-0 h-12 w-full ${!showDetails && 'invisible' && 'opacity-0'} 
                        flex items-center justify-center backdrop-blur-xl bg-black bg-opacity-20 `}>
            Created by: {photo.photographer}
        </div>
      </div>
    </a>
  )
})