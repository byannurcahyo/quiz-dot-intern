import React from "react";
import Footer from "@/components/footer";
import { HeaderButton } from "@/components/header";

interface Answer {
    text: string;
    isCorrect: boolean;
    selected: boolean;
}

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizResult {
    questions: Question[];
    answers: Answer[][];
    score: number;
}

const Resultpage: React.FC = () => {
    const storedResult = localStorage.getItem("quizResult");
    const result: QuizResult | null = storedResult
        ? JSON.parse(storedResult)
        : null;

    if (!result) {
        return null;
    }

    const { questions, answers, score } = result;

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50">
            <HeaderButton />
            <div className="flex-1 w-full bg-zinc-50 flex-col justify-start gap-8 inline-flex">
                <div className="flex-1 w-full bg-zinc-50 flex flex-col justify-start items-center gap-8 px-4 sm:px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="h-[80px] w-full bg-blue-300/50 rounded-lg shadow flex items-center gap-4 p-4">
                            <img
                                src="./file-question.svg"
                                alt="Image"
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="text-base font-semibold">
                                    Total Answer
                                </div>
                                <div className="text-2xl font-bold">
                                    {questions.length}
                                </div>
                            </div>
                        </div>
                        <div className="h-[80px] w-full bg-green-300/50 rounded-lg shadow flex items-center gap-4 p-4">
                            <img
                                src="./file-check.svg"
                                alt="Image"
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="text-base font-semibold">
                                    Correct Answer
                                </div>
                                <div className="text-2xl font-bold">
                                    {score}
                                </div>
                            </div>
                        </div>
                        <div className="h-[80px] w-full bg-red-300/50 rounded-lg shadow flex items-center gap-4 p-4">
                            <img
                                src="./file-x.svg"
                                alt="Image"
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="text-base font-semibold">
                                    Incorrect Answer
                                </div>
                                <div className="text-2xl font-bold">
                                    {questions.length - score}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {questions.map((q, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-center items-center w-full h-full bg-zinc-50 gap-5"
                    >
                        <div className="p-6 bg-neutral-50 rounded-2xl shadow border border-zinc-200 flex-col justify-center items-start gap-4 flex w-full max-w-[900px]">
                            <div className="flex-col justify-center items-start gap-1 flex">
                                <div className="text-zinc-950 text-2xl font-bold w-full">
                                    {decodeURIComponent(q.question)}
                                </div>
                                <div className="text-zinc-400 text-sm font-normal">
                                    The answer :
                                </div>
                            </div>
                            {answers[index].map((answer, answerIndex) =>
                                answer.selected ? (
                                    <div
                                        key={answerIndex}
                                        className={`self-stretch p-2 rounded-lg justify-start items-center gap-2.5 inline-flex ${
                                            answer.isCorrect
                                                ? "bg-green-300"
                                                : "bg-red-300"
                                        }`}
                                    >
                                        <div className="text-center text-zinc-950 text-base font-semibold">
                                            {answer.text}
                                        </div>
                                    </div>
                                ) : (
                                    answer.isCorrect && (
                                        <div
                                            key={answerIndex}
                                            className="self-stretch p-2 bg-green-300 rounded-lg justify-start items-center gap-2.5 inline-flex"
                                        >
                                            <div className="text-center text-zinc-950 text-base font-semibold">
                                                {answer.text}
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Resultpage;
