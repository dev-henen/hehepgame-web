<script lang="ts">
  import { dialogScrollStore } from "$lib/stores/dialogScrollStore";
  import { onDestroy } from "svelte";
  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  export let open: boolean = false;
  export let onClose: () => void = () => {};

  const instanceId = Symbol(); // unique per component instance

  let dialogRef: HTMLDivElement | null = null;
  let startY = 0;
  let translateY = 0;
  let dragging = false;

  function handleTouchStart(e: TouchEvent) {
    startY = e.touches[0].clientY;
    dragging = true;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!dragging) return;
    const currentY = e.touches[0].clientY;
    translateY = currentY - startY;

    if (translateY > 0 && dialogRef) {
      dialogRef.style.transform = `translateY(${translateY}px)`;
    }
  }

  function handleTouchEnd() {
    dragging = false;

    if (translateY > 100) {
      open = false;
      onClose();
    } else if (dialogRef) {
      dialogRef.style.transition = "transform 0.3s ease-out";
      dialogRef.style.transform = "translateY(0)";
      setTimeout(() => {
        if (dialogRef) dialogRef.style.transition = "";
      }, 300);
    }

    translateY = 0;
  }

  $: {
    if (open) {
      dialogScrollStore.open(instanceId);
    } else {
      dialogScrollStore.close(instanceId);
    }
  }

  let visible = false;

  $: if (open && !visible) {
    visible = true;
    requestAnimationFrame(() => {
      if (dialogRef) dialogRef.classList.add("dialog-enter");
    });
  } else if (!open && visible) {
    if (dialogRef) {
      dialogRef.classList.remove("dialog-enter");
      dialogRef.classList.add("dialog-exit");
      setTimeout(() => {
        visible = false;
        dialogRef?.classList.remove("dialog-exit");
      }, 400);
    }
  }

  const ref = "D::" + Math.random().toString(36).substring(2, 9);

  $: if (browser && open) {
    goto(`#${ref}`);
  }

  $: if (browser && !open) {
    if ($page.url.hash === `#${ref}`) {
      history.back();
    }
  }

  afterNavigate(() => {
    if (browser && open) {
      if ($page.url.hash !== `#${ref}`) {
        onClose();
        open = false;
      }
    }
  });

  onDestroy(() => {
    dialogScrollStore.close(instanceId);
  });
</script>

<div>
  {#if visible}
    <div
      class="fixed inset-0 h-screen w-screen z-[1000] bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center"
      on:click={() => (onClose(), open = false)}
    >
      <div
        bind:this={dialogRef}
        class={`w-full sm:w-[500px] max-h-[90vh] h-[75vh] bg-[#131214] rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 overflow-y-auto relative 
  transform transition-all duration-300 ease-out 
  ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} 
  animate-[dialogInMobile_0.4s_ease-out] sm:animate-[dialogInDesktop_0.4s_ease-out]`}
        on:click|stopPropagation
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
      >
        <!-- Drag handle -->
        <div
          class="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 sm:hidden"
        ></div>

        <slot />
      </div>
    </div>
  {/if}
</div>
