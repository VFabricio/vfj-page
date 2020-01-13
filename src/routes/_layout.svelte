<script>
	import { onMount } from 'svelte'

	import LeftSideBar from '../components/LeftSideBar.svelte'
	import Nav from '../components/Nav.svelte'
	
	import { sidebarVisible } from '../components/stores.js'

	import { breakpoint, isDesktop, isMobile } from '../media-queries.js'

	$: invisibleSidebar = !$sidebarVisible

	export let segment;

	const hideSidebarOnMobile = () => {
		if (isMobile(breakpoint)) {
			sidebarVisible.set(false);
		}
	}

	const showSidebarOnMobile = () => {
		if (isMobile(breakpoint)) {
			sidebarVisible.set(true);
		}
	}

	const showSidebarOnDesktop = () => {
		if (isDesktop(breakpoint)) {
			sidebarVisible.set(true);
		}
	}

	onMount(showSidebarOnDesktop)

	// variables for detecting sliding actions
	let x = 0;
	let y = 0;
	const minHorizontalSlide = 100
	const maxVerticalSlide = 200

	const handleMouseDown = e => {
		x = e.clientX
		y = e.clientY
	}

	const handleMouseUp = e => {
		let finalX = e.clientX	
		let finalY = e.clientY
		if (Math.abs(finalY - y) < maxVerticalSlide) {
			if (finalX - x > minHorizontalSlide) {
				showSidebarOnMobile()
			}
			if (finalX - x < -minHorizontalSlide) {
				hideSidebarOnMobile()
			}
		}
	}

	const handleTouchStart = e => {
		x = e.changedTouches[0].clientX
		y = e.changedTouches[0].clientY
	}

	const handleTouchEnd = e => {
		let finalX = e.changedTouches[0].clientX	
		let finalY = e.changedTouches[0].clientY
		if (Math.abs(finalY - y) < maxVerticalSlide) {
			if (finalX - x > minHorizontalSlide) {
				showSidebarOnMobile()
			}
			if (finalX - x < -minHorizontalSlide) {
				hideSidebarOnMobile()
			}
		}
	}
</script>

<style>
	main {
		grid-column: 2/3;
		grid-row: 2/3;
		overflow-x: hidden;
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
</style>

<svelte:body on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}/>

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