import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimerContext = createContext<{
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const TimerProvider: React.FC<{
    initialTime: number;
    children: React.ReactNode;
}> = ({ initialTime, children }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <TimerContext.Provider value={{ timeLeft, setTimeLeft }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useTimer must be used within TimerProvider");
    }
    return context;
};

const Header = () => {
    const { timeLeft } = useTimer();

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <header>
            <div className="w-full h-full pt-28 pb-6 px-48 flex justify-between items-center bg-zinc-50">
                <div className="flex justify-start items-start gap-2.5">
                    <div className="text-center">
                        <span className="text-zinc-950 text-xl font-bold break-words">
                            Time Left :{" "}
                        </span>
                        <span className="text-red-700 text-xl font-bold break-words">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
                <div className="flex justify-start items-start gap-2.5">
                    <div className="text-center text-zinc-950 text-xl font-bold break-words">
                        Good Luck
                    </div>
                </div>
            </div>
        </header>
    );
};

const HeaderButton = () => {
    return (
        <header>
            <div className="w-full h-full pt-28 pb-6 px-48 flex justify-between items-center bg-zinc-50">
                <div className="flex justify-start items-start gap-2.5">
                    <div className="text-center">
                        <span className="text-zinc-950 text-2xl font-bold break-words">
                            Quiz Result :
                        </span>
                    </div>
                </div>
                <div className="flex justify-start items-start gap-2.5">
                    <Link to="/">
                        <button className="bg-zinc-950 text-white text-base md:text-sm font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            Log out
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export { Header, HeaderButton };
