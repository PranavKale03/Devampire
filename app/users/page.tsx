'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import LeftSidebar from '../../components/LeftSidebar';
import { fetchAllUsers } from '../../lib/api';

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await fetchAllUsers();
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="flex justify-center w-full min-h-screen bg-white max-w-[1250px] mx-auto">
            <LeftSidebar />
            <div className="flex flex-col w-full max-w-[1100px] p-6 box-border">
                <h1 className="text-3xl font-normal mt-12 mb-8 text-[#b9c3d0]">Users</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <Link href={`/users/${user._id}`} key={user._id} className="flex items-center text-[#007ac6] no-underline hover:text-[#00a2ff]">
                            <div className="bg-[#009dff] text-white rounded p-4 text-2xl font-bold mr-4 min-w-16 h-16 flex justify-center items-center">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h5 className="text-lg font-medium text-black">{user.name}</h5>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Users;
