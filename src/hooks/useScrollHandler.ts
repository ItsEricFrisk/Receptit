import { useEffect, useState } from "react";

export  const useScrollHandler = () => {
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [lastScrollPos, setLastScrollPos] = useState<number>(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollPos && currentScrollY > 50) {
                setShowHeader(false)
            } else (
                setShowHeader(true)
            )

            setLastScrollPos(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    },[lastScrollPos])

    return showHeader
}