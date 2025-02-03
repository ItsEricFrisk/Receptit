"use client"
import { useState } from "react";
import Image from "next/image";
import { extractTextFromImage } from "@/services";
import { useRouter } from "next/navigation";
import ProductPreview from "@/components/productPreview/productPreview";

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      setImage(file)
      setErrorMessage("")
    }
  }

  const handleSubmit =  async () => {
    if (!image) {
      setErrorMessage("Hold on! We need an image to work with. Don´t leave us hanging!")
      return
    }

    try {
      const text: string = await extractTextFromImage(image);
   
      localStorage.setItem("rawText", text);
      router.push(`/loading`);
    } catch (error) {
      console.error("Error extracting text:", error);
      setErrorMessage("Something went wrong. Please try again!");
    }
  } 
  
  const getSrcFromFile = () => {
    return image ? URL.createObjectURL(image) : "";
  }


  return (
    <section className="flex flex-col items-center min-h-screen py-36 px-6 sm:px-20">
      {/* Hero Section */}
      <section className="flex flex-col sm:grid grid-cols-2 gap-10 items-center w-full max-w-6xl mb-16">
        {/* Left Column - Hero Text */}
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-7xl font-bold">Snap it.</h2>
          <h3 className="text-6xl font-semibold">Fix it.</h3>
          <h4 className="text-5xl font-meduim">Cook it.</h4>
        </div>
  
        {/* Right Column - Input & Button */}
        <div className="flex flex-col items-center gap-4">
          <div className="">
          <input
            type="file"
            id="image-input"
            className="w-52 h-10 border cursor-pointer absolut opacity-0"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image-input" className="w-52 h-10 flex items-center justify-center border-2 border-black rounded-md cursor-pointer hover:bg-slate-100 hover:border-slate-700">
           Add image
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-b from-slate-600 to-black text-white py-3 px-14 rounded-lg shadow-xl hover:shadow-none hover:scale-[.98] transition">
            Generate recipe
          </button>
          {errorMessage && <p className="text-red-600 text-md font-medium absolute top-[420px] right-46">{errorMessage}</p>}
        </div>
      </section>
  
      {/* Rendered Image */}
      {image instanceof File && (
        <div className="mt-10 flex justify-center">
          <Image
            width={400}
            height={400}
            src={getSrcFromFile()}
            alt="Uploaded preview"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      <ProductPreview />
    </section>
  );
  
}
