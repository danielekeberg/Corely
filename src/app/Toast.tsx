'use client';

import { useEffect } from "react";

function Toast({
    type,
    message,
    onClose,
    duration = 3000,
}: {
    type: "success" | "error";
    message: string;
    onClose: () => void;
    duration?: number;
}) {
    useEffect(() => {
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [duration, onClose]);

    return (
        <div
            role="status"
            className={`fixed bottom-5 right-5 <-50 px-4 py-3 rounded shadow-lg text-white transition-opacity duration-300 ${type === "success" ? "bg-blue-500" : "bg-red-500"}`}>
                {message}
        </div>
    )
}

export default Toast;