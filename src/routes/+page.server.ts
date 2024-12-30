import { prisma } from "$lib"

export const load = async ({ locals })=> {
    if(locals.user){
        const type = await prisma.type.findMany({
            where:{
                user:{
                    id:locals.user?.id as string
                }
            }
        })
    
        return{ type }
    }

    return{ type:null }
}

export const actions = {
    create:async ({ request,locals }) => {
        const tipe = (await request.formData()).get("tipe")

        const exist_user = await prisma.user.findUnique({ where:{ id:locals.user?.id as string }})

        try {
            if (!exist_user) {
                await prisma.user.create({
                    data:{
                        id:locals.user?.id as string,
                        email:locals.user?.email as string
                    }
                })
            }
            await prisma.type.create({
                data:{
                    title:tipe as string,
                    user:{
                        connect:{
                            id:locals.user?.id as string
                        }
                    }
                }
            })
            return{ message:"buat data berhasil" }
        } catch (e) {
            return{ message:'oops ada yang error'}
        }
    },
    delete:async ({ request }) => {
        const id = (await request.formData()).get("id")

        await prisma.type.delete({
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

        await prisma.type.update({
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