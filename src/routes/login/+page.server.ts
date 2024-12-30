import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    const { user } = await locals.safeGetSession()
    if(user) return redirect(302,'/')
}

export const actions = {
    login:async({ locals,request })=>{
        const email = (await request.formData()).get("email") as string

        if (email == '') return{ message:'email harap di isi!' }

        const { error } = await locals.supabase.auth.signInWithOtp({
            email
        })

        if(error) return{ message:error.message };

        return{ message:"login berhasil, tunggu email verifikasi "}
    },
    logout:async ({ locals }) => {
        const { error } = await locals.supabase.auth.signOut()

        if(error) return{ message:error.message }
        return{ message:"logout berhasil "}
    }
}