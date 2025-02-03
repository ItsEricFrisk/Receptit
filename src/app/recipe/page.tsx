"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import whiskIcon from "../../../public/images/whisk.svg";
import ingredientsIcon from "../../../public/images/ingredients.svg";

export default function RecipePage() {
    const [toggleIngredientsStatus, setToggleIngredientsStatus] = useState<Record<number, boolean>>({});
    const [toggleInstructionsStatus, setToggleInstructionsStatus] = useState<Record<number, boolean>>({});
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem("structuredData");

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                const { ingredients = [], instructions = [] } = parsedData;

                setIngredients(ingredients);
                setInstructions(instructions);

                localStorage.removeItem("structuredData");
            } catch (error) {
                console.error("Error parsing structured data from localStorage:", error);
            }
        }
    }, []);

    const toggleIngredients = useCallback((index: number) => {
        setToggleIngredientsStatus(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    }, []);

    const toggleInstructions = useCallback((index: number) => {
        setToggleInstructionsStatus(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    }, []);

    return (
        <section className="container p-8 min-h-screen">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                    <div className="flex gap-4">
                        <h2 className="text-4xl mb-4 text-left font-poppins">Ingredients</h2>
                        <Image src={ingredientsIcon} alt="Ingredients icon" className="h-8 w-auto" />
                    </div>
                    <ul className="space-y-2">
                        {ingredients
                            .filter((ingredient) => ingredient.trim() !== "")
                            .map((ingredient, index) => (
                                <li
                                    key={index}
                                    className={`${toggleIngredientsStatus[index] ? "bg-green-200 line-through" : "bg-gray-100"} p-2 border rounded-lg shadow-sm hover:bg-green-300 transition-all active:scale-[.99] cursor-pointer`}
                                    onClick={() => toggleIngredients(index)}
                                >
                                    {ingredient}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div>
                    <div className="flex gap-4">
                        <h2 className="text-4xl mb-4 text-left font-poppins">Instructions</h2>
                        <Image src={whiskIcon} alt="Whisk icon" className="w-auto h-8" />
                    </div>
                    <ul className="space-y-4 list-none">
                        {instructions
                            .filter((instruction) => instruction.trim() !== "")
                            .map((instruction, index) => (
                                <li
                                    key={index}
                                    className={`${toggleInstructionsStatus[index] ? "bg-green-200 line-through" : "bg-gray-100"} p-2 border rounded-lg shadow-sm hover:bg-green-300 transition-all active:scale-[.99] cursor-pointer`}
                                    onClick={() => toggleInstructions(index)}
                                >
                                    {instruction}
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
        </section>
    );
}
