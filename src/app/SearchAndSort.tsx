function SearchAndSort() {
    return (
        <div className="flex justify-between px-60">
            <div className="relative w-1/3 py-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 bg-white text-sm px-9 rounded"
                />
                <img src="/icons/search.svg" alt="Search Icon" className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="py-4 flex items-center gap-4">
                <select id="sort" className="border border-gray-300 bg-white p-2 rounded text-sm">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
        
    )
}

export default SearchAndSort;