<script lang="ts">
  import { formatMoney, formatSuperFriendlyDate } from "$lib/functions";
  import Dialog from '$lib/components/Dialog.svelte';
  import GadgetGame from "$lib/components/GadgetGame.svelte";
  import TimeGame from "$lib/components/TimeGame.svelte";  

    let showGadgetGameDialog: boolean = false;
  let showTimeGameDialog: boolean = false;

  export let data;

  export const slots: any = [
    {
        id: 'slot1',
        type: 'gadget',
        title: 'iPhone 15 Pro',
        subtitle: '256GB - Space Black',
        image: '/images/2 (2).PNG',
        price: 999,
        slotsTotal: 100,
        slotsLeft: 32,
        status: 'open'
    },
    {
        id: 'slot2',
        type: 'time',
        title: 'Flash Drop: PS5 Giveaway',
        image: '/images/2 (3).PNG',
        price: 499,
        slotsTotal: 50,
        slotsLeft: 0,
        endsAt: '2025-06-01T20:00:00Z',
        status: 'full'
    },
    {
        id: 'slot3',
        type: 'gadget',
        title: 'Nintendo Switch OLED',
        subtitle: 'White Edition',
        image: '/images/2 (4).PNG',
        price: 349,
        slotsTotal: 40,
        slotsLeft: 10,
        status: 'open'
    },
    {
        id: 'slot4',
        type: 'time',
        title: 'Weekend Drop: Mystery Tech Box',
        image: '/images/2 (5).PNG',
        price: 200,
        slotsTotal: 60,
        slotsLeft: 25,
        endsAt: '2025-06-02T18:00:00Z',
        status: 'open'
    }
];

</script>

<!-- Slot Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each slots as slot}
    <div class="bg-[#131214] rounded-2xl shadow-lg p-4 flex flex-col text-white h-full min-h-[350px]">
      <!-- Slot Image -->
      <img src={slot.image} alt={slot.title} class="w-full h-40 object-cover rounded-xl mb-2" />

      <!-- Title + Badge -->
      <div class="flex justify-between items-center">
        <h2 class="text-base font-semibold">{slot.title}</h2>
        <span
          class="text-xs px-2 py-1 rounded-full
                 {slot.type === 'gadget' ? 'bg-indigo-800 text-indigo-200' : 'bg-emerald-800 text-emerald-200'} capitalize"
        >
          {slot.type}
        </span>
      </div>

      <!-- Subtitle -->
      {#if slot.subtitle}
        <p class="text-sm text-gray-400 line-clamp-1">{slot.subtitle}</p>
      {/if}

      <!-- Info -->
      <p class="text-xs text-gray-500 mt-1">
        {#if slot.type === 'time'}
          Ends in: {formatSuperFriendlyDate(slot.endsAt)}
        {:else}
          {slot.slotsLeft} of {slot.slotsTotal} slots remaining
        {/if}
      </p>

      <!-- Progress -->
      <div class="w-full h-2 bg-gray-700 rounded overflow-hidden mt-2">
        <div
          class="h-full bg-green-500 transition-all duration-300"
          style="width: {100 - (slot.slotsLeft / slot.slotsTotal) * 100}%"
        />
      </div>

      <!-- Spacer -->
      <div class="flex-grow" />

      <!-- Button -->
      <button
        class="mt-3 text-sm button
               disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={slot.status !== 'open'}
      >
        {slot.status === 'open' ? 'Join Now' : slot.status === 'full' ? 'Full' : 'Closed'}
      </button>
    </div>
  {/each}
</div>




<Dialog bind:open={showGadgetGameDialog}>
  <GadgetGame />
</Dialog>

<Dialog bind:open={showTimeGameDialog}>
  <TimeGame />
</Dialog>
