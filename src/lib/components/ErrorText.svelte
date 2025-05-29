<script lang="ts">
  export let text: string;
</script>

{#if text}
  <div class="sm:col-span-2 text-red-500 flex items-center gap-2">
    <i class="fa-solid fa-circle-exclamation"></i>
    {text}
  </div>
{/if}
