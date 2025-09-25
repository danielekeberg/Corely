function Back() {
    return (
        <div className="flex items-center p-4 cursor-pointer hover:text-blue-500 transition-colors duration-150 px-60 py-6" onClick={() => window.history.back()}>
            <img src="/icons/arrow-left.svg" alt="Back Arrow" className="w-5 h-5 inline-block mr-2" />
            <span className="text-sm font-medium cursor-pointer hover:text-blue-500 transition-colors duration-150">Back to Products</span>
        </div>
    )
}

export default Back;