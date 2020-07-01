<script>
  import { url } from '@sveltech/routify'
  import { scale, fly } from 'svelte/transition'
  import { BaseTransition } from '@sveltech/routify/decorators'

  export let scoped
  const { width } = scoped

  const config = {
    inParams: { duration: 2500 },
    outParams: { duration: 2500 },
  }

  const configs = [
    {
      // New and old route are identical, do nothing
      condition: ({ routes }) => routes[0] === routes[1],
      transition: fly,
      inParams: { x: $width, duration: 500 },
      outParams: { x: -$width, duration: 500 },
    },
    {
      condition: c => c.toAncestor,
      transition: scale,
      inParams: { start: 1.2 },
      outParams: { start: 0.8 },
    },
    {
      condition: c => c.toDescendant,
      transition: scale,
      inParams: { start: 0.8 },
      outParams: { start: 1.2 },
    },
    {
      condition: c => c.toHigherIndex,
      transition: fly,
      inParams: { x: $width, duration: 2500 },
      outParams: { x: -$width, duration: 2500 },
    },
    {
      condition: c => c.toLowerIndex,
      transition: fly,
      inParams: { x: -$width, duration: 2500 },
      outParams: { x: $width, duration: 2500 },
    },
    {
      // No matching config. We don't want a transition
      condition: () => true,
      transition: () => {},
    },
  ]
</script>

<BaseTransition {configs}>
  <slot />
</BaseTransition>
