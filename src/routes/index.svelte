<script>
	import {onMount} from 'svelte'

	let dots = false;
	let transitions = []

	function typewriter(node, { speed = 40 }) {
		const valid = (
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === 3
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length * speed;

			return {
				duration,
				tick: t => {
					const i = ~~(text.length * t);
					node.textContent = text.slice(0, i);
				}
			};
	}

	const triggerTransition = n => {
		if (n === 0) {
			dots = true
			setTimeout(() => {
				transitions[0] = true
				dots = false
				}, 1000)
		} else {
		transitions[n] = true
		}
	}
	onMount(() => triggerTransition(0))
</script>

<style>
	a {
		background-color: var(--decoration-color);
		color: var(--main-reverse-color);
		margin: 0;
		text-decoration: none
	}

	#dots {
		width: 100px;
	}

	#prompt {
		color: var(--decoration-color);
	}

	#terminal {
		background-color: var(--main-color);
		color: var(--main-reverse-color);
		font-family: Fira Code, monospace;
		padding: 10px;
		height: 400px;
	}

	#terminal p {
		margin: 0;	
	}
</style>

<svelte:head>
	<title>Fabricio Juliatto's page</title>
</svelte:head>

<div id="terminal">
	{#if dots}
		<span id="dots" intro:true in:typewriter={{ speed: 150}}>.....</span>
	{/if}
	<p>
		{#if transitions[0]}
			<span id="prompt">root@juliatto.dev: </span>
			<span in:typewriter on:introend={() => triggerTransition(1)}>Hi! Welcome to my personal page! </span>
		{/if}
	</p>
	<p>
		{#if transitions[1]}
			<span id="prompt">root@juliatto.dev: </span>
			<span in:typewriter on:introend={() => triggerTransition(2)}> You can check my </span>
		{/if}
		{#if transitions[2]}
			<a href="blog" in:typewriter on:introend={() => triggerTransition(3)}>blog</a>
		{/if}
	</p>
	<p>
		{#if transitions[3]}
			<span id="prompt">root@juliatto.dev: </span>
			<span in:typewriter on:introend={() => triggerTransition(4)}>or my </span>
		{/if}
		{#if transitions[4]}
			<a href="projects" in:typewriter on:introend={() => triggerTransition(5)}>projects</a>
		{/if}
	</p>
	<p>
		{#if transitions[5]}
			<span id="prompt">root@juliatto.dev: </span>
			<span in:typewriter on:introend={() => triggerTransition(6)}>or learn more </span>
		{/if}
		{#if transitions[6]}
			<a href="about-me" in:typewriter on:introend={() => triggerTransition(7)}>about me</a><span>.</span>
		{/if}
	</p>
	<p>
		{#if transitions[7]}
		<span id="prompt">root@juliatto.dev: </span>
		{/if}
	</p>
	<p>
		{#if transitions[7]}
		<span id="prompt">root@juliatto.dev: </span>
		<span in:typewriter>If you want to contact me, feel free to do so using any of the links on the left :)</span>
		{/if}
</div>