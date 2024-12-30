import { prisma } from '$lib'
import { redirect } from '@sveltejs/kit'

export const load = async ({ params,locals }) => {
    const { user } = await locals.safeGetSession()

    if(user){
        const todo = await prisma.todo.findMany({
            where:{
                user:{
                    id:user.id
                },
                type:{
                    title:params.type
                }
            }
        })
        return{ todo }
    }

    return redirect(302,'/')
}

export const actions = {
    create:async ({ request,locals }) => {
        const formdata = await request.formData()
        const title = formdata.get("text") as string
        const type = formdata.get("type") as string
        const { user } = locals
        
        try {
            await prisma.todo.create({
                data:{
                    title,
                    accept:false,
                    user_id:user?.id as string,
                    type_todo:type
                }
            })
            return{ message:"buat data berhasil" }
        } catch (e) {
            return{ message:'oops ada yang error'}
        }
    },
    delete:async ({ request }) => {
        const id = (await request.formData()).get("id")

        await prisma.todo.delete({
            where:{
                id:id as string
            }
        })

        return{ message:"delete data berhasil" }
    },
    edit:async ({ request }) => {
        const formdata = await request.formData()
        const id = formdata.get("id") as string
        const title = formdata.get("title") as string

        await prisma.todo.update({
            where:{
                id
            },
            data:{
                title
            }
        })

        return{ message:"update data berhasil" }
    }
}