import React from "react";
import { Link } from "react-router";

// Simple placeholder logo box; replace with actual SVG/asset later.
function Logo() {
	return (
		<div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
			<img src="logo_stripped.png" alt="Modern Arborist" className="h-33 w-33 rounded-full" />
		</div>
	);
}

const navLinks: { label: string; href: string }[] = [
	{ label: "Services", href: "#services" },
	{ label: "Process", href: "#process" },
	{ label: "Contact", href: "#contact" },
];

export function Navbar() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b border-gray-200/70 dark:border-gray-800/60">
			<nav
				aria-label="Main"
				className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
			>
				<Link to="/" aria-label="Home" className="shrink-0">
					<Logo />
				</Link>
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
						>
							{l.label}
						</a>
					))}
				</div>
				<div className="flex items-center gap-4">
					<a
						href="#contact"
						className="hidden sm:inline-flex rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
					>
						Get a Quote
					</a>
					{/* Mobile menu placeholder */}
					<button
						type="button"
						aria-label="Open menu"
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
					</button>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
