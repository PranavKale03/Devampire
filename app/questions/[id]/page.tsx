"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import copy from "copy-to-clipboard";
import { ChevronUp, ChevronDown, Share } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import DisplayAnswer from "@/components/DisplayAnswer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getAllQuestions,
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const QuestionDetails = () => {
  const { id } = useParams();
  const [questionsList, setQuestionsList] = useState<{ data: any[] | null }>({
    data: null,
  });
  const [Answer, setAnswer] = useState("");
  const [User, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const url = typeof window !== "undefined" ? window.location.href : "";

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

    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("Profile");
      if (profile) setUser(JSON.parse(profile));
    }
  }, []);

  const handlePostAns = async (e: React.FormEvent, answerLength: number) => {
    e.preventDefault();
    if (User === null) {
      toast.warning("Please login or signup to answer a question");
      router.push("/auth");
    } else {
      if (Answer === "") {
        toast.warning("Enter an answer before submitting");
      } else {
        try {
          await postAnswer(
            id as string,
            answerLength + 1,
            Answer,
            User.result.name,
            User.result._id
          );
          setAnswer("");
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
    toast.success("Copied url : " + url);
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(id as string);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVote = async () => {
    if (User === null) {
      toast.warning("Please login or signup to up vote a question");
      router.push("/auth");
    } else {
      try {
        await voteQuestion(id as string, "upVote", User.result._id);
        const { data } = await getAllQuestions();
        setQuestionsList({ data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDownVote = async () => {
    if (User === null) {
      toast.warning("Please login or signup to down vote a question");
      router.push("/auth");
    } else {
      try {
        await voteQuestion(id as string, "downVote", User.result._id);
        const { data } = await getAllQuestions();
        setQuestionsList({ data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-background max-w-7xl mx-auto px-6 md:px-12 py-12 pt-20">
      <div className="flex w-full">
        {/* Main Content - 70% */}
        <main className="w-full lg:flex-1">
          {isLoading ? (
            <div className="w-full">
              {/* Header Skeleton */}
              {/* Header Skeleton */}
              <div className="mb-6 pb-6 border-b border-border">
                <Skeleton className="h-10 w-3/4 mb-4 bg-muted" />
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-2/3 bg-muted" />
                </div>
                <div className="flex gap-2 mb-6">
                  <Skeleton className="h-6 w-16 rounded bg-muted" />
                  <Skeleton className="h-6 w-16 rounded bg-muted" />
                  <Skeleton className="h-6 w-16 rounded bg-muted" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-24 rounded bg-muted" />
                    <Skeleton className="h-10 w-24 rounded bg-muted" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-20 rounded bg-muted" />
                    <Skeleton className="h-3 w-24 bg-muted" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20 bg-muted" />
                      <Skeleton className="h-8 w-8 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Answer Form Skeleton */}
              <div className="mb-8">
                <Skeleton className="h-6 w-32 mb-4 bg-muted" />
                <Skeleton className="h-40 w-full rounded-lg bg-muted mb-4" />
                <Skeleton className="h-10 w-36 rounded-md bg-muted" />
              </div>
            </div>
          ) : (
            <>
              {questionsList.data
                ?.filter((question) => question._id === id)
                .map((question) => (
                  <div key={question._id}>
                    <section className="mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-medium text-foreground flex-1 pr-4">
                          {question.questionTitle}
                        </h1>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground border-border rounded-full mt-1"
                        >
                          <Share size={16} />
                          <span>Share</span>
                        </Button>
                      </div>
                      <p className="text-base leading-7 whitespace-pre-line text-foreground mb-6">
                        {question.questionBody}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {question.questionTags
                          .flatMap((tag: string) => tag.split(" "))
                          .filter((t: string) => t.trim() !== "")
                          .map((tag: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="font-normal rounded-md px-2 py-1"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            onClick={handleUpVote}
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                          >
                            <ChevronUp size={20} />
                            <span>Upvote</span>
                            <span className="font-semibold ml-1">
                              {question.upVote.length}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={handleDownVote}
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                          >
                            <ChevronDown size={20} />
                            <span>Downvote</span>
                            <span className="font-semibold ml-1">
                              {question.downVote.length}
                            </span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/Users/${question.userId}`}
                            className="flex items-center gap-2 text-primary no-underline hover:text-primary/80"
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                  <AvatarImage src="" />{" "}
                                  {/* Add user image URL if available */}
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {question.userPosted
                                      .charAt(0)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{question.userPosted}</p>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                          <p className="text-xs text-gray-500">
                            asked {moment(question.askedOn).fromNow()}
                          </p>
                        </div>
                      </div>
                      {User?.result?._id === question?.userId && (
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={handleDelete}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors font-medium"
                          >
                            Delete Question
                          </button>
                        </div>
                      )}
                    </section>

                    {/* Your Answer Section (Moved to Top) */}
                    <section className="mb-8">
                      <h3 className="text-xl font-medium text-foreground mb-4">
                        Your Answer
                      </h3>
                      <form
                        onSubmit={(e) => {
                          handlePostAns(e, question.answer.length);
                        }}
                      >
                        <textarea
                          className="w-full p-4 border border-border rounded-lg focus:border-ring focus:ring-1 focus:ring-ring bg-background text-foreground outline-none min-h-[160px] mb-4 text-sm font-sans"
                          onChange={(e) => setAnswer(e.target.value)}
                          value={Answer}
                          placeholder="Write your answer..."
                        ></textarea>
                        <Button type="submit" className="rounded-full">
                          Post Your Answer
                        </Button>
                      </form>
                    </section>

                    {/* Answers List */}
                    {question.noOfAnswers !== 0 && (
                      <section>
                        <h3 className="text-xl font-medium text-foreground mb-6">
                          {question.noOfAnswers} Answers
                        </h3>
                        <DisplayAnswer
                          question={question}
                          handleShare={handleShare}
                        />
                      </section>
                    )}
                  </div>
                ))}
            </>
          )}
        </main>

        <Separator
          orientation="vertical"
          className="hidden lg:block mx-6 h-auto"
        />
        {/* Related Questions Sidebar - 30% */}
        <aside className="hidden lg:flex flex-col w-[30%] gap-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Related Questions
          </h3>
          <div className="flex flex-col gap-3">
            {isLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="border border-border rounded-xl p-4 bg-card"
                >
                  <Skeleton className="h-4 w-full mb-2 bg-muted" />
                  <Skeleton className="h-4 w-2/3 mb-3 bg-muted" />
                  <div className="flex justify-between items-end">
                    <div className="flex gap-1">
                      <Skeleton className="h-4 w-10 bg-muted" />
                      <Skeleton className="h-4 w-10 bg-muted" />
                    </div>
                    <Skeleton className="h-3 w-16 bg-muted" />
                  </div>
                </div>
              ))
            ) : (
              <>
                {questionsList.data
                  ?.filter((q) => q._id !== id)
                  .slice(0, 5)
                  .map((relatedQ) => (
                    <Card
                      key={relatedQ._id}
                      className="border-border hover:shadow-sm transition-shadow p-0 bg-card"
                    >
                      <CardContent className="p-4">
                        <Link
                          href={`/questions/${relatedQ._id}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm line-clamp-2 mb-2 block"
                        >
                          {relatedQ.questionTitle}
                        </Link>
                        <div className="flex justify-between items-end gap-2 mt-2">
                          <div className="flex flex-wrap gap-1">
                            {relatedQ.questionTags
                              .flatMap((tag: string) => tag.split(" "))
                              .filter((t: string) => t.trim() !== "")
                              .slice(0, 4)
                              .map((tag: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="font-normal text-[10px] px-1.5 py-0.5 h-auto"
                                >
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                          <div className="text-xs text-gray-500 shrink-0 mb-0.5">
                            {moment(relatedQ.askedOn).fromNow()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {questionsList.data?.filter((q) => q._id !== id).length ===
                  0 && (
                    <p className="text-sm text-gray-500">
                      No related questions found.
                    </p>
                  )}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuestionDetails;
