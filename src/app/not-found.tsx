'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NotFound = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.error("404 Not Found: ", pathname);
    }, [pathname]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
            <p className="text-gray-500">The page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFound;
