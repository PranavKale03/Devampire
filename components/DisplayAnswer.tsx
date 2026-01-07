'use client';

import React from 'react'
import moment from "moment";
import Link from 'next/link';
import Avatar from './Avatar';
import { deleteAnswer } from '../lib/api'; // We might need to implement this in the page or pass handler
import { useRouter } from 'next/navigation';

interface DisplayAnswerProps {
    question: any;
    handleShare: () => void;
}

const DisplayAnswer = ({ question, handleShare }: DisplayAnswerProps) => {
    // Mock user for now
    const User = { result: { _id: '1', name: 'TestUser' } }; // Replace with actual auth
    // const { id } = useParams(); // Passed in question object usually, or we use question._id
    const router = useRouter();

    const handleDelete = async (answerId: string, noOfAnswers: number) => {
        try {
            await deleteAnswer(question._id, answerId, noOfAnswers - 1);
            // Refresh or update state (in a real app, query invalidation)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full'>
            {
                question?.answer?.map((ans: any) => (
                    <div className="pb-6 border-b border-gray-200 mb-6" key={ans._id}>
                        <p className="text-sm leading-6 whitespace-pre-line text-gray-800 mb-4">{ans.answerBody}</p>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2">
                                <button type='button' onClick={handleShare} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">Share</button>
                                {
                                    User?.result?._id === ans?.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)} className="text-red-500 text-sm hover:text-red-700 transition-colors">Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link href={`/Users/${ans.userId}`} className='flex items-center text-[#007ac6] no-underline'>
                                    <Avatar backgroundColor='#009dff' px='8px' py='5px' color='white' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div className="px-2 text-sm">{ans.userAnswered}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer;
