"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList";
import Link from "next/link";
import { getAllQuestions } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const HomeMainbar = () => {
  const pathname = usePathname();
  const [questionsList, setQuestionsList] = React.useState<{
    data: any[] | null;
  }>({ data: null });
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getAllQuestions();
        setQuestionsList({ data: data.questionList });
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

  const checkAuth = () => {
    if (user === null) {
      toast.warning("Please login or signup to ask a question");
      router.push("/auth");
    } else {
      router.push("/ask-question");
    }
  };

  return (
    <div className="flex-grow p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {pathname === "/" ? (
          <h1 className="text-xl md:text-3xl font-normal">Top Questions</h1>
        ) : (
          <h1 className="text-xl md:text-3xl font-normal">All Questions</h1>
        )}
        <Button onClick={checkAuth} className="rounded-full">
          Ask Question
        </Button>
      </div>
      <div>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex p-4 border border-border rounded-2xl w-full bg-card gap-4"
              >
                <div className="flex flex-col gap-2 w-12 shrink-0 items-center">
                  <Skeleton className="h-6 w-8 rounded bg-muted" />
                  <Skeleton className="h-3 w-8 rounded bg-muted" />
                </div>
                <div className="flex flex-col flex-grow gap-3">
                  <Skeleton className="h-6 w-[80%] rounded bg-muted" />
                  <div className="flex justify-between items-end">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-12 rounded bg-muted" />
                      <Skeleton className="h-5 w-12 rounded bg-muted" />
                      <Skeleton className="h-5 w-12 rounded bg-muted" />
                    </div>
                    <Skeleton className="h-3 w-24 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-4">
              {questionsList.data?.length || 0} questions
            </p>
            <QuestionList questionList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
