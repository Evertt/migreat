<script>
  import { url } from '@sveltech/routify'
  import { TRANSITION_TIME } from '/constants'
  import { scale, fly } from 'svelte/transition'
  import { BaseTransition } from '@sveltech/routify/decorators'

  export let scoped
  const { width } = scoped

  const configs = [
    {
      // New and old route are identical, do nothing
      condition: ({ routes }) => routes[0] === routes[1],
      transition: fly,
      inParams: { x: $width, duration: TRANSITION_TIME },
      outParams: { x: -$width, duration: TRANSITION_TIME },
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
      inParams: { x: $width, duration: TRANSITION_TIME },
      outParams: { x: -$width, duration: TRANSITION_TIME },
    },
    {
      condition: c => c.toLowerIndex,
      transition: fly,
      inParams: { x: -$width, duration: TRANSITION_TIME },
      outParams: { x: $width, duration: TRANSITION_TIME },
    },
    {
      // No matching config. We don't want a transition
      condition: () => true,
      transition: () => {},
    },
  ]
</script>

<!--{#each [$url()] as _ ($url())}-->
  <BaseTransition {configs}>
    <slot />
  </BaseTransition>
<!--{/each}-->