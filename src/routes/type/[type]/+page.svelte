<script lang="ts">
    import { page } from "$app/state";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        CardFooter
    } from '$lib/components/ui/card'
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { enhance } from "$app/forms";
    import autoAnimate from '@formkit/auto-animate'

    const params = page.params.type
    let { data,form } = $props()
</script>

<svelte:head>
    <title>type | {params}</title>
</svelte:head>

<main class=" w-full h-screen bg-gray-300 flex flex-col gap-2 justify-center items-center">
    <div class=" p-2 bg-white rounded-md shadow-lg w-[300px] flex flex-col justify-center items-center gap-2">
        <Card>
            <CardHeader>
                <CardTitle>buat tugas {params}</CardTitle>
            </CardHeader>
            <CardContent>
                <form class=" flex gap-2" action="?/create" method="post" use:enhance>
                    <input type="hidden" name="type" value={params}>
                    <Input name="text" type="text" placeholder="buat tugas" required/>
                    <Button type="submit">buat</Button>
                </form>
            </CardContent>
            {#if form?.message}
                <CardFooter>
                    <p>{form.message}</p>
                </CardFooter>
            {/if}
        </Card>
    </div>

    <div class=" p-2 bg-white rounded-md shadow-lg w-[300px] min-h-[200px] h-[200px] overflow-y-auto " >
        
        <div class=" w-full h-fit flex flex-col gap-3 overflow-hidden" use:autoAnimate>
            {#if data.todo.length == 0}
            <h2>belum ada tugas {params}</h2>
            {:else}
                {#each data.todo as todo}
                <div class=" p-2 rounded-md w-full bg-white shadow-lg border-t-2 border-gray-300 flex justify-between items-center px-2">
                    <form class=" w-full flex justify-between items-center pr-2" action="?/edit" method="post" use:enhance>
                        <input type="hidden" name="id" value={todo.id}>
                        <Input class=" placeholder:text-black w-[130px]" type="text" name="title" placeholder={todo.title} required/>
                        <Button type="submit">edit</Button>
                    </form>
                    <form class=" w-full flex justify-between items-center pr-2" action="?/delete" method="post" use:enhance>
                        <input type="hidden" name="id" value={todo.id}>
                        <Button type="submit">delete</Button>
                    </form>
                </div>
                {/each}
            {/if}
        </div>
    </div>
</main>