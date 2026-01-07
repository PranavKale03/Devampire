'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { signup, login } from "../../actions/auth";
import icon from '../../public/assets/icon.svg';
import { logIn, signUp } from "../../lib/api";

const AboutAuth = () => {
    return (
        <div className="p-5 mr-8 text-gray-700 hidden lg:block max-w-[400px]">
            <h1 className="text-2xl font-bold mb-8">Join the Stack Overflow community</h1>
            <p className="mb-4">Get unstuck — ask a question</p>
            <p className="mb-4">Unlock new privileges like voting and commenting</p>
            <p className="mb-4">Save your favorite tags, filters, and jobs</p>
            <p className="mb-4">Earn reputation and badges</p>
            <p className="text-xs text-gray-500 mt-4">Collaborate and share knowledge with a private group for</p>
            <p className="text-xs text-[#007ac6]">Get Stack Overflow for Teams free for up to 50 users.</p>
        </div>
    )
}

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    //   const dispatch = useDispatch();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email && !password) {
            alert("Enter email and password");
            return;
        }
        if (isSignup) {
            if (!name) {
                alert("Enter a name to continue");
                return;
            }
            try {
                const { data } = await signUp({ name, email, password });
                // dispatch({ type: 'AUTH', data });
                if (typeof window !== 'undefined') localStorage.setItem('Profile', JSON.stringify(data));
                router.push('/');
            } catch (error) {
                console.log(error);
                setError("Signup failed. Please try again.");
            }
        } else {
            try {
                const { data } = await logIn({ email, password });
                // dispatch({ type: 'AUTH', data });
                if (typeof window !== 'undefined') localStorage.setItem('Profile', JSON.stringify(data));
                router.push('/');
            } catch (error) {
                console.log(error);
                setError("Login failed. Check your credentials.");
            }
        }
    };

    return (
        <section className="min-h-screen bg-[#f1f2f3] flex justify-center items-center py-24 px-4 overflow-auto">
            {isSignup && <AboutAuth />}
            <div className="flex flex-col items-center min-w-[300px] w-full max-w-[400px]">
                {!isSignup && <Image src={icon} alt='Stack-overflow' width={50} height={50} className="mb-6" />}
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">{error}</div>}
                <form onSubmit={handleSubmit} className="w-full p-8 bg-white rounded-lg shadow-lg flex flex-col gap-4 border border-gray-100">
                    {
                        isSignup && (
                            <label htmlFor="name">
                                <h4 className="font-semibold mb-1">Display Name</h4>
                                <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded focus:border-[#ef8236] focus:ring-1 focus:ring-[#ef8236] outline-none" onChange={(e) => { setName(e.target.value) }} />
                            </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4 className="font-semibold mb-1">Email</h4>
                        <input type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded focus:border-[#ef8236] focus:ring-1 focus:ring-[#ef8236] outline-none" onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label htmlFor="password" >
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold">Password</h4>
                            {!isSignup && <p className="text-[#007ac6] text-xs cursor-pointer hover:underline">forgot password?</p>}
                        </div>
                        <input type="password" name="password" id="password" className="w-full p-2 border border-gray-300 rounded focus:border-[#ef8236] focus:ring-1 focus:ring-[#ef8236] outline-none" onChange={(e) => { setPassword(e.target.value) }} />
                        {isSignup && <p className="text-gray-500 text-xs mt-2">Password must contain at least eight<br />characters, including at least 1 letter and 1<br />number.</p>}
                    </label>
                    {
                        isSignup && (
                            <label htmlFor="check" className="flex items-start gap-2 mt-2">
                                <input type="checkbox" id="check" className="mt-1 w-4 h-4" />
                                <p className="text-xs text-gray-500">Opt-in to receive occasional<br />product updates, user research invitations,<br />company announcements, and digests.</p>
                            </label>
                        )
                    }
                    <button type="submit" className="w-full bg-[#009dff] hover:bg-[#007ac6] text-white py-2 rounded-md transition-colors font-medium shadow-sm mt-2">{isSignup ? 'Sign up' : 'Log in'}</button>
                    {
                        isSignup && (
                            <p className="text-xs text-gray-500 mt-4">
                                By clicking "Sign up", you agree to our
                                <span className="text-[#007ac6]"> terms of service</span>,
                                <span className="text-[#007ac6]"> privacy policy</span> and
                                <span className="text-[#007ac6]"> cookie policy</span>
                            </p>
                        )
                    }
                </form>
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-700">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}
                        <button type="button" className="text-[#007ac6] ml-2 hover:underline font-medium" onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Auth;
