<script>
	export let segment;
</script>

<style>
	nav {
		background-color: var(--darkest-blue);
		color: white;
		height: var(--nav-height);
		width: 100vw;
		position: fixed;
		z-index: 2;
	}

	a {
		font-size: 26px;
		padding: 0 0 0 15px;
		text-decoration: none;
	}

	.selected {
		color: var(--svelte-orange);
	}

	#site-title {
		font-family: "Poiret One", cursive;
		font-size: 34px;
		padding: 0 10px 0 var(--left-line);
	}
</style>

<nav>
	<a id="site-title" href="/">Juliatto.dev</a>
	<a class:selected="{segment==='blog'}" href="blog">Blog</a>
	<a class:selected="{segment==='projects'}" href="projects">Projects</a>
</nav>
