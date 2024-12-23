import React from 'react'
import RegistrationForm from './Form'

const FormFullComponents = () => {
  return (
   <section className='py-10' id='Form'>
    <div>
    <h1 className="text-center w-fit mx-auto text-3xl font-semibold border-b-2 border-b-[#534B42] py-3 text-[#392712] mb-4">
    Register Now
  </h1>
  <p className="text-center text-gray-700 mb-6 p-2">
    Take the next step in discovering your potential! Fill out this simple form to secure your spot in the upcoming self-assessment test.
  </p>
    </div>
    <RegistrationForm/>
   </section>
  )
}

export default FormFullComponents