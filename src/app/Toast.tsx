'use client';

interface ToastProps {
    type: "success" | "error";
    message: string;
}

function Toast({ type, message }: ToastProps) {
    let bgColor;

    switch(type) {
        case "success":
            bgColor = "bg-blue-500";
            break;
        case "error":
            bgColor = "bg-red-500";
            break;
        default:
            bgColor = "bg-gray-500";
    }
    return (
        <div className={`fixed bottom-5 right-5 p-4 rounded shadow-lg text-white ${bgColor}`}>
            {message}
        </div>
    )
}
export default Toast;