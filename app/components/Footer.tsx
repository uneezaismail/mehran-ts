import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#483f36] text-white text-center py-4 text-sm">
    <p className="mb-1">
      <strong>Contact:</strong><Link href={"tel:03342492847"}>03342492847</Link>
    </p>
    <p className="mb-1">
      Mehran Testing Service, Naukot
    </p>
    <hr className="border-gray-100 m-2 my-4" />

    <p className="text-gray-300 mt-2">
      Designed by Uneeza Ismail
    </p>
  </footer>
  )
}

export default Footer