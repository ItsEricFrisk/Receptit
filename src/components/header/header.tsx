"use client"
import { useScrollHandler } from "@/hooks/useScrollHandler"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
    const [hoveringActive, setHoveringActive] = useState<{[key: number]: boolean}>({})
    const pathname = usePathname()
    const showHeader = useScrollHandler()

    // Prepared in case I need more links
    const links = [
        {param: "/about", link: "About"},
        {param: "/", link: "Generate recipe"}
    ]

    const handleMouseEnter = (index: number) => {
        setHoveringActive(prevState => ({
            ...prevState,
            [index]: true
        }))
    }
    const handleMouseLeave = (index: number) => {
        setHoveringActive(prevState => ({
            ...prevState,
            [index]: false
        }))
    }

    if (pathname == "/loading") {
        return <></>
    }

    return (
         showHeader && (<header className="w-screen h-20 bg-white py-4 px-4 sm:px-16 border-b flex justify-between items-end fixed top-0 z-20">
            <Link href={"/"} className="text-3xl">Receptit</Link>
            <nav>
                <ul className="flex gap-6">
                    {links.map((link, index) => (
                        <div key={index} className="flex flex-col">
                        <Link className={`text-md`} href={link.param} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>{link.link}</Link>
                        <span className={`${hoveringActive[index]  ? "flex w-full" : "w-0"} h-0.5 bg-blue-900 rounded-full transition-all duration-500 ease-in-out`}></span>
                        </div>
                    ))}
                </ul>
            </nav>
        </header>)
    )
}