import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTimer } from "@/components/header";

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
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Answer[][]>([]);

    const { timeLeft } = useTimer();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
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
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, []);

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
        return null;
    }

    if (currentQuestionIndex >= questions.length) {
        handleSubmit();
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = answers[currentQuestionIndex];

    return (
        <div className="px-4 py-8 sm:px-6 md:px-12 lg:px-24 max-w-screen-lg mx-auto">
            <div className="p-6 bg-zinc-50 shadow-md rounded-lg border border-zinc-300 flex flex-col justify-start items-start gap-2">
                <div className="min-h-[120px] flex flex-col justify-center items-start gap-2 w-full">
                    <div className="text-zinc-900 text-xl sm:text-2xl font-bold break-words w-full overflow-wrap break-word">
                        {decodeURIComponent(currentQuestion.question)}
                    </div>
                    <div className="text-zinc-400 text-sm font-normal w-full">
                        Select only one answer below!
                    </div>
                </div>
                {currentAnswers.map((answer, index) => (
                    <div
                        key={index}
                        className="self-stretch p-3 rounded-lg flex justify-center items-center gap-2 border-2 border-zinc-200 cursor-pointer hover:bg-zinc-200 transition duration-200 break-words w-full max-w-full"
                        onClick={() => handleAnswerClick(index)}
                    >
                        <div className="text-center text-zinc-900 text-base sm:text-lg font-semibold break-words w-full overflow-wrap break-word">
                            {decodeURIComponent(answer.text)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
