<script lang="ts">
  import { onMount } from "svelte";

  let userHasBet = false;
  let selectedPrize = "";

  const game = {
    title: "Mystery Prize Countdown!",
    image: "/images/fun-3d-cartoon-asian-teenager.jpg",
    totalSlots: 10,
    currentPlayers: 6,
    endsAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
    prizes: ["1,000 NGN", "2,000 NGN", "3,000 NGN", "5,000 NGN", "10,000 NGN"],
  };

  let timeLeft = "";

  function updateCountdown() {
    const now = new Date();
    const diff = game.endsAt.getTime() - now.getTime();
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

<div class="p-4 sm:p-6 text-white max-w-3xl">
  <div class="bg-[#131214] rounded-2xl p-6 shadow-lg space-y-6">
    <img src={game.image} alt="Game Image" class="rounded-xl w-full max-h-[250px] object-cover" />

    <h1 class="text-2xl font-bold">{game.title}</h1>

    <div class="flex flex-col gap-2 text-sm text-gray-300">
      <div><i class="fa-solid fa-users mr-2"></i>Players: {game.currentPlayers} / {game.totalSlots}</div>
      <div><i class="fa-solid fa-clock mr-2"></i>Time Left: {timeLeft}</div>

      <div>
        <i class="fa-solid fa-gift mr-2"></i>Choose a prize:
        {#if !userHasBet}
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {#each game.prizes as prize}
              <button class="button main-button" on:click={() => placeBet(prize)}>
                {prize}
              </button>
            {/each}
          </div>
        {:else}
          <div class="text-green-400 font-bold mt-2">Your Choice: {selectedPrize}</div>
        {/if}
      </div>
    </div>

    {#if userHasBet}
      <div class="text-center text-green-400 text-lg font-bold">
        You are in! Waiting for results...
      </div>
    {/if}
  </div>
</div>
