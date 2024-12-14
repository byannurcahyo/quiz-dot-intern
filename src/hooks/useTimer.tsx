import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface TimerContextType {
    timeLeft: number;
    setInitialTime: (time: number) => void;
    resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const setInitialTime = (time: number) => setTimeLeft(time);
    const resetTimer = () => setTimeLeft(0);

    return (
        <TimerContext.Provider value={{ timeLeft, setInitialTime, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = (): TimerContextType => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useTimer must be used within TimerProvider");
    }
    return context;
};
