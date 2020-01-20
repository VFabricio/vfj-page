<script>
	import { sidebarVisible, toggleSidebar } from './stores.js'
	export let segment;

	const handleClick = toggleSidebar

	$: verticalBars = $sidebarVisible
</script>

<style>
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

	.icon-bars {
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
		display: inline-block;
		transform: rotate(-90deg);
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}
	}

	@media (min-width: 768px) {
		.icon-bars {
			display: none;
		}
	}
</style>

<nav>
	<i class="icon-bars" class:verticalBars on:click={handleClick}></i>
	<a id="site-title" href="/">Juliatto.dev</a>
	<a class:selected="{segment==='blog'}" class="nav-links" href="blog">Blog</a>
	<a class:selected="{segment==='projects'}" class="nav-links" href="projects">Projects</a>
	<a class:selected="{segment==='about-me'}" class="nav-links" href="about-me">About Me</a>
</nav>
