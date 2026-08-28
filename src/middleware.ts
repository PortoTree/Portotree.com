import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. portofolio.portotree.com, portofolio.localhost:3000)
  let hostname = req.headers.get('host') || '';

  // Remove port for local development
  const domain = hostname.split(':')[0];

  const sessionCookie = req.cookies.get('session');

  // List of paths that require authentication on the main domain
  const protectedPaths = [
    '/personal/dashboard',
    '/resume-builder',
    '/surat-generator'
  ];

  const isProtectedPath = protectedPaths.some(path => url.pathname.startsWith(path));
  const isOwnSubdomain = domain === 'own.portotree.com' || domain === 'own.localhost';

  // Guard protected routes (main domain)
  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Guard admin subdomain — redirect ke halaman login admin sendiri (own.portotree.com/login)
  if (isOwnSubdomain && !sessionCookie && url.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logic for portofolio subdomain
  if (domain === 'portofolio.portotree.com' || domain === 'portofolio.localhost') {
    return NextResponse.rewrite(new URL(`/portofolio-subdomain${url.pathname}`, req.url));
  }
  
  // Logic for resume subdomain
  if (domain === 'resume.portotree.com' || domain === 'resume.localhost') {
    return NextResponse.rewrite(new URL(`/resume-subdomain${url.pathname}`, req.url));
  }

  // Logic for surat subdomain
  if (domain === 'surat.portotree.com' || domain === 'surat.localhost') {
    return NextResponse.rewrite(new URL(`/surat-subdomain${url.pathname}`, req.url));
  }

  // Logic for job/networking subdomain
  if (domain === 'job.portotree.com' || domain === 'job.localhost') {
    return NextResponse.rewrite(new URL(`/job-subdomain${url.pathname}`, req.url));
  }

  // Logic for owner dashboard subdomain
  if (isOwnSubdomain) {
    return NextResponse.rewrite(new URL(`/own-subdomain${url.pathname}`, req.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt|xml)$).*)',
  ],
};
