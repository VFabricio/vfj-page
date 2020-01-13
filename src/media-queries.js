export const breakpoint = '768px'

export const isMobile = breakpoint => window.matchMedia(`(max-width: ${breakpoint})`).matches
export const isDesktop = breakpoint => !isMobile(breakpoint)
