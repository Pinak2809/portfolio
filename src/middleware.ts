import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Detect DACH region (Germany, Austria, Switzerland) from Vercel's
 * x-vercel-ip-country header and set a cookie so the client-side
 * I18nProvider can pick the right default locale.
 *
 * The cookie is only set on the first visit (no existing locale cookie).
 * Once the user toggles the language manually, their choice persists.
 */
const DACH_COUNTRIES = new Set(["DE", "AT", "CH"]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set the cookie if the user hasn't chosen a locale yet
  if (!request.cookies.has("locale")) {
    const country = request.headers.get("x-vercel-ip-country") ?? "";
    const locale = DACH_COUNTRIES.has(country) ? "de" : "en";
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Only run on page requests, not on static assets or API routes
  matcher: ["/"],
};
