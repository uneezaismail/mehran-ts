"use client";

import React, {useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import Image from "next/image";

const RegistrationForm = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // State to manage user inputs
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    gender: "",
    caste: "",
    class: "",
    school: "",
    contactNo: "",
    address: "",
    district: "",
  });

  // State to manage popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate PDF
  const generatePDF = async () => {
    if (formRef.current) {
      const canvas = await html2canvas(formRef.current, { scale: 1 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const maxWidth = 210; // A4 width in mm
      const maxHeight = 297; // A4 height in mm
  
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
  
      // Adjust the scaling factor dynamically based on screen size
      const scaleFactor = Math.min(maxWidth / canvasWidth, maxHeight / canvasHeight);
  
      // New image dimensions after scaling
      const imgWidth = canvasWidth * scaleFactor;
      const imgHeight = canvasHeight * scaleFactor;
  
      // Ensure the image fits within the A4 size on mobile as well
      const viewportWidth = window.innerWidth;  // Get the current screen width
      const viewportHeight = window.innerHeight;  // Get the current screen height
  
      const adjustedScaleFactor = Math.min(viewportWidth / canvasWidth, viewportHeight / canvasHeight, scaleFactor);
  
      // Recalculate image dimensions based on adjusted scale
      const finalImgWidth = canvasWidth * adjustedScaleFactor;
      const finalImgHeight = canvasHeight * adjustedScaleFactor;
  
      // Add the image to the PDF, scaled to fit within the A4 page
      pdf.addImage(imgData, "PNG", 0, 0, finalImgWidth, finalImgHeight);
  
      // Save the PDF
      pdf.save("registration_form.pdf");
  
      // Hide the popup and form after generating the PDF
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 1000);
    }
  };
  
  

  // Handle popup response (Yes or No)
  const handlePopupResponse = (response: string) => {
    if (response === "yes") {
      generatePDF();
    } else {
      // Close the popup without downloading the PDF
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 1000);
    }
  };


 
  return (
    <div className="p-4">
        {/* pop up  */}
{isPopupVisible && (
        <div className="fixed inset-0 flex w-screen h-screen items-center bg-black bg-opacity-50 z-50"  id="popup">
          <div className="bg-white w-72 mx-auto p-2 rounded shadow-lg text-center" >
            <h3 className="text-md mb-4">Do you want to download the registration form?</h3>
            <button
              onClick={() => handlePopupResponse("yes")}
              className="bg-amber-900 px-4 py-2 text-white rounded mr-4"
            >
              Yes
            </button>
            <button
              onClick={() => handlePopupResponse("no")}
              className="bg-black px-4 py-2 text-white rounded"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="bg-[#F3EEE8] p-2 border rounded shadow-md w-full mx-auto mb-10">
        <h2 className="text-xl text-center font-semibold text-[#392712] mb-8">Fill in the Registration Form:</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="caste"
            placeholder="Caste"
            value={formData.caste}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={formData.school}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
      </div>


       {/* Button to trigger popup */}
       <button
        onClick={() => setIsPopupVisible(true)}
        className="bg-[#413931] border hover:bg-[#29241e] text-white px-4 py-2 rounded mt-4 block mx-auto"
      >
       <Link href={"#popup"}>Download as PDF</Link> 
      </button>

      {/* Hidden Rendered Form for PDF */}
  
  <div ref={formRef}  className="border-2 border-black p-8  space-y-10 rounded bg-white w-[800px]">
    {/* Form content */}
    <div className="flex justify-between items-center mb-10">
      <Image src="/mehran-logo.jpg" alt="Logo" width={128} height={128} />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-serif text-center underline mt-10">
          MEHRAN TESTING SERVICE NAUKOT
        </h1>
        <h2 className="text-2xl font-bold text-center">
          2 <sup>ND </sup> SELF ASSESSMENT TEST
        </h2>
        <h3 className="text-2xl font-bold text-center underline">
          REGISTRATION FORM
        </h3>
      </div>
      <Image src="/mehran-logo.jpg" alt="Logo" width={128} height={128} />
    </div>

    {/* Form data */}
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Name: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Father&apos;s Name: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.fatherName}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Gender: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.gender}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Caste: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.caste}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Class: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.class}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">School: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.school}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Contact No: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.contactNo}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">Address: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.address}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">District: </span>
        <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.district}</p>
      </div>
    </div>

    <div className="flex justify-end p-8 font-bold border-b-4 border-dashed border-b-black">
      <p className="border-t-2 border-t-black p-2 text-xl">Student Sign</p>
    </div>

    <div className="flex justify-between items-center mb-10">
      <Image src="/mehran-logo.jpg" alt="Logo" width={128} height={128} />
      <div className="flex flex-col items-center gap-4">
        <span className="bg-black px-10 py-2 text-white rounded-md font-medium">STUDENT SLIP</span>
        <h1 className="text-2xl font-serif text-center mb-4">
          MEHRAN TESTING SERVICE NAUKOT
        </h1>
        <h2 className="text-xl font-bold text-center">
          2 <sup>ND </sup> SELF ASSESSMENT TEST
        </h2>
      </div>
      <Image src="/mehran-logo.jpg" alt="Logo" width={128} height={128} />
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Name: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.name}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">F.Name: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.fatherName}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Class: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.class}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">School: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.school}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Gender: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.gender}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Caste: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.caste}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-[50%] gap-4">
          <span className="font-medium text-xl">Contact No: </span>
          <p className="border-b-2 border-b-black p-2 w-[60%] font-medium">{formData.contactNo}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Address: </span>
          <p className="border-b-2 border-b-black p-2 w-[70%] font-medium">{formData.address}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="border-b-2 border-b-black py-2 w-full font-medium"></p>
      </div>
      <p>Contact No. <Link href={"tel:03342492847"}>03342492847</Link></p>
    </div>

    <div className="flex justify-between p-8 font-bold">
      <p className="border-t-2 border-t-black p-2 text-xl">Sign of Controller</p>
      <p className="border-t-2 border-t-black p-2 text-xl">Student Sign</p>
    </div>
  </div>

     

      {/* Popup */}
     
    </div>
  );
};

export default RegistrationForm;
