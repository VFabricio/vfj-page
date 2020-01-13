import { writable } from 'svelte/store'

export const toggleSidebar = () => sidebarVisible.update(visible => !visible)

export const sidebarVisible = writable(true)