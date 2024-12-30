import { prisma } from '$lib'
import type { EmailOtpType } from '@supabase/supabase-js'
import { redirect } from '@sveltejs/kit'

export const GET = async ({ request,locals }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get("type") as EmailOtpType
    const token_hash = url.searchParams.get("token_hash") as string
    
    const { error,data } = await locals.supabase.auth.verifyOtp({
        token_hash,
        type
    })
    
    if(error) return redirect(302,`/error?message=${error.message}`)
    
    

    if (data.user) {
        const { id,email }  = data.user
        const exist_user = await prisma.user.findMany({ where:{ email }})
        if(!exist_user){
            await prisma.user.create({
                data:{
                    id,
                    email:email as string
                }
            });
        }
    }
    

    return redirect(302,'/')
}