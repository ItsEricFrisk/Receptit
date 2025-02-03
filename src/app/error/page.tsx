"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"


export default function ErrorPage() {

    const searchParams = useSearchParams()
    const errorMessage = searchParams?.get("message") || "An unkown error occurred."

    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl">{errorMessage}</h1>
            <p className="text-xl mt-3">Return to homepage</p>
            <Link href={"/"} className="bg-gradient-to-b from-slate-600 to-black text-white py-3 px-14 rounded-lg shadow-xl hover:shadow-none hover:scale-[.98] transition mt-6">Homepage</Link>
        </section>
    )
}