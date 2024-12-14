import Footer from "@/components/footer";
import { Link } from "react-router-dom";

const Errorpage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50">
            <div className="flex-1 w-full bg-zinc-50 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-end items-center flex-1">
                    <div className="relative">
                        <img
                            src="./ilu3.svg"
                            alt="Image"
                            className="w-full h-full object-contain bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center mb-16">
                    <div className="text-zinc-950 text-4xl font-semibold break-words my-4">
                        Oops! Something went wrong
                    </div>
                    <div className="flex justify-center lg:justify-start mt-2">
                        {" "}
                        <Link to="/">
                            <button className="bg-zinc-950 text-white text-base md:text-sm font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                Back to home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Errorpage;
