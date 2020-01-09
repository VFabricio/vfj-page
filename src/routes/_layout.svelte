<script>
	import LeftSideBar from '../components/LeftSideBar.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<Nav {segment}/>

<LeftSideBar/>

<main>
	<slot></slot>
</main>