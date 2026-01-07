'use client';

import React from 'react'
import moment from "moment";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider, // Ensure provider is available or used in paremt
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Share, Trash } from "lucide-react";
import { deleteAnswer } from '../lib/api';
import { useRouter } from 'next/navigation';

interface DisplayAnswerProps {
    question: any;
    handleShare: () => void;
}

const DisplayAnswer = ({ question, handleShare }: DisplayAnswerProps) => {
    console.log(question);
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
                    <div className="pb-6 border-b border-border mb-6" key={ans._id}>
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm leading-6 whitespace-pre-line text-foreground flex-1 pr-4">{ans.answerBody}</p>
                            <div className="flex gap-4 shrink-0 mt-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground border-border rounded-full"
                                >
                                    <Share size={16} />
                                    <span>Share</span>
                                </Button>
                                {User?.result?._id === ans?.userId && (
                                    <div
                                        onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                                        className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash size={18} />
                                        <span className="text-sm font-medium">Delete</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end items-center w-full">
                            <div className="flex items-center gap-4">
                                <Link href={`/users`} className='flex items-center gap-2 text-primary no-underline hover:text-primary/80'>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="h-8 w-8 cursor-pointer">
                                                <AvatarImage src="" />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {ans.userAnswered ? ans.userAnswered.charAt(0).toUpperCase() : 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{ans.userAnswered}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                                <p className="text-xs text-muted-foreground">answered {moment(ans.answeredOn).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer;
