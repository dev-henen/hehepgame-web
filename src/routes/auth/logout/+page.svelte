<script lang="ts">
    import { onMount } from 'svelte';
  
    onMount(() => {
      // Client-side redirect after cookie is deleted
      window.location.replace('/auth/login');
    });
</script>

<p>Please wait...</p>