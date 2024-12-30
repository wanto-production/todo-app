<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
	import CardFooter from "$lib/components/ui/card/card-footer.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
    import autoAnimate from '@formkit/auto-animate';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu"

    let { data,form } = $props()
    let tipe = $state("") 
</script>

<svelte:head>
    <title>home</title>
</svelte:head>

<main class=" w-full h-screen bg-gray-300 flex justify-center items-center flex-col gap-2">
    <div class=" p-2 bg-white rounded-md shadow-lg w-[300px] flex flex-col justify-center items-center gap-2">
        {#if data.user}
            <Card>
                <CardHeader>
                    <CardTitle>buat tipe tugas</CardTitle>
                </CardHeader>
                <CardContent>
                    <form class=" flex gap-2" action="?/create" method="post" use:enhance>
                        <Input bind:value={tipe} name="tipe" type="text" placeholder="contoh:sekolah" required/>
                        <Button type="submit">buat</Button>
                    </form>
                </CardContent>
                {#if form?.message}
                    <CardFooter>
                        <p>{form.message}</p>
                    </CardFooter>
                {/if}
            </Card>
        {:else}
            <h2>anda harus <a href="/login">login</a> untuk membuat tipe</h2>
        {/if}
    </div>

    {#if data.type}
        <div class=" p-2 bg-white rounded-md shadow-lg w-[300px] min-h-[200px] h-[200px] overflow-y-auto " >
            <div class=" w-full h-fit flex flex-col justify-center items-center gap-3 overflow-hidden" use:autoAnimate>
                {#each data.type as typ}
                    <div class=" p-2 rounded-md w-full bg-white shadow-lg border-t-2 border-gray-300 flex justify-between items-center px-2">
                        <form class=" w-full flex justify-between items-center pr-2" action="?/edit" method="post" use:enhance>
                            <input type="hidden" name="id" value={typ.id}>
                            <Input class=" placeholder:text-black w-[150px]" type="text" name="title" placeholder={typ.title} required/>
                            <Button type="submit">edit</Button>
                        </form>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>detail</DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                              <DropdownMenu.Group>
                                <DropdownMenu.GroupHeading>tipe {typ.title}</DropdownMenu.GroupHeading>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item>
                                    <form action="?/delete" use:enhance method="post">
                                        <input type="hidden" name="id" value={typ.id}>
                                        <button class=" outline-none" type="submit">hapus</button>
                                    </form>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item class="outline-none">
                                    <a href={`/type/${typ.title}`}>periksa tugas {typ.title}</a>
                                </DropdownMenu.Item>
                              </DropdownMenu.Group>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</main>