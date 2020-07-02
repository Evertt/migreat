import * as easing from 'svelte/easing'

export function fly(node, { delay = 0, duration = 400, easing: easing$1 = easing.cubicOut, x = 0, y = 0, opacity = 0, mode = 'px' }) {
  const style = getComputedStyle(node)
  const target_opacity = +style.opacity
  const transform = style.transform === 'none' ? '' : style.transform
  const od = target_opacity * (1 - opacity)
  const uX = mode === 'v' ? 'vw' : mode
  const uY = mode === 'v' ? 'vh' : mode

  return {
    delay,
    duration,
    easing: easing$1,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}${uX}, ${(1 - t) * y}${uY});
			opacity: ${target_opacity - (od * u)};`
  }
}
