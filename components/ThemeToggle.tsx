"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 opacity-50" />
        )
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all border border-gray-200 dark:border-transparent"
            aria-label="Toggle Theme"
        >
            {resolvedTheme === 'dark' ? (
                <Moon className="h-5 w-5 text-white transition-all" />
            ) : (
                <Sun className="h-5 w-5 text-black transition-all" />
            )}
        </button>
    )
}
