import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimerContext = createContext<{
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const TimerProvider: React.FC<{
    initialTime: number;
    children: React.ReactNode;
}> = ({ initialTime, children }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!isReady) return;

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
    }, [isReady]);

    const value = React.useMemo(
        () => ({ timeLeft, setTimeLeft, setIsReady }),
        [timeLeft, setTimeLeft, isReady]
    );

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
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
        <header className="px-4 sm:px-8 md:px-16 lg:px-24 bg-zinc-50">
            <div className="w-full pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                    <span className="text-zinc-950 text-lg sm:text-xl font-bold">
                        Time Left :{" "}
                    </span>
                    <span className="text-red-700 text-lg sm:text-xl font-bold">
                        {formatTime(timeLeft)}
                    </span>
                </div>
                <div className="text-center sm:text-right text-zinc-950 text-lg sm:text-xl font-bold">
                    Good Luck
                </div>
            </div>
        </header>
    );
};

const HeaderButton = () => {
    return (
        <header>
            <div className="w-full pt-16 pb-6 px-4 sm:px-8 md:px-16 lg:px-48 flex flex-col sm:flex-row justify-between items-center bg-zinc-50">
                <div className="mb-4 sm:mb-0">
                    <span className="text-zinc-950 text-xl sm:text-2xl font-bold break-words text-center sm:text-left">
                        Quiz Result :
                    </span>
                </div>
                <div>
                    <Link to="/">
                        <button className="bg-zinc-950 text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            Log out
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export { Header, HeaderButton };
