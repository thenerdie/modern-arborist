import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

// Simple placeholder logo box; replace with actual SVG/asset later.
function Logo() {
	return (
		<div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
			<img src="logo_stripped.png" alt="Modern Arborist" className="h-33 w-33 rounded-full" />
		</div>
	);
}

const navLinks: { label: string; href: string }[] = [
	{ label: "Services", href: "/services" },
	{ label: "Our Mission", href: "/mission" },
	{ label: "Get a Quote", href: "/quote" },
];

function MobileNavbar() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
			className="md:hidden absolute drop-shadow-md left-1/2 top-full z-10 mt-2 w-[80vw] -translate-x-1/2 rounded-md text-green-200 font-extrabold dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div className="py-1">
				{navLinks.map((link) => (
					<motion.a
						key={link.href}
						href={link.href}
						className="block px-4 py-2 text-sm"
						whileTap={{  }}
					>
						{link.label}
					</motion.a>
				))}
			</div>
		</motion.div>
	);
}

export function Navbar() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b border-gray-200/70 dark:border-gray-800/60">
			<nav
				aria-label="Main"
				className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
			>
				<Link to="/" aria-label="Home" className="shrink-0">
					<Logo />
				</Link>
				<div className="hidden md:flex items-center gap-12 divide-gray-300">
					{navLinks.map((l) => (
						<motion.a
							key={l.href}
							href={l.href}
							className={`text-sm text-gray-700 dark:text-gray-300 hover:text-green-200 dark:hover:text-blue-300 ${
								location.pathname === l.href ? "text-green-700 dark:text-green-400 font-bold" : "font-medium"
							}`}
							whileHover={{ scale: 1.1 }}
						>
							{l.label}
						</motion.a>
					))}
				</div>
				<div className="flex items-center gap-4">
					<a
						href="#contact"
						className="hidden sm:inline-flex rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-500 focus-visible:outline-offset-2 focus-visible:outline-green-600"
					>
						Get a Quote
					</a>
					{/* Mobile menu placeholder */}
					<motion.button
						type="button"
						aria-label="Open menu"
						aria-expanded={isMenuOpen}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						whileHover={{ scale: 1.5, rotate: 180 }}
						whileTap={{ scale: 0.9, rotate: 90 }}
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-6 w-6"
						>
							<line x1="3" x2="21" y1="6" y2="6" />
							<line x1="3" x2="21" y1="12" y2="12" />
							<line x1="3" x2="21" y1="18" y2="18" />
						</svg>
					</motion.button>
				</div>

				<AnimatePresence>
					{isMenuOpen && <MobileNavbar />}
				</AnimatePresence>
			</nav>
		</header>
	);
}

export default Navbar;
