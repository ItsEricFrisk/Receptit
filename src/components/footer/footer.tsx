"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Footer = () => {
    const pathname = usePathname()

     // Prepared in case I need more links
     const links = [
        {param: "/about", link: "About"}
    ]


    if (pathname == "/loading") {
        return <></>
    }

    return (
        <section className="bg-slate-950 h-80 text-white relative">
            <nav className="ml-4 py-6">
                <ul className="flex flex-col gap-5">
                    {links.map((link, index) => (
                        <div key={index} className="flex flex-col">
                        <Link className={`text-3xl hover:text-slate-400`} href={link.param}>{link.link}</Link>
                        </div>
                    ))}
                </ul>
            </nav>
            <Link href={"https://github.com/ItsEricFrisk"} className="absolute left-2 bottom-3">{`Designed & coded by ItsEricFrisk · © 2025`}</Link>
            <Link href={"/"} className="text-8xl absolute bottom-16 sm:bottom-5 right-2">Receptit</Link>
        </section>
    )
}

export default Footer