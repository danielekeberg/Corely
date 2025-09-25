function Section(prompt: { title: string; desc: string }) {
    return (
        <div className="p-8 text-center">
            <h2 className="text-4xl font-semibold mb-4">{prompt.title}</h2>
            <p className="text-xl text-gray-500">{prompt.desc}</p>
        </div>
    )
}

export default Section;