<script lang="ts">
  import { formatMoney } from "$lib/functions";
  export let game: {
    title: string;
    image: string;
    totalSlots: number;
    currentPlayers: number;
    pricePerBet: number;
    prize: string;
  };

  let userHasBet = false;

  function placeBet() {
    userHasBet = true;
    alert("Bet placed!");
  }
</script>

{#if game}
  <div class="p-2 text-white">
    <div class="flex flex-col space-y-4 min-h-[380px]">
      <!-- Image -->
      <img src={game.image} alt="Game Image" class="rounded-xl w-full h-48 object-cover" />

      <!-- Title -->
      <h1 class="text-xl sm:text-2xl font-bold">{game.title}</h1>

      <!-- Info Rows -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400">
        <div><i class="fa-solid fa-users mr-2 text-gray-500"></i>Players: {game.currentPlayers} / {game.totalSlots}</div>
        <div><i class="fa-solid fa-tag mr-2 text-gray-500"></i>Bet Cost: {formatMoney(game.pricePerBet)}</div>
        <div class="sm:col-span-2"><i class="fa-solid fa-box mr-2 text-gray-500"></i>Prize: {game.prize}</div>
      </div>

      <!-- Action -->
      {#if !userHasBet}
        <button
          on:click={placeBet}
          class="mt-auto w-full button main-button"
        >
          Place Bet
        </button>
      {:else}
        <div class="text-center text-green-400 text-base font-semibold mt-auto">
          ✅ You are in! Waiting for results...
        </div>
      {/if}
    </div>
  </div>
{/if}
