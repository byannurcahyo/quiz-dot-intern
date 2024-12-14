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
        <div>
            <div className="p-6 bg-gray-50 shadow-md rounded-lg border border-gray-300 flex flex-col justify-center items-start gap-4 mx-48 py-8">
                <div className="h-16 pb-4 flex flex-col justify-center items-start gap-1">
                    <div className="text-gray-900 text-2xl font-bold break-words">
                        {decodeURIComponent(currentQuestion.question)}{" "}
                    </div>
                    <div className="text-gray-400 text-sm font-normal break-words">
                        Select only one answer below!
                    </div>
                </div>
                {currentAnswers.map((answer, index) => (
                    <div
                        key={index}
                        className="self-stretch p-2 rounded-lg overflow-hidden flex justify-center items-center gap-2 border-2 border-gray-200 cursor-pointer hover:bg-gray-200 transition duration-200"
                        onClick={() => handleAnswerClick(index)}
                    >
                        <div className="text-center text-gray-900 text-lg font-semibold break-words">
                            {decodeURIComponent(answer.text)}{" "}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
