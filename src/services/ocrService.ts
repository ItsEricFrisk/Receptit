// Extract text from image
import Tesseract from "tesseract.js";

export async function extractTextFromImage(image: File): Promise<string> {
    const text = await Tesseract.recognize(image, "swe").then(({ data: { text } }) => text);
    // console.log(text) 
    return text;
  }