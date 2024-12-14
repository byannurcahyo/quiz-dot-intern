import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const LoginPage: React.FC = () => {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = await login(formData.email, formData.password);
        if (user) {
            navigate("/home");
            console.log("Login successful", user);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <div className="w-full max-w-md p-8 bg-zinc-50 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-zinc-950 text-left mb-1">
                    Login
                </h2>
                <p className="text-md font-semibold text-zinc-950 text-left mb-4">
                    Enter your email and password to login
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold text-zinc-900 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-sm border-2 rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-bold text-zinc-900 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-sm border-2 rounded w-full py-2 px-3"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg font-bold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && (
                        <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}
                </form>
                <div className="flex flex-row justify-between">
                    <p className="mt-4 text-sm text-zinc-950 text-left">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-zinc-900 font-bold"
                        >
                            Register
                        </Link>
                    </p>
                    <p className="mt-4 text-sm text-zinc-950">
                        <Link
                            to="/"
                            className="text-zinc-900 font-bold text-right"
                        >
                            Back to home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
