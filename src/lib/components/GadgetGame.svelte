<script lang="ts">
  import { formatMoney } from "$lib/functions";

  let userHasBet = false;

  const game = {
    title: "Win an iPhone 15 Pro!",
    image: "/images/fun-3d-cartoon-asian-teenager.jpg",
    totalSlots: 10,
    currentPlayers: 4,
    pricePerBet: 1000,
    prize: "iPhone 15 Pro",
  };

  function placeBet() {
    userHasBet = true;
    alert("Bet placed!");
  }
</script>

<div class="p-4 sm:p-6 text-white max-w-3xl">
  <div class="bg-[#131214] rounded-2xl p-6 shadow-lg space-y-6">
    <img src={game.image} alt="Game Image" class="rounded-xl w-full max-h-[250px] object-cover" />

    <h1 class="text-2xl font-bold">{game.title}</h1>

    <div class="flex flex-col gap-2 text-sm text-gray-300">
      <div><i class="fa-solid fa-users mr-2"></i>Players: {game.currentPlayers} / {game.totalSlots}</div>
      <div><i class="fa-solid fa-tag mr-2"></i>Bet Cost: {formatMoney(game.pricePerBet)}</div>
      <div><i class="fa-solid fa-box mr-2"></i>Prize: {game.prize}</div>
    </div>

    {#if !userHasBet}
      <button
        on:click={placeBet}
        class="w-full button main-button"
      >
        Place Bet
      </button>
    {:else}
      <div class="text-center text-green-400 text-lg font-bold">
        You are in! Waiting for results...
      </div>
    {/if}
  </div>
</div>
