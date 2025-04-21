<script lang="ts">
  import "../app.css";
  import { messageStore } from "$lib/notification";

  let message: string | null = null;
  messageStore.subscribe((value: any) => {
    message = value;
  });
</script>

<svelte:head>
  <title>Hehepgames</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  />
</svelte:head>

<slot />

<!-- Notification Container -->
{#if $messageStore}
  <div
    class="
    fixed bottom-20 md:bottom-10 left-1/2 transform -translate-x-1/2 z-50
    max-w-[90%] md:max-w-[400px] p-4
    bg-green-900/70 text-white rounded-lg shadow-lg text-center text-[0.9em]
    fade-notification show
    "
  >
    <p>{$messageStore}</p>
  </div>
{/if}
