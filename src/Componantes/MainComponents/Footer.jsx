import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {

    return (
        <div className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 pt-4 pb-4">

            <div className="mt-4 px-10 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-gray-700">

                    <div>
                        <h3 className="font-bold text-2xl text-amber-700">TravelEase</h3>
                        <p className="text-gray-500 mt-2">
                            Rent the vehicles in your afordable price.
                        </p>

                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg"> Social Links </h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaFacebook /> Facebook</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaYoutube /> Youtube</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaInstagram />
                                Instagram</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaWhatsapp /> Whatsapp</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg">Services</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="hover:text-amber-500 cursor-pointer">Home</li>
                            <li className="hover:text-amber-500 cursor-pointer">Products</li>
                            <li className="hover:text-amber-500 cursor-pointer">Category</li>
                            <li className="hover:text-amber-500 cursor-pointer">About</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg">Contact Info</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>Email: support@TravelEase.com</li>
                            <li>Phone: +880 1234-567890</li>
                            <li>Address: Dhaka, Bangladesh</li>
                            <li>Working Hours: 9 AM – 8 PM</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg">Legal</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="hover:text-amber-500 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-amber-500 cursor-pointer">Terms & Conditions</li>
                            <li className="hover:text-amber-500 cursor-pointer">Refund Policy</li>
                            <li className="hover:text-amber-500 cursor-pointer">Support</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="text-center mt-10 text-gray-600 text-sm">
                © 2025 TravelEase. All rights reserved.
            </div>

        </div>
    );
};

export default Footer