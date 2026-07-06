import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const protectedRoutes = [
    '/dashboard',
    '/merchants-dashboard',
    '/new-transaction',
    '/review-funds',
    '/dispute-resolution',
    '/merchant-page'
  ]

  const isProtected = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  const isAuthRoute = pathname === '/sign-in' || pathname === '/getting-started'

  if (!user && isProtected) {
    const url = new URL('/sign-in', request.url)
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    // Fetch profile to redirect based on account_type
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('account_type')
      .eq('id', user.id)
      .single()

    const target = profile?.account_type === 'merchant' ? '/merchants-dashboard' : '/dashboard'
    const url = new URL(target, request.url)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/merchants-dashboard/:path*',
    '/new-transaction/:path*',
    '/review-funds/:path*',
    '/dispute-resolution/:path*',
    '/merchant-page/:path*',
    '/sign-in',
    '/getting-started'
  ]
}
