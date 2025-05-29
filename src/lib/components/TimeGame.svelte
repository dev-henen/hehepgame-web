<script lang="ts">
  import { onMount } from "svelte";
  export let game: {
    title: string;
    image: string;
    totalSlots: number;
    currentPlayers: number;
    endsAt: Date;
    prizes: string[];
  };

  let userHasBet = false;
  let selectedPrize = "";
  let timeLeft = "";

  function updateCountdown() {
    const now = new Date();
    const diff = new Date(game.endsAt).getTime() - now.getTime();
    if (diff <= 0) {
      timeLeft = "Game ended";
      return;
    }
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    timeLeft = `${minutes}m ${seconds}s`;
  }

  onMount(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });

  function placeBet(prize: string) {
    userHasBet = true;
    selectedPrize = prize;
    alert(`Bet placed on ${prize}`);
  }
</script>

{#if game}
  <div class="p-2 text-white">
    <div class="flex flex-col space-y-4 min-h-[420px]">
      <!-- Image -->
      <img src={game.image} alt="Game Image" class="rounded-xl w-full h-48 object-cover" />

      <!-- Title -->
      <h1 class="text-xl sm:text-2xl font-bold">{game.title}</h1>

      <!-- Info Rows -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400">
        <div><i class="fa-solid fa-users mr-2 text-gray-500"></i>Players: {game.currentPlayers} / {game.totalSlots}</div>
        <div><i class="fa-solid fa-clock mr-2 text-gray-500"></i>Time Left: {timeLeft}</div>
      </div>

      <!-- Prize Selection -->
      <div>
        <div class="flex items-center gap-2 text-gray-300">
          <i class="fa-solid fa-gift text-gray-500"></i>
          {#if !userHasBet}
            <span>Choose a prize:</span>
          {:else}
            <span class="text-green-400 font-semibold">Your Choice: {selectedPrize}</span>
          {/if}
        </div>

        {#if !userHasBet}
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {#each game.prizes as prize}
              <button
                class="button main-button"
                on:click={() => placeBet(prize)}
              >
                {prize}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Status Message -->
      {#if userHasBet}
        <div class="text-center text-green-400 text-base font-semibold mt-auto">
          ✅ You are in! Waiting for results...
        </div>
      {/if}
    </div>
  </div>
{/if}
