import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. portofolio.portotree.com, portofolio.localhost:3000)
  let hostname = req.headers.get('host') || '';

  // Remove port for local development
  const domain = hostname.split(':')[0];

  // Logic for portofolio subdomain
  if (domain === 'portofolio.portotree.com' || domain === 'portofolio.localhost') {
    return NextResponse.rewrite(new URL(`/portofolio-subdomain${url.pathname}`, req.url));
  }
  
  // Logic for brain/admin subdomain
  if (domain === 'brain.portotree.com' || domain === 'brain.localhost') {
    return NextResponse.rewrite(new URL(`/brain-subdomain${url.pathname}`, req.url));
  }
  
  // Logic for resume subdomain
  if (domain === 'resume.portotree.com' || domain === 'resume.localhost') {
    return NextResponse.rewrite(new URL(`/resume-subdomain${url.pathname}`, req.url));
  }

  // Check for dashboard auth
  if (url.pathname.startsWith('/personal/dashboard')) {
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, etc. inside public directory if any
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
