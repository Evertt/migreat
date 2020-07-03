<script>
  import { lastRouteStore } from '/stores/index'
  import { goto, route } from '@sveltech/routify'
  $lastRouteStore = $route.last
  $goto('/home', {}, true)
</script>