<script>
	export let segment;
</script>

<style>
	nav {
		align-items: center;
		background-color: var(--darkest-blue);
		display: flex;
		color: white;
		height: var(--nav-height);
	}

	a {
		font-size: 18pt;
		padding: 0 0 0 15pt;
		text-decoration: none;
	}

	.selected {
		color: var(--svelte-orange);
	}

	#site-title {
		border-right: solid white 2px;
		font-family: "Itim", cursive;
		font-size: 30pt;
		font-style: italic;
		height: 100%;
		line-height: 100%;
		padding: 0 15pt 0 10pt;
	}
</style>

<nav>
	<a id="site-title" href="/">Juliatto.dev</a>
	<a class:selected="{segment==='blog'}" href="blog">Blog</a>
	<a class:selected="{segment==='projects'}" href="projects">Projects</a>
</nav>
