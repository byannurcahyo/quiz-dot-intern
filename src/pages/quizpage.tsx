import Footer from "@/components/footer";
import { Header, TimerProvider } from "@/components/header";
import Quiz from "@/components/quiz";

const Quizpage = () => {
    return (
        <TimerProvider initialTime={60}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow px-4 sm:px-8 md:px-16 lg:px-24">
                    <Quiz />
                </div>
                <Footer />
            </div>
        </TimerProvider>
    );
};

export default Quizpage;
