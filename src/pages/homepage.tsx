import Footer from "@/components/footer";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50">
            <div className="flex-1 w-full bg-zinc-50 flex flex-col justify-center items-center gap-4 px-6 lg:px-12 xl:px-16">
                <div className="flex flex-col justify-center items-center flex-1">
                    <div className="w-full aspect-w-1 aspect-h-1 lg:aspect-w-4 lg:aspect-h-3">
                        <img
                            src="./ilu2.svg"
                            alt="Image"
                            className="w-full h-full object-contain bg-transparent"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 text-center">
                        <div className="text-zinc-950 text-xl font-semibold break-words">
                            Are you ready to take the challenge?
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <Link to="/quiz">
                                <button className="bg-zinc-950 text-white text-base md:text-sm font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
