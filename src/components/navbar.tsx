"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Compass } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg mx-4 md:mx-8 mt-2 rounded-2xl border border-white/20 dark:border-white/5"
          : "bg-gradient-to-r from-white/90 to-white/70 dark:from-black/90 dark:to-black/70 backdrop-blur-md"
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between ${scrolled ? "px-2" : ""}`}>
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Compass className="h-6 w-6 text-sky-500 group-hover:text-sky-600 transition-all duration-300" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-sky-500/20 dark:bg-sky-500/10"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>
          <div className="overflow-hidden">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-sky-200 bg-clip-text text-transparent">
                Urban{" "}
                <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">Vista</span>
              </h1>
            </motion.div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden relative z-50 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-neutral-800 dark:text-white" />
          ) : (
            <Menu className="h-5 w-5 text-neutral-800 dark:text-white" />
          )}
        </motion.button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>

          <div className="ml-4 flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="rounded-full px-6 hover:bg-white/20 dark:hover:bg-white/10 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 opacity-70 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <Link href="/signup">
                <Button className="relative rounded-full px-6 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white border-none">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {["Features", "About", "Contact"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ y: 20, opacity: 0 }}
              animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="w-full text-center"
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-xl font-medium text-neutral-800 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </motion.div>
          ))}

          <div className="mt-6 flex flex-col w-64 gap-3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="w-full rounded-full border border-neutral-200 dark:border-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="relative group w-full"
            >
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 opacity-70 group-hover:opacity-100 blur-sm transition duration-300"></div>
              <Link href="/signup">
                <Button
                  className="relative w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white border-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Helper component for nav links with animations
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-violet-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}
