import Link from "next/link";

function Header() {
    return (
        <div className="flex p-4 border-b border-gray-300 items-center justify-between px-60 py-6">
            <Link href="../">
                <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-500 transition-colors duration-150">CORELY</h1>
            </Link>
            <div className="gap-10 flex">
                <Link href="./" className="text-lg hover:text-blue-500 transition-colors duration-150">Products</Link>
                <Link href="./contact" className="text-lg hover:text-blue-500 transition-colors duration-150">Contact</Link>
            </div>
            <Link href="./cart">
                <img src="/icons/cart.svg" alt="Cart Icon" className="w-8 h-8 cursor-pointer" />
            </Link>
        </div>
    )
}

export default Header;