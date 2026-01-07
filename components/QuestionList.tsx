'use client';

import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const Questions = ({ question }: { question: any }) => {
    return (
        <Card className="w-full mb-4 hover:shadow-md transition-all border-border bg-card p-0">
            <CardContent className="flex p-4">
                <div className="hidden sm:flex gap-4 text-center mr-8 text-sm text-muted-foreground shrink-0 self-start mt-1">
                    <div className="flex flex-col items-center min-w-[40px]">
                        <p className="font-medium text-foreground text-lg">{question?.upVote?.length - question?.downVote?.length || 0}</p>
                        <p className="text-xs">votes</p>
                    </div>
                    <div className="flex flex-col items-center min-w-[40px]">
                        <p className="font-medium text-foreground text-lg">{question?.noOfAnswers || 0}</p>
                        <p className="text-xs">answers</p>
                    </div>
                </div>
                <div className="flex-grow">
                    <Link href={`/questions/${question?._id}`} className='text-primary hover:text-primary/80 text-lg block line-clamp-2'>
                        {question?.questionTitle}
                    </Link>
                    <div className="flex justify-between sm:items-center items-start sm:flex-row flex-col sm:gap-0 gap-2">
                        <div className="flex gap-2 flex-wrap mt-2">
                            {
                                question?.questionTags?.flatMap((tag: string) => tag.split(" "))
                                    .filter((tag: string) => tag.trim() !== "")
                                    .map((tag: string, index: number) => (
                                        <Badge key={index} variant="secondary" className="font-normal rounded-md px-2 py-1">
                                            {tag}
                                        </Badge>
                                    ))
                            }
                        </div>
                        <p className="text-xs text-muted-foreground self-end sm:self-auto">
                            asked {moment(question?.askedOn).fromNow()} <span className="text-primary font-medium">{question?.userPosted}</span>
                        </p>
                    </div>
                    {/* Mobile Stats */}
                    <div className="flex sm:hidden items-center gap-2 mt-3 text-xs text-muted-foreground font-medium">
                        <p>{question?.upVote?.length - question?.downVote?.length || 0} votes</p>
                        <span>|</span>
                        <p>{question?.noOfAnswers || 0} answers</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const QuestionList = ({ questionsList }: { questionsList: any[] }) => {
    return (
        <div className='flex flex-col w-full'>
            {
                questionsList?.length > 0 ? questionsList.map((question) => (
                    <Questions question={question} key={question._id || question.id} />
                )) : <div className="p-4 text-center text-gray-500">No questions found</div>
            }
        </div>
    )
}

export default QuestionList;
