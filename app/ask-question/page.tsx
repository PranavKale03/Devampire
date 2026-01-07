'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { postQuestion } from '../../lib/api';

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTags, setQuestionTags] = useState("");

    // Mock user for now, in real app would verify auth
    const user = { result: { name: 'TestUser', _id: '1' } };
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (user) {
        //   if (questionTitle && questionBody && questionTags) {
        //      await postQuestion({questionTitle, questionBody, questionTags, userPosted: user.result.name, userId: user?.result._id});
        //      router.push('/');
        //   } else alert("Please enter all the fields");
        // } else alert("Login to ask question");
        console.log({ questionTitle, questionBody, questionTags });
        alert("Question posted (simulated)");
        router.push('/');
    };

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setQuestionBody(questionBody + "\n");
        }
    };

    return (
        <div className='min-h-screen bg-[#f1f2f3] py-24 px-4 flex justify-center'>
            <div className="w-full max-w-[800px]">
                <h1 className="text-3xl font-semibold mb-8">Ask a public Question</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
                        <label htmlFor="ask-ques-title" className="block mb-4">
                            <h4 className="font-bold text-lg mb-1">Title</h4>
                            <p className="text-xs text-gray-500 mb-2">Be specific and imagine you're asking a question to another person</p>
                            <input
                                type="text"
                                id='ask-ques-title'
                                onChange={(e) => { setQuestionTitle(e.target.value) }}
                                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                                className="w-full p-2 border border-gray-300 rounded focus:border-[#009dff] focus:ring-1 focus:ring-[#009dff] outline-none"
                            />
                        </label>
                        <label htmlFor="ask-ques-body" className="block mb-4">
                            <h4 className="font-bold text-lg mb-1">Body</h4>
                            <p className="text-xs text-gray-500 mb-2">Include all the information someone would need to answer your question</p>
                            <textarea
                                id="ask-ques-body"
                                onChange={(e) => { setQuestionBody(e.target.value) }}
                                onKeyPress={handleEnter}
                                className="w-full p-2 border border-gray-300 rounded focus:border-[#009dff] focus:ring-1 focus:ring-[#009dff] outline-none min-h-[200px]"
                            ></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags" className="block">
                            <h4 className="font-bold text-lg mb-1">Tags</h4>
                            <p className="text-xs text-gray-500 mb-2">Add up to 5 tags to describe what your question is about</p>
                            <input
                                type="text"
                                id='ask-ques-tags'
                                onChange={(e) => { setQuestionTags(e.target.value) }}
                                placeholder="e.g. (xml typescript wordpress)"
                                className="w-full p-2 border border-gray-300 rounded focus:border-[#009dff] focus:ring-1 focus:ring-[#009dff] outline-none"
                            />
                        </label>
                    </div>
                    <input
                        type="submit"
                        value="Review your question"
                        className="bg-[#009dff] hover:bg-[#007ac6] text-white py-3 px-6 rounded-md cursor-pointer transition-colors self-start font-medium"
                    />
                </form>
            </div>
        </div>
    )
}

export default AskQuestion;
