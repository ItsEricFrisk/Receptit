// Structure text with OPEN AI
"use server"
import { Recipe } from "@/types/interface";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getTextStructure(inputText: string) {
    try {
        const prompt = `
            Jag har ett recept som innehåller både ingredienser och instruktioner, samt annan text som inte hör till själva receptet (t.ex. klockslag, batteriprocent, kommentarer). Din uppgift är att:

            1. Extrahera alla ingredienser och lista dem i en array av strängar.
            - Exempel:
            ["2 ägg", "1 dl mjölk", "50 g smält smör"]

            2. Extrahera alla instruktioner i rätt ordning och lista dem i en array av strängar.
            - Exempel:
            ["Stek löken tills den blir mjuk men inte får färg.", "Tillsätt tomaterna och låt sjuda i 15 minuter."]

            3. Ignorera all annan text som inte är en del av receptet.

            Returnera svaret i strikt JSON-format **utan extra text**, enligt följande struktur:
            {   
              "ingredients": ["...", "..."],
              "instructions": ["...", "..."]
            }

        
            3. Säkerställ att instruktionerna är så tydliga och enkla som möjligt, utan att ändra betydelsen.  
        
            4. Ignorera all annan text som inte är en del av receptet, såsom metadata, kommentarer eller tidtabeller.  
        
            5. Om någon del av texten är skriven på ett annat språk än svenska, översätt den korrekt till svenska.  
               - Ingredienser och instruktioner som är på engelska eller något annat språk ska översättas ordagrant och korrekt.  
               - Exempel:  
               - "1 cup of sugar" → "2,4 dl socker"  
               - "Bake at 350°F for 20 minutes" → "Grädda på 175°C i 20 minuter"  
        
        Här är receptet:  
        ${inputText}  
        
        Var noga med att följa dessa instruktioner exakt och se till att hela receptet blir korrekt, tydligt och på svenska.
        `;
        

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt}]
        })

        const gptOutput = response.choices[0].message.content;

        if (!gptOutput) {
            throw new Error("GPT response is empty or undefined");
        }

        let structuredData: Recipe;

        try {
            structuredData = JSON.parse(gptOutput);
        } catch (error) {
            console.error("Error parsing GPT response: ", error);
            throw new Error("Failed to parse recipe data");
        }
        
        if (!structuredData.ingredients || !structuredData.instructions) {
            throw new Error("Parsed data is missing required fields");
        }
        
        return structuredData;
    } catch (error) {
        console.error("Error with GPT: ", error);
        throw error
    }
}