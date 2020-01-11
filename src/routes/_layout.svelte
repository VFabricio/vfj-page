<script>
	import { onMount } from 'svelte'

	import LeftSideBar from '../components/LeftSideBar.svelte'
	import Nav from '../components/Nav.svelte'
	
	import { sidebarVisible } from '../components/stores.js'

	$: invisibleSidebar = !$sidebarVisible

	export let segment;

	const showSidebarOnDesktop = () => {
		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (isDesktop) {
			sidebarVisible.set(true);
		}
	}

	onMount(showSidebarOnDesktop)
</script>

<style>
	main {
		grid-column: 2/3;
		grid-row: 2/3;
		overflow-x: none;
		overflow-y: auto;
		padding: 30px;
	}

	#page {
		display: grid;
		grid-template-columns: var(--sidebar-width) auto;
		grid-template-rows: var(--nav-height) calc(100vh - var(--nav-height));
		height: 100%;
		overflow: hidden;
		transition: all 200ms ease;
		width: 100%;
	}

	#nav-container {
		grid-column: 1/3;
		grid-row: 1/2;
	}

	#sidebar-container {
		grid-column: 1/2;
		grid-row: 2/3;
	}

	#page.invisibleSidebar {
		grid-template-columns: 0 auto;
	}

	@media (max-width: 768px) {
		main {
			font-size: 12px;
		}
	}
</style>

<div id="page" class:invisibleSidebar>
	<div id="nav-container">
		<Nav {segment}/>
	</div>

	<div id="sidebar-container">
		<LeftSideBar/>
	</div>

	<main>
		<slot></slot>
	</main>
</div>