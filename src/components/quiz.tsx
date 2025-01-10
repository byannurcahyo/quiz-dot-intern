import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTimer } from "@/components/header";
import { Progress } from "./progress";

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface Answer {
    text: string;
    isCorrect: boolean;
    selected: boolean;
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Answer[][]>([]);

    const { timeLeft, setIsReady } = useTimer();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;

                for (let i = 0; i <= 100; i += 20) {
                    setProgress(i);
                    await new Promise((resolve) => setTimeout(resolve, 200));
                }

                const response = await axios.get(apiUrl);
                const fetchedQuestions: Question[] = response.data.results;
                const formattedAnswers = fetchedQuestions.map((q) => [
                    ...q.incorrect_answers.map((answer) => ({
                        text: decodeURIComponent(answer),
                        isCorrect: false,
                        selected: false,
                    })),
                    {
                        text: decodeURIComponent(q.correct_answer),
                        isCorrect: true,
                        selected: false,
                    },
                ]);
                setQuestions(fetchedQuestions);
                setAnswers(
                    formattedAnswers.map((ans) =>
                        ans.sort(() => Math.random() - 0.5)
                    )
                );
                setProgress(100);
                setLoading(false);
                setIsReady(true);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, [setIsReady]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft]);

    const handleAnswerClick = (answerIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = updatedAnswers[
            currentQuestionIndex
        ].map((answer, idx) => ({
            ...answer,
            selected: idx === answerIndex,
        }));

        setAnswers(updatedAnswers);

        if (updatedAnswers[currentQuestionIndex][answerIndex].isCorrect) {
            setScore(score + 1);
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmit = () => {
        localStorage.setItem(
            "quizResult",
            JSON.stringify({ questions, answers, score })
        );
        window.location.href = "/result";
    };

    if (loading) {
        return (
            <div className="flex flex-col h-full items-center mt-60 justify-center gap-8">
                <h1 className="text-3xl font-bold text-center text-zinc-900">
                    Loading...
                </h1>
                <Progress value={progress} className="w-[50%]" />
            </div>
        );
    }

    if (currentQuestionIndex >= questions.length) {
        handleSubmit();
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = answers[currentQuestionIndex];

    return (
        <div className="flex flex-col justify-center items-center w-full h-full bg-zinc-50 gap-5 mt-20">
            <div className="p-6 bg-neutral-50 rounded-2xl shadow border border-zinc-200 flex-col justify-center items-start gap-4 flex w-full max-w-[900px]">
                <div className="flex-col justify-center items-start gap-1 flex w-full">
                    <div className="text-zinc-950 text-2xl font-bold w-full">
                        {decodeURIComponent(currentQuestion.question)}
                    </div>
                    <div className="text-zinc-400 text-sm font-normal">
                        Select only one answer below!
                    </div>
                </div>
                {currentAnswers.map((answer, index) => (
                    <div
                        key={index}
                        className={`self-stretch p-3 rounded-lg flex justify-center items-center gap-2 border-2 border-zinc-200 cursor-pointer hover:bg-zinc-200 transition duration-200 break-words w-full ${
                            answer.selected
                                ? answer.isCorrect
                                    ? "bg-green-300"
                                    : "bg-red-300"
                                : ""
                        }`}
                        onClick={() => handleAnswerClick(index)}
                    >
                        <div className="text-center text-zinc-900 text-base sm:text-lg font-semibold break-words w-full">
                            {decodeURIComponent(answer.text)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
