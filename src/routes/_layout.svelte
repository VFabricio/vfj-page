<script>
	import LeftSideBar from '../components/LeftSideBar.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		--extra-padding: 30px;
		padding-top: calc(var(--nav-height) + var(--extra-padding));
		padding-left: calc(var(--sidebar-width) + var(--extra-padding));
	}
</style>

<Nav {segment}/>

<LeftSideBar/>

<main>
	<slot></slot>
</main>