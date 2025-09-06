import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Navbar } from "./components/Navbar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Quicksand:wght@300..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
        {/* Apply theme class before paint to avoid FOUC and match system preference or persisted choice */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  var persisted = localStorage.getItem('theme');
                  var mql = window.matchMedia('(prefers-color-scheme: dark)');
                  var dark = persisted === 'dark' || (persisted !== 'light' && mql.matches);
                  if (dark) root.classList.add('dark'); else root.classList.remove('dark');
                  root.style.colorScheme = dark ? 'dark' : 'light';
                } catch (_) { /* no-op */ }
              })();
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <div className="pt-16">{children}</div>
        <ScrollRestoration />
        <Scripts />
        {/* Keep theme in sync if the OS preference changes at runtime */}
        <script src="/theme-listener.js" />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
