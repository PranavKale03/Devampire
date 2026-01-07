'use client';

import React from 'react';
import LeftSidebar from '../../components/LeftSidebar';

const tagsList = [
    {
        tagName: "javascript",
        tagDesc:
            "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;",
    },
    {
        tagName: "python",
        tagDesc:
            "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.",
    },
    {
        tagName: "c#",
        tagDesc:
            "C# (pronounced 'see sharp') is a high level, statically typed, multi-paradigm programming language developed by Microsoft",
    },
    {
        tagName: "java",
        tagDesc:
            "Java is a high-level object oriented programming language. Use this tag when you're having problems using or understanding the language itself. ",
    },
    {
        tagName: "php",
        tagDesc:
            "PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language originally designed for server-side web development",
    },
    {
        tagName: "html",
        tagDesc:
            "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.",
    },
    {
        tagName: "android",
        tagDesc:
            "Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT).",
    },
    {
        tagName: "css",
        tagDesc:
            "CSS is a representation style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts, and animations",
    },
    {
        tagName: "Reactjs",
        tagDesc:
            "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.",
    },
    {
        tagName: "node.js",
        tagDesc:
            "Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. ",
    },
];

const Tags = () => {
    return (
        <div className="flex justify-center w-full min-h-screen bg-white max-w-[1250px] mx-auto">
            <LeftSidebar />
            <div className="flex flex-col w-full max-w-[1100px] p-6 box-border">
                <h1 className="text-3xl font-normal mt-12 mb-4">Tags</h1>
                <p className="text-[15px] text-[#3b4045] leading-5 text-gray-600 max-w-[600px]">
                    A tag is a keyword or label that categorizes your question with other, similar questions.
                </p>
                <p className="text-[15px] text-[#3b4045] leading-5 text-gray-600 mb-8 max-w-[600px]">
                    Using the right tags makes it easier for others to find and answer your question.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
                    {tagsList.map((tag, index) => (
                        <div key={index} className="flex flex-col p-3 border border-[#d6d9dc] rounded bg-white">
                            <div className="bg-[#e1ecf4] text-[#39739d] px-2 py-1 rounded text-xs w-fit mb-3 font-medium">
                                {tag.tagName}
                            </div>
                            <p className="text-xs text-[#232629] leading-4 line-clamp-4">
                                {tag.tagDesc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tags;
