"use client"

import React, { useEffect, useRef, useState } from 'react'
import { IoLogoAndroid } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6"

const Links = ["PRODUCTS", "PRICING", "BLOG"]
const linksProfile = ["Profile", "Account", "Dashboard", "Logout"]

export const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null); 
    const handleButtonClick = () => setIsModalOpen((prev) => !prev);
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };
    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);
    return (
        <div className='flex items-center justify-between bg-gray-800 text-white p-6 relative'>
            <div className='flex items-center gap-16'>
                <p className='flex items-center gap-2 text-xl font-semibold'>
                    <IoLogoAndroid />
                    Logo
                </p>
                <div className='grid grid-cols-3 gap-4'>
                    {Links.map((e, index) => {
                        return (
                            <span key={index} className='cursor-pointer font-semibold'>{e}</span>
                        )
                    })}
                </div>
            </div>
            <div className="text-3xl cursor-pointer">
                <span onClick={handleButtonClick}><FaRegCircleUser /></span>
            </div>
            {isModalOpen  ? <div className='w-30 p-4 rounded grid grid-cols-1 gap-4 
            absolute right-8 top-16 bg-white shadow-lg' ref={modalRef}>
                {linksProfile.map((e, index) => {
                    return (
                        <span key={index} onClick={handleButtonClick} 
                        className='text-black cursor-pointer font-semibold'>{e}</span>
                    )
                })}
            </div> : ''}
        </div>
    )
}