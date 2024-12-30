<script>
	import Button from '$lib/components/ui/button/button.svelte';

    const { data } = $props()
</script>

<main class=" w-full h-screen flex flex-col justify-center items-center bg-gray-300">
    <p class=" text-2xl text-white">error: {data.message}</p>
    <Button href="/">back</Button>
</main>