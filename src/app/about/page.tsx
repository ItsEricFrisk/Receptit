
export default function About() {
    return (
        <main className="mt-20 w-screen md:w-1/2 min-h-screen flex flex-col items-start px-8 py-12">
        <h1 className="text-5xl mb-10">About us</h1>
        <h2 className="text-2xl font-bold">{`Cooking should be joyful, not complicated.`}</h2>
        <div className="mt-5 text-lg">
        <p>Have you ever found a recipe that looks delicious but feels overwhelming to follow? Our platform makes cooking simple, accessible, and enjoyable for everyone. By using the power of AI, we help you break down complex recipes into easy-to-follow steps.</p>
        <p className="mt-6">{`Here’s how we can help:`}</p>
        <ul className="mt-2 list-disc flex flex-col justify-between h-56 sm:h-44">
            <li><strong>Upload an image</strong> of any recipe you find, whether it’s from a cookbook or online.</li>
            <li>Let our <strong>AI structure and simplify</strong> the recipe, guiding you step by step.</li>
            <li>Our AI always translates the recipe into <strong>Swedish</strong>, ensuring that nothing gets lost in translation.</li>
        </ul>
        <p className="mt-6">Cooking should be as fun as the food is tasty. With us, creating your favorite dishes has never been easier!</p>
        <p className="mt-6 text-bold font-bold">A Word of Caution:</p>
        <p className="">{`While our AI is a powerful tool for simplifying, structuring, and translating recipes, it’s important to note that it may not always be 100% accurate. Both the structure and the translation might contain errors or nuances that the AI misses. We encourage you to double-check the results and make adjustments as needed. Please don’t rely blindly on the AI’s output—use it as a helpful guide, but always trust your own judgment when cooking.`}</p>
        </div>
        </main>
    )
}