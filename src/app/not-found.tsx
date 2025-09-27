'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NotFound = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.error("404 Not Found: ", pathname);
    }, [pathname]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
            <Link href="/" className="border border-gray-500 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded transition">
                Return Home
            </Link>
        </div>
    )
}

export default NotFound;