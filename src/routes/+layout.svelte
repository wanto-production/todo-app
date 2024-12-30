<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';
	let { children,data } = $props();
</script>

<header class=" w-full h-[60px] bg-white fixed top-0 flex justify-between items-center px-3 shadow-lg">
	<h2 class=" font-bold">todo-app</h2>

	<ul class=" flex items-center gap-2">
		{#if data.user}
			<li>
				<form action="/login?/logout" use:enhance method="post">
					<Button type="submit">signOut</Button>
				</form>
			</li>
		{:else}
			<li>
				<a href="/login"><Button>login</Button></a>
			</li>
		{/if}
		<li>
			<Button href="/">home</Button>
		</li>
	</ul>

</header>

{@render children()}
