<script>
	import { sidebarVisible } from './stores.js'
	export let segment;

	const handleClick = () => {
		sidebarVisible.update(visible => !visible)
		verticalBars = !verticalBars
	}

	let verticalBars = false;
</script>

<style>
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}
	}

	@media (min-width: 768px) {
		.fa-bars {
			display: none;
		}
	}

	nav {
		background-color: var(--darkest-blue);
		color: white;
		height: var(--nav-height);
		width: 100%;
	}

	a {
		font-size: 26px;
		padding: 0 0 0 15px;
		text-decoration: none;
	}

	.fa-bars {
		font-size: 30px;
		margin-left: var(--left-line);
	}

	.selected {
		color: var(--svelte-orange);
	}

	#site-title {
		font-family: "Poiret One", cursive;
		font-size: 34px;
		padding: 0 10px 0 var(--left-line);
	}

	.verticalBars {
		transform: rotate(-90deg);
	}

</style>

<nav>
	<i class="fas fa-bars" class:verticalBars on:click={handleClick}></i>
	<a id="site-title" href="/">Juliatto.dev</a>
	<a class:selected="{segment==='blog'}" class="nav-links" href="blog">Blog</a>
	<a class:selected="{segment==='projects'}" class="nav-links" href="projects">Projects</a>
</nav>
