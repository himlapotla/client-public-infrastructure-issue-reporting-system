import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {

    return (
        <div className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 pt-4 pb-4">

            <div className="mt-4 px-10 md:px-20 text-white">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-gray-700">

                    <div>
                        <div className="flex items-center gap-3">

                            <img
                                src="https://i.ibb.co.com/zTWJnbYW/imagesss.jpg"
                                alt="CityFix Logo"
                                className="w-10 h-10 rounded-md object-cover"
                            />

                            <Link
                                to="/"
                                className="text-2xl font-extrabold tracking-wide text-amber-700 hover:text-amber-600 transition-colors duration-300"
                            >
                                City<span className="text-gray-800 dark:text-gray-200">Fix</span>
                            </Link>
                        </div>
                        <p className=" text-white mt-2">
                            Report.Track.Improve Your City.
                        </p>

                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg text-white"> Social Links </h4>
                        <ul className="space-y-2 text-white">
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaFacebook /> Facebook</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaYoutube /> Youtube</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaInstagram />
                                Instagram</li>
                            <li className="hover:text-amber-500 cursor-pointer flex items-center gap-1"> <FaWhatsapp /> Whatsapp</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-white text-lg">Services</h4>
                        <ul className="space-y-2 text-white ">
                            <li className="hover:text-amber-500 cursor-pointer">Home</li>
                            <li className="hover:text-amber-500 cursor-pointer">Products</li>
                            <li className="hover:text-amber-500 cursor-pointer">Category</li>
                            <li className="hover:text-amber-500 cursor-pointer">About</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg text-white">Contact Info</h4>
                        <ul className="text-white space-y-2 ">
                            <li>Email: support@CityFix.com</li>
                            <li>Phone: +880 1234-567890</li>
                            <li>Address: Dhaka, Bangladesh</li>
                            <li>Working Hours: 9 AM – 8 PM</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-3 text-lg text-white ">Legal</h4>
                        <ul className="space-y-2 text-white ">
                            <li className="hover:text-amber-500 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-amber-500 cursor-pointer">Terms & Conditions</li>
                            <li className="hover:text-amber-500 cursor-pointer">Refund Policy</li>
                            <li className="hover:text-amber-500 cursor-pointer">Support</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="text-center mt-10 text-sm text-white ">
                © 2025 CityFix. All rights reserved.
            </div>

        </div>
    );
};

export default Footer