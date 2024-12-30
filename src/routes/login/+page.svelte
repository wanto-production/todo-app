<script lang="ts">
	import { enhance } from '$app/forms';
    import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

    let { form } = $props()
    let loading = $state(false)
    let message = $derived(form?.message)

</script>

<svelte:head>
    <title>login</title>
</svelte:head>

<main class=" w-full h-screen flex justify-center flex-col items-center gap-2 bg-gray-200">
    <div>
        {#if message}
            <p class=" w-[340px] p-2 bg-blue-400 text-white">{message}</p>
        {/if}
    </div>
    <Card.Root>
        <Card.Header>
            <Card.Title>login</Card.Title>
        </Card.Header>
        <Card.Content>
            <form class=" w-[300px] p-2 flex gap-2" action="?/login" method="post" use:enhance>
                <Input type="email" name="email" placeholder="email" required/>
                <Button type="submit" disabled={loading}>login</Button>
            </form>
        </Card.Content>
    </Card.Root>
</main>