"use client";

import React, {useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";

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
      const canvas = await html2canvas(formRef.current, {
        scale: 2, // Adjust the scale for better quality
        useCORS: true, // Allow cross-origin images
      });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pageWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
  
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
  
      // Calculate the scaling factor to fit the content within one A4 page
      const scaleFactor = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
  
      // Adjust the image height to be slightly smaller than the canvas
      const adjustedHeight = canvasHeight * scaleFactor * 0.95; // 95% of the original height for a slightly shorter form
      const imgWidth = canvasWidth * scaleFactor;
      
      const yOffset = (pageHeight - adjustedHeight) / 2; // Center the adjusted image vertically
  
      // Center the image on the PDF page
      pdf.addImage(imgData, "PNG", (pageWidth - imgWidth) / 2, yOffset, imgWidth, adjustedHeight);
  
      pdf.save("registration_form.pdf");
  
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
        <form className="grid grid-cols-1 gap-4 ">
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
        </form>
      </div>


       {/* Button to trigger popup */}
       <button
        onClick={() => setIsPopupVisible(true)}
        className="bg-[#413931] border hover:bg-[#29241e] text-white px-4 py-2 rounded mt-4 block mx-auto"
      >
       <Link href={"#popup"}>Download as PDF</Link> 
      </button>

      {/* Hidden Rendered Form for PDF */}
  
  <div ref={formRef} style={{ display: isPopupVisible ? "block" : "none" }} className=" border-2 border-black p-8  space-y-6 rounded bg-white w-[800px]" >
    {/* Form content */}
    <div className="flex justify-center items-center mb-10">
            <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-serif text-center underline mt-4">
          MEHRAN TESTING SERVICE NAUKOT
        </h1>
        <h2 className="text-2xl font-bold text-center">
          2 <sup>ND </sup> SELF ASSESSMENT TEST
        </h2>
        <h3 className="text-2xl font-bold text-center underline">
          REGISTRATION FORM
        </h3>
      </div>
    </div>

    {/* Form data */}
    <div className="space-y-4"  style={{
    position: "relative",
  }}
>
  {/* Background image using pseudo-element */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/mehran-logo.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      opacity: 0.3, 
      zIndex: 0,
    }}
  ></div>
      <div className="relative z-10 flex items-center gap-x-4">
        <span className="font-bold text-xl w-40">Name: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl w-40">Father&apos;s Name: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.fatherName}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">Gender: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.gender}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">Caste: </span>
        <p className="border-b-2 border-b-black  w-[70%] font-medium text-lg pb-3">{formData.caste}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">Class: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.class}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">School: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.school}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">Contact No: </span>
        <p className="border-b-2 border-b-black  w-[70%] font-medium text-lg pb-3">{formData.contactNo}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">Address: </span>
        <p className="border-b-2 border-b-black  w-[70%] font-medium text-lg pb-3">{formData.address}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold w-40 text-xl">District: </span>
        <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.district}</p>
      </div>
    </div>

    <div className="flex justify-end p-8 font-bold border-b-4 border-dashed border-b-black">
      <p className="border-t-2 border-t-black p-2 text-xl">Student Sign</p>
    </div>



<div className="flex justify-center items-center mb-10" >
      <div className="flex flex-col items-center gap-4">
        <span className="bg-black px-10 py-2 pb-4 text-white rounded-md font-medium">STUDENT SLIP</span>
        <h1 className="text-2xl font-serif text-center mb-4">
          MEHRAN TESTING SERVICE NAUKOT
        </h1>
        <h2 className="text-xl font-bold text-center">
          2 <sup>ND </sup> SELF ASSESSMENT TEST
        </h2>
      </div>
    </div>

    <div className="space-y-4" 
>

 
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Name: </span>
          <p className="border-b-2 border-b-black  w-[70%] font-medium text-lg pb-3">{formData.name}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">F.Name: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.fatherName}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Class: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.class}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">School: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.school}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Gender: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.gender}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Caste: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.caste}</p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-[50%] gap-4">
          <span className="font-medium text-xl">Contact No: </span>
          <p className="border-b-2 border-b-black w-[60%] font-medium text-lg pb-3">{formData.contactNo}</p>
        </div>
        <div className="flex items-center gap-4 w-[50%]">
          <span className="font-medium text-xl">Address: </span>
          <p className="border-b-2 border-b-black w-[70%] font-medium text-lg pb-3">{formData.address}</p>
        </div>
      </div>

      <div className="flex flex-col  gap-2">
        <p className="border-b-2 border-b-black py-2 w-full font-medium"></p>
      <p>Contact No. <Link href={"tel:03342492847"}>03342492847</Link></p>
      </div>
    </div>

    <div className="flex justify-between p-8 font-bold">
      <p className="border-t-2 border-t-black p-2 text-xl">Sign of Controller</p>
      <p className="border-t-2 border-t-black p-2 text-xl">Student Sign</p>
    </div></div>
    
 

     

    
     
    </div>
  );
};

export default RegistrationForm;
