"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function ErrorPage() {

    const searchParams = useSearchParams()
    const [errorMessage, setErrorMessage] = useState("An unkown error occurred.")

    useEffect(() => {
        const message = searchParams?.get("message")
        if (message) {
            setErrorMessage(message)
        }
    },[searchParams])

    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl">{errorMessage}</h1>
            <p className="text-xl mt-3">Return to homepage</p>
            <Link href={"/"} className="bg-gradient-to-b from-slate-600 to-black text-white py-3 px-14 rounded-lg shadow-xl hover:shadow-none hover:scale-[.98] transition mt-6">Homepage</Link>
        </section>
    )
}