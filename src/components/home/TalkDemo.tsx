import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';

const TalkDemo = () => {
  const { quill, quillRef } = useQuill();
  const [subject, setSubject] = useState('what is talkio');
  React.useEffect(() => {
    if (quill) {
      (
        'Hello, how are you doing today. ' +
        '\n\nYou are welcome to talkio, we supercharge communications with your clients. ' +
        '\n\nWe do this by allowing you insert a contact form seamlessly into your website as a widget.'
      )
        .split('')
        .forEach((word: string, index: number) => {
          setTimeout(() => {
            quill.insertText(quill.getLength() - 1, word, '', true);
          }, 100 * (index + 1));
        });
    }
  }, [quill]);

  return (
    <div className='flex justify-center'>
      <div className='shadow-grey-500/50 border-grey-500 w-1/2 border-solid bg-white p-6 shadow-lg'>
        <div className='bw-1 flex justify-start pb-4 text-sm font-semibold'>
          <span className='pr-2'>From: </span>
          <Image
            alt='avatar'
            width='24'
            height='24'
            src='https://picsum.photos/200'
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <span className='subject-count'>{subject.length}</span>
        </div>
        <div className='padding-bottom-15 padding-top-15 editor'>
          <div style={{ width: 500, height: 200 }}>
            <div ref={quillRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkDemo;
