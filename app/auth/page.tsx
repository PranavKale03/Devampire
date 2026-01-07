'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logIn, signUp } from "../../lib/api";
import { Chrome, Command, Infinity as InfinityIcon } from "lucide-react"; // Using proxies for icons

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!email && !password) {
            setError("Enter email and password");
            setIsLoading(false);
            return;
        }

        try {
            if (isSignup) {
                if (!name) {
                    setError("Enter a name to continue");
                    setIsLoading(false);
                    return;
                }
                const { data } = await signUp({ name, email, password });
                if (typeof window !== 'undefined') localStorage.setItem('Profile', JSON.stringify(data));
                router.push('/');
            } else {
                const { data } = await logIn({ email, password });
                if (typeof window !== 'undefined') localStorage.setItem('Profile', JSON.stringify(data));
                router.push('/');
            }
        } catch (err: any) {
            console.log(err);
            setError(isSignup ? "Signup failed. Please try again." : "Login failed. Check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-[#f1f2f3] flex flex-col items-center justify-center p-6 -mt-12 overflow-hidden">
            <div className="w-full max-w-[1000px] h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                {/* Left Side - Form */}
                <div className="flex items-center justify-center p-8 lg:p-12 overflow-y-auto h-full">
                    <div className="w-full max-w-[360px] flex flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                {isSignup ? "Create an account" : "Welcome back"}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {isSignup ? "Enter your email below to create your account" : "Login to your Devampire account"}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignup && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-10"
                                    />
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {!isSignup && (
                                        <Link
                                            href="#"
                                            className="text-xs text-[#007ac6] hover:text-[#005991] font-medium"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-10"
                                />
                                {isSignup && (
                                    <p className="text-[10px] text-gray-500">
                                        Password must contain at least 8 characters.
                                    </p>
                                )}
                            </div>
                            <Button disabled={isLoading} className="bg-black hover:bg-gray-800 text-white rounded-md h-10 w-full font-medium">
                                {isLoading && (
                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                )}
                                {isSignup ? "Sign Up" : "Login"}
                            </Button>
                        </form>

                        <div className="text-center text-sm text-gray-500">
                            {isSignup ? "Already have an account? " : "Don't have an account? "}
                            <button
                                className="underline underline-offset-4 hover:text-gray-900 font-medium text-gray-700"
                                onClick={handleSwitch}
                            >
                                {isSignup ? "Log in" : "Sign up"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image/Placeholder */}
                <div className="hidden lg:flex items-center justify-center h-full bg-[#ebebeb] relative">
                    <div className="relative flex items-center justify-center">
                        {/* Placeholder illustration matching the screenshot style */}
                        <div className="w-[320px] h-[320px] flex items-center justify-center relative">
                            {/* Circles */}
                            <div className="absolute inset-0 border border-gray-300 rounded-full opacity-60 scale-[1.2]" />
                            <div className="absolute inset-0 border border-gray-300 rounded-full opacity-60 scale-[0.8]" />

                            {/* Radiant lines */}
                            <div className="absolute inset-0 flex items-center justify-center transform rotate-0">
                                <div className="w-[140%] h-px bg-gray-300 opacity-60" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center transform rotate-45">
                                <div className="w-[140%] h-px bg-gray-300 opacity-60" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center transform rotate-90">
                                <div className="w-[140%] h-px bg-gray-300 opacity-60" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center transform rotate-135">
                                <div className="w-[140%] h-px bg-gray-300 opacity-60" />
                            </div>

                            {/* Center Icon */}
                            <div className="relative z-10 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                                <div className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center">
                                    <div className="w-3 h-2 border-t-2 border-l-2 border-gray-300 transform -rotate-45" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
