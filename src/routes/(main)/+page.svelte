<script lang="ts">
  import { formatMoney, formatSuperFriendlyDate } from "$lib/functions";
  import Dialog from '$lib/components/Dialog.svelte';

  let showDialog = false;

  export let data;

  const topWinnings = data.topWinnings;
  const recentWinnings = data.recentWinnings;
</script>

<!-- Promotions -->
<section class="relative">
  <div class="overflow-x-auto no-scrollbar flex gap-4 p-2">
    {#each [1, 2, 3, 1] as img}
      <a href="#/1" class="block min-w-[200px] md:min-w-[300px]">
        <img
          src={`/images/1 (${img}).PNG`}
          alt="Promo"
          class="rounded-2xl h-[150px] md:h-[200px] object-cover"
        />
      </a>
    {/each}
  </div>
</section>

<!-- Activities -->
<section
  class="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-6 bg-[#131214] p-2 md:p-6 rounded-xl"
>
  {#if recentWinnings.data.length > 0}
    <div>
      <h2 class="text-lg font-bold mb-4">
        <span class="text-red-500">
          <i class="fa-solid fa-clock-rotate-left mr-1"></i>Recent
        </span> Wins
      </h2>
      <div class="space-y-4">
        {#each recentWinnings.data as game}
          <div class="flex items-center gap-4">
            {#if game.icon.startsWith("http://") || game.icon.startsWith("https://")}
              <img
                src={game.icon}
                alt="Icon"
                class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
            {:else}
              <span
                class="w-10 h-10 md:w-12 md:h-12 text-5xl rounded-lg object-cover mr-2"
              >{game.icon}</span>
            {/if}
            <div>
              <div class="text-xs md:text-sm">
                {game.winner.name ? game.winner.name + " won: " : "Profit:"}
                <mark class="gradient-text">{game.name || formatMoney(game.amount)}</mark>
                in {game.source || 'Unknown'}
              </div>
              <div class="text-gray-400 text-xs md:text-sm">
                <i class="fa-regular fa-calendar-clock mr-1"></i>
                {formatSuperFriendlyDate(game.date)}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if topWinnings.data.length > 0}
    <div>
      <h2 class="text-lg font-bold mb-4">
        <span class="text-yellow-400">
          <i class="fa-solid fa-trophy mr-1"></i>Top
        </span> Wins
      </h2>
      <div class="space-y-4">
        {#each topWinnings.data as game}
          <div class="flex items-center gap-4">
            {#if game.icon.startsWith("http://") || game.icon.startsWith("https://")}
              <img
                src={game.icon}
                alt="Icon"
                class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
            {:else}
              <span
                class="w-10 h-10 md:w-12 md:h-12 text-5xl rounded-lg object-cover mr-2"
              >{game.icon}</span>
            {/if}
            <div>
              <div class="text-xs md:text-sm">
                {game.winner.name ? game.winner.name + " won: " : "Profit:"}
                <mark class="gradient-text">{game.name || formatMoney(game.amount)}</mark>
                in {game.source || 'Unknown'}
              </div>
              <div class="text-gray-400 text-xs md:text-sm">
                <i class="fa-regular fa-calendar-clock mr-1"></i>
                {formatSuperFriendlyDate(game.date)}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if topWinnings.data.length > 0}
    <div>
      <h2 class="text-lg font-bold mb-4">
        <span class="text-green-400">
          <i class="fa-solid fa-fire mr-1"></i>Trending
        </span> Right Now
      </h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img
            src="/images/2 (1).PNG"
            alt="Icon"
            class="w-[100px] md:w-[170px] h-[100px] md:h-[170px] rounded-lg object-cover"
          />
          <div>
            <div class="text-xs md:text-sm">
              {topWinnings.data[0].source || 'Unknown'}
            </div>
            <div class="text-gray-400 text-[10px] md:text-xs">
              <i class="fa-solid fa-crown mr-1"></i>King of originals
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

<!-- <button on:click={() => showDialog = true} class="button main-button">Open Dialog</button>

<Dialog open={showDialog} onClose={() => showDialog = false}>
  <h2 class="text-xl font-bold mb-4">Dialog Content</h2>
  <p>This is your custom content inside the dialog.</p>
  <button class="mt-4 button" on:click={() => showDialog = false}>Close</button>
</Dialog> -->