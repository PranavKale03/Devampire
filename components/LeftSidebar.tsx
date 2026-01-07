'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

const LeftSidebar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    }

    return (
        <div className='w-[164px] shadow-sm hidden md:block z-10 sticky top-[50px] bg-white h-[calc(100vh-50px)] overflow-y-auto custom-scrollbar transition-all duration-300'>
            <nav className='pt-12'>
                <Link href='/home' className={`block pl-2 py-2 text-gray-600 hover:text-black hover:bg-gray-100 ${isActive('/home') ? 'bg-gray-100 font-bold border-r-4 border-[#ef8236]' : ''}`}>
                    <p className="ml-2">Home</p>
                </Link>
                <div className='pt-5'>
                    <div className="pl-2 mb-2"><p className="text-gray-500 font-medium text-xs">PUBLIC</p></div>
                    <div className='pl-6'>
                        <Link href='/questions' className={`flex items-center p-2.5 text-[#3a3a3a] pl-2 hover:bg-[#e4e6e8] hover:text-black mb-1 ${isActive('/questions') ? "bg-[#f1f2f3] text-black border-r-4 border-[#ef8236] font-bold" : ""}`}>
                            <Globe size={20} />
                            <p className='pl-2.5 font-normal'>Questions</p>
                        </Link>
                        <Link href='/tags' className={`block p-2.5 pl-8 text-[#3a3a3a] hover:bg-[#e4e6e8] hover:text-black mb-1 font-normal ${isActive('/tags') ? "bg-[#f1f2f3] text-black border-r-4 border-[#ef8236] font-bold" : ""}`}>
                            <p>Tags</p>
                        </Link>
                        <Link href='/users' className={`block p-2.5 pl-8 text-[#3a3a3a] hover:bg-[#e4e6e8] hover:text-black mb-1 font-normal ${isActive('/users') ? "bg-[#f1f2f3] text-black border-r-4 border-[#ef8236] font-bold" : ""}`}>
                            <p>Users</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar;
