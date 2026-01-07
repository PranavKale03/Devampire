'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import DisplayAnswer from '@/components/DisplayAnswer';
import Avatar from '@/components/Avatar';
import { getAllQuestions, postAnswer, deleteQuestion, voteQuestion } from '@/lib/api';
import { ChevronUp, ChevronDown } from 'lucide-react';

const QuestionDetails = () => {
    const { id } = useParams();
    const [questionsList, setQuestionsList] = useState<{ data: any[] | null }>({ data: null });
    const [Answer, setAnswer] = useState("");
    const [User, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const url = typeof window !== 'undefined' ? window.location.href : '';

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await getAllQuestions();
                setQuestionsList({ data });
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();

        if (typeof window !== 'undefined') {
            const profile = localStorage.getItem('Profile');
            if (profile) setUser(JSON.parse(profile));
        }
    }, []);

    const handlePostAns = async (e: React.FormEvent, answerLength: number) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or Signup to answer a question");
            router.push("/auth");
        } else {
            if (Answer === "") {
                alert("Enter an answer before submitting");
            } else {
                try {
                    await postAnswer(id as string, answerLength + 1, Answer, User.result.name, User.result._id);
                    setAnswer("");
                    // Refresh data
                    const { data } = await getAllQuestions();
                    setQuestionsList({ data });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const handleShare = () => {
        copy(url);
        alert("Copied url : " + url);
    };

    const handleDelete = async () => {
        try {
            await deleteQuestion(id as string);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpVote = async () => {
        if (User === null) {
            alert("Login or Signup to up vote a question");
            router.push("/auth");
        } else {
            try {
                await voteQuestion(id as string, "upVote", User.result._id);
                // Refresh
                const { data } = await getAllQuestions();
                setQuestionsList({ data });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDownVote = async () => {
        if (User === null) {
            alert("Login or Signup to down vote a question");
            router.push("/auth");
        } else {
            try {
                await voteQuestion(id as string, "downVote", User.result._id);
                // Refresh
                const { data } = await getAllQuestions();
                setQuestionsList({ data });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="flex justify-center w-full min-h-screen bg-white max-w-[1250px] mx-auto">
            <LeftSidebar />
            <div className="flex flex-col w-full max-w-[1100px] p-6 box-border">
                <div className="flex w-full">
                    <main className="w-full lg:w-[calc(100%-320px)] lg:mr-6">
                        {isLoading ? (
                            <h1 className="text-xl font-medium mt-10">Loading...</h1>
                        ) : (
                            <>
                                {questionsList.data
                                    ?.filter((question) => question._id === id)
                                    .map((question) => (
                                        <div key={question._id}>
                                            <section className="mb-6 pb-6 border-b border-gray-200">
                                                <h1 className="text-3xl font-normal text-gray-800 mb-4">{question.questionTitle}</h1>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col items-center gap-2 pr-4">
                                                        <ChevronUp size={36} className="cursor-pointer text-gray-400 hover:text-[#ef8236]" onClick={handleUpVote} />
                                                        <p className="text-xl font-medium text-gray-600 font-sans">{question.upVote.length - question.downVote.length}</p>
                                                        <ChevronDown size={36} className="cursor-pointer text-gray-400 hover:text-[#ef8236]" onClick={handleDownVote} />
                                                    </div>
                                                    <div className="w-full">
                                                        <p className="text-base leading-6 whitespace-pre-line text-gray-800 mb-4">{question.questionBody}</p>
                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {question.questionTags.map((tag: string) => (
                                                                <p key={tag} className="bg-[#e1ecf4] text-[#39739d] px-2 py-1 rounded text-xs cursor-pointer hover:bg-[#d0e3f1]">{tag}</p>
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between items-center pt-4">
                                                            <div className="flex gap-2">
                                                                <button type="button" onClick={handleShare} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">Share</button>
                                                                {User?.result?._id === question?.userId && (
                                                                    <button type="button" onClick={handleDelete} className="text-red-500 text-sm hover:text-red-700 transition-colors">Delete</button>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500 mb-1">asked {moment(question.askedOn).fromNow()}</p>
                                                                <Link href={`/Users/${question.userId}`} className="flex items-center text-[#007ac6] no-underline">
                                                                    <Avatar backgroundColor="#ef8236" px="8px" py="5px" color='white' borderRadius="4px">
                                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                                    </Avatar>
                                                                    <div className="px-2 text-sm">{question.userPosted}</div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            {question.noOfAnswers !== 0 && (
                                                <section className="mb-8">
                                                    <h3 className="text-xl font-normal text-gray-800 mb-6">{question.noOfAnswers} answers</h3>
                                                    <DisplayAnswer
                                                        question={question}
                                                        handleShare={handleShare}
                                                    />
                                                </section>
                                            )}

                                            <section className="mt-8">
                                                <h3 className="text-xl font-normal text-gray-800 mb-4">Your Answer</h3>
                                                <form onSubmit={(e) => { handlePostAns(e, question.answer.length); }}>
                                                    <textarea
                                                        className="w-full p-4 border border-gray-300 rounded focus:border-[#009dff] focus:ring-1 focus:ring-[#009dff] outline-none min-h-[200px] mb-4 text-sm font-mono"
                                                        cols={30}
                                                        rows={10}
                                                        onChange={(e) => setAnswer(e.target.value)}
                                                        value={Answer}
                                                    ></textarea>
                                                    <input
                                                        type="submit"
                                                        className="bg-[#009dff] hover:bg-[#007ac6] text-white py-3 px-6 rounded-md cursor-pointer transition-colors font-medium text-sm"
                                                        value="Post Your Answer"
                                                    />
                                                </form>
                                                <p className="mt-8 text-sm text-gray-600">
                                                    Browse other Question tagged
                                                    {question.questionTags.map((tag: string) => (
                                                        <Link href="/tags" key={tag} className="text-[#007ac6] mx-1 hover:text-[#005991]">
                                                            {tag}
                                                        </Link>
                                                    ))}{" "}
                                                    or
                                                    <Link href="/ask-question" className="text-[#007ac6] ml-1 hover:text-[#005991] no-underline">
                                                        ask your own question.
                                                    </Link>
                                                </p>
                                            </section>
                                        </div>
                                    ))}
                            </>
                        )}
                    </main>
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};

export default QuestionDetails;
