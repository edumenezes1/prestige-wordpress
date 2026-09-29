import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/prestige/Header";
import { Footer } from "@/components/prestige/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-prestige-black selection:bg-prestige-gold selection:text-prestige-charcoal font-montserrat">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="max-w-screen-xl w-full text-center">
          <div className="text-[clamp(5rem,15vw,12rem)] font-bold text-white/5 leading-none select-none mb-[-0.2em]">
            404
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
              Page <span className="text-prestige-gold">Not Found</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-12 font-light">
              The architectural piece you're looking for has been moved or doesn't exist in our
              current portfolio.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-4 px-8 py-4 bg-prestige-gold text-prestige-charcoal font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors group"
            >
              Return to Homepage
              <span className="w-8 h-[1px] bg-prestige-charcoal/30 group-hover:w-12 group-hover:bg-prestige-charcoal transition-all" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[100svh] flex-col bg-prestige-black selection:bg-prestige-gold selection:text-prestige-charcoal font-montserrat">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="max-w-screen-xl w-full text-center">
          <div className="text-[clamp(5rem,15vw,12rem)] font-bold text-white/5 leading-none select-none mb-[-0.2em]">
            ERROR
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
              Something <span className="text-prestige-gold">went wrong</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-12 font-light">
              We encountered an unexpected structural error. Our team has been notified, and we're
              working to restore the experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => {
                  router.invalidate();
                  reset();
                }}
                className="inline-flex items-center gap-4 px-8 py-4 bg-prestige-gold text-prestige-charcoal font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors group cursor-pointer"
              >
                Try Again
                <span className="w-8 h-[1px] bg-prestige-charcoal/30 group-hover:w-12 group-hover:bg-prestige-charcoal transition-all" />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-prestige-charcoal transition-all group"
              >
                Go Home
                <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-prestige-charcoal transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PRESTIGE | Miami Residential Remodeling" },
      {
        name: "description",
        content:
          "High-end residential remodeling, renovations, and property improvements in Miami, Florida.",
      },
      { name: "author", content: "PRESTIGE" },
      { property: "og:title", content: "PRESTIGE | Miami Residential Remodeling" },
      {
        property: "og:description",
        content:
          "High-end residential remodeling, renovations, and property improvements in Miami, Florida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@prestigeconstructioncorp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.webp", type: "image/webp" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-prestige-gold focus:text-white focus:font-bold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
