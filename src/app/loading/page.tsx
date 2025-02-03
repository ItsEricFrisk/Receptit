"use client" 
import { useEffect } from 'react';
import { useRouter,  } from "next/navigation";
import { getTextStructure } from "../../../pages/api/textHandler";
import { motion } from "framer-motion";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchGenerateApi = async () => {
        const text = localStorage.getItem("rawText");

        if (!text) {
            console.error("No recipe text found");
            router.push("/error?message=" + encodeURIComponent("No recipe text found"));
            return;
        }

        try {
            const structuredData = await getTextStructure(text);

            if (!structuredData || !structuredData.ingredients || !structuredData.instructions) {
                throw new Error("Invalid structured data received");
            }

            localStorage.setItem("structuredData", JSON.stringify(structuredData));
            localStorage.removeItem("rawText");
            router.push(`/recipe`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            router.push(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
    };

    fetchGenerateApi();
}, [router]);

    const dots = [
      {delay: 0},
      {delay: .3},
      {delay: .5}
    ]

    return (
        <div className="h-[50vw] w-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-5">
            <p className="text-2xl font-semibold flex items-center gap-x-2">Generating your recipe 
               {dots.map(({ delay }, index) => (
                  <motion.span
                    key={index}
                    initial={{y: 10}}
                    animate={{y: -10}}
                    transition={{
                      delay,
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="w-1 h-1 rounded-full bg-black"
                  ></motion.span>
                ))}
              </p>
                <p className="text-md">It might take a minute to prepare your recipe</p>
             </div>
        </div>
      );
}