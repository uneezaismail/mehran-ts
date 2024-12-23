"use client";
import Image from 'next/image';
import React from 'react';
import { MdFileDownload } from 'react-icons/md';

interface ClassCard {
  classNumber: number;
  classImage: string; // Image to display
  fileUrl: string; // Image file to download
}

const SyllabusCard = ({ classNumber, classImage, fileUrl }: ClassCard) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `Class-${classNumber}-Image.jpg`; // Set a proper file extension
    document.body.appendChild(link); // Append to the DOM for triggering
    link.click();
    document.body.removeChild(link); // Remove it after the click
  };

  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-md p-2 w-[320px] h-[350px] bg-[#594e43] mx-auto my-8">
      <Image
        src={classImage}
        alt={`Class ${classNumber} Image`}
        width={350}
        height={300}
        className="overflow-hidden border rounded-md "
      />
      <div className="flex justify-between w-full text-white">
        <h2 className="text-3xl">
          Class: <span className="font-bold">{classNumber}</span>
        </h2>
        <span
          className="w-8 h-8 rounded-full bg-white hover:text-white hover:bg-[#A06056] text-[#A06056] flex items-center justify-center cursor-pointer"
          onClick={handleDownload}
        >
          <MdFileDownload size={25} />
        </span>
      </div>
    </div>
  );
};

export default SyllabusCard;
