import Image from 'next/image';
import * as React from 'react';

const TalkDemo = () => {
  return (
    <div className='flex justify-center'>
      <div className='shadow-grey-500/50 border-grey-500 w-1/2 border-solid bg-white p-6 shadow-lg'>
        <div className='bw-1 flex justify-start pb-4 text-sm font-semibold'>
          <span className='pr-2'>From: </span>
          <Image
            alt='avatar'
            width='24'
            height='24'
            src='https://faces-img.xcdn.link/image-lorem-face-2286.jpg'
            data-src='https://faces-img.xcdn.link/thumb-lorem-face-5433_thumb.jpg'
          />
          <span className='pl-1'>estherkolade@gmail.com</span>
        </div>
        <div className='bw-1 flex py-3'>
          <input
            type='text'
            maxLength={50}
            placeholder='Enter subject....'
            className='subject text-left'
            data-id='subject'
          />
          <span className='subject-count' data-id='subjectCount'>
            0
          </span>
        </div>
        <div className='padding-bottom-15 padding-top-15'>
          <div id='editorjs'></div>
        </div>
      </div>
    </div>
  );
};

export default TalkDemo;
