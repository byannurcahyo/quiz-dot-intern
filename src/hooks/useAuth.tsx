import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const validateInput = (email: string, password: string): string | null => {
        if (!email || !password) return "Email dan kata sandi wajib diisi.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Alamat email tidak valid.";
        if (password.length < 6)
            return "Kata sandi harus terdiri dari minimal 6 karakter.";
        return null;
    };

    const handleFirebaseError = (err: Error) => {
        const firebaseError = err as { code?: string };
        switch (firebaseError.code) {
            case "auth/invalid-credential":
                return "Data yang Anda masukkan tidak valid. Mohon coba kembali.";
            case "auth/email-already-in-use":
                return "Alamat email sudah terdaftar. Silakan gunakan alamat email lain.";
            case "auth/weak-password":
                return "Kata sandi terlalu lemah.";
            case "auth/user-not-found":
                return "Pengguna tidak ditemukan.";
            case "auth/wrong-password":
                return "Kata sandi salah.";
            default:
                return "Terjadi kesalahan yang tidak terduga.";
        }
    };

    const showSuccessMessage = (message: string) => {
        setSuccess(message);
        setTimeout(() => setSuccess(null), 5000);
    };

    const login = async (email: string, password: string) => {
        const validationError = validateInput(email, password);
        if (validationError) {
            setError(validationError);
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential.user;
        } catch (err) {
            if (err instanceof Error) {
                setError(handleFirebaseError(err));
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        const validationError = validateInput(email, password);
        if (validationError) {
            setError(validationError);
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential.user;
        } catch (err) {
            if (err instanceof Error) {
                setError(handleFirebaseError(err));
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        loading,
        error,
        success,
        showSuccessMessage,
    };
};

export default useAuth;
