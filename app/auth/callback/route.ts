import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.user) {
      // Fetch user profile to route correctly based on account_type
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('account_type')
        .eq('id', data.user.id)
        .maybeSingle()

      const targetPath = profile?.account_type === 'merchant' ? '/merchants-dashboard' : '/dashboard'
      return NextResponse.redirect(`${origin}${targetPath}`)
    }
  }

  // Redirect to sign-in on error
  return NextResponse.redirect(`${origin}/sign-in?error=AuthCallbackFailed`)
}
