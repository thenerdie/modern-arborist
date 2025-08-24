import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Modern Arborist</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Professional, science‑driven tree care rooted in sustainability and safety.
          </p>
        </div>
        <div className="flex gap-12">
          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#services" className="hover:underline">Tree Pruning</a></li>
              <li><a href="#services" className="hover:underline">Removals</a></li>
              <li><a href="#services" className="hover:underline">Plant Health</a></li>
              <li><a href="#services" className="hover:underline">Risk Assessment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="mailto:info@modernarborist.example" className="hover:underline">Email</a></li>
              <li><a href="tel:+15551234567" className="hover:underline">Phone</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 py-6 text-center text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} Modern Arborist. All rights reserved.
      </div>
    </footer>
  );
}
