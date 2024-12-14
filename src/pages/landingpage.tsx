import Footer from "@/components/footer";
import { Link } from "react-router-dom";

const Landingpage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50">
            <div className="flex-1 w-full bg-zinc-50 flex flex-col lg:flex-row justify-center items-center gap-8 px-6 lg:px-16 xl:px-24">
                <div className="order-1 lg:order-2 flex-1 max-w-full">
                    <div className="w-full aspect-w-1 aspect-h-1 lg:aspect-w-4 lg:aspect-h-3">
                        <img
                            src="./ilu1.svg"
                            alt="Illustration"
                            className="w-full h-full object-contain bg-transparent"
                        />
                    </div>
                </div>
                <div className="order-2 lg:order-1 flex flex-col gap-6 flex-1 text-center lg:text-left">
                    <div>
                        <h1 className="text-zinc-950 text-3xl md:text-4xl lg:text-5xl font-extrabold">
                            Welcome to Yanswer
                        </h1>
                        <h2 className="text-zinc-950 text-3xl md:text-4xl lg:text-5xl font-extrabold">
                            Your Gateway to Fun and Knowledge
                        </h2>
                    </div>
                    <p className="text-zinc-950 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                        Explore your curiosity with fun quizzes and track your
                        progress.
                        <br className="hidden lg:block" />
                        Are you prepared to take the challenge?
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <Link to="/login">
                            <button className="bg-zinc-950 text-white text-base md:text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Landingpage;
