'use client';


import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, Variants } from "framer-motion";
import { postQuestion } from '../../lib/api';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader } from 'lucide-react';


const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTags, setQuestionTags] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Mock user for now, in real app would verify auth
    const user = { result: { name: 'TestUser', _id: '1' } };
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (user) {
                if (questionTitle && questionBody && questionTags) {
                    await postQuestion({ questionTitle, questionBody, questionTags, userPosted: user.result.name, userId: user?.result._id });
                    toast.success("Question posted successfully");
                    router.push('/dashboard');
                } else {
                    toast.warning("Please enter all the fields");
                    setIsLoading(false); // Stop loading if validation fails
                }
            } else {
                toast.warning("Login to ask question");
                setIsLoading(false); // Stop loading if not logged in
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setIsLoading(false); // Stop loading on error
        }
    };

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setQuestionBody(questionBody + "\n");
        }
    };

    return (
        <div className='min-h-screen bg-background'>
            <div className="w-full max-w-6xl mx-auto p-4 md:p-6 pb-20 md:mt-20">
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center text-center py-12 md:py-16 gap-6 mb-8 border-b border-border pb-12"
                >
                    <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            Ask a public Question
                        </h1>
                        <p className="text-xl text-muted-foreground font-light max-w-2xl">
                            Share your knowledge or stuck on a problem? Ask the community.
                        </p>
                    </motion.div>
                </motion.section>

                <div className="flex w-full justify-center">
                    <div className="w-full max-w-[800px]">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <Card>
                                <CardContent className="p-6 flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ask-ques-title" className="text-base font-semibold">Title</Label>
                                        <p className="text-xs text-muted-foreground">Be specific and imagine you're asking a question to another person</p>
                                        <Input
                                            type="text"
                                            id='ask-ques-title'
                                            value={questionTitle}
                                            onChange={(e) => { setQuestionTitle(e.target.value) }}
                                            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                                            className="bg-background"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ask-ques-body" className="text-base font-semibold">Body</Label>
                                        <p className="text-xs text-muted-foreground">Include all the information someone would need to answer your question</p>
                                        <Textarea
                                            id="ask-ques-body"
                                            value={questionBody}
                                            onChange={(e) => { setQuestionBody(e.target.value) }}
                                            onKeyPress={handleEnter}
                                            className="min-h-[200px] bg-background font-mono text-sm leading-relaxed"
                                            placeholder="Explain your problem details and what you've tried..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ask-ques-tags" className="text-base font-semibold">Tags</Label>
                                        <p className="text-xs text-muted-foreground">Add up to 5 tags to describe what your question is about</p>
                                        <Input
                                            type="text"
                                            id='ask-ques-tags'
                                            value={questionTags}
                                            onChange={(e) => { setQuestionTags(e.target.value) }}
                                            placeholder="e.g. (xml typescript wordpress)"
                                            className="bg-background"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="self-start md:self-start w-full md:w-auto rounded-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    "Add your question"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion;
