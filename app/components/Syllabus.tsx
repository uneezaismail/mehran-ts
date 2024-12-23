import React from 'react';
import SyllabusCard from './Card';

const Syllabus = () => {

    
  const classSyllabus = [
    {
      class: 5,
      classImage: '/class-5.jpg', // Fixed property name for clarity
      fileUrl:"/class-5.jpg",
    },
    {
      class: 6,
      classImage: '/class-6.jpg',
      fileUrl:"/class-5.jpg",
    },
    {
      class: 7,
      classImage: '/class-7.jpg',
      fileUrl:"/class-5.jpg",
    },
    {
      class: 8,
      classImage: '/class-8.jpg',
      fileUrl:"/class-5.jpg",
    },
  ];

  return (
    <section className='h-fit bg-[#F3EEE8] pt-16 pb-10'>
        <h2 className='flex flex-col items-center justify-center mx-auto w-fit  text-3xl font-semibold border-b-2 border-b-[#534B42] py-3 text-[#392712]'>Find Your Syllabus</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2 py-5">
      {classSyllabus.map((Class, index) => (
        <SyllabusCard
          key={index}
          classNumber={Class.class}
          classImage={Class.classImage}
          fileUrl={Class.fileUrl}
        />
      ))}
    </div>
    </section>
  );
};

export default Syllabus;
