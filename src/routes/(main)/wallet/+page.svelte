<script lang="ts">
  type Transaction = {
    type: 'Deposit' | 'Withdrawal';
    amount: number;
    date: string;
  };

  let activeTab: 'fund' | 'withdraw' = 'fund';
  let balance: number = 1200.50;

  let history: Transaction[] = [
    { type: 'Deposit', amount: 200, date: '2025-05-20' },
    { type: 'Withdrawal', amount: 100, date: '2025-05-18' },
    { type: 'Deposit', amount: 150, date: '2025-05-15' },
  ];

  let fundAmount: number | null = null;
  let withdrawAmount: number | null = null;

  function fundWallet() {
    if (fundAmount && fundAmount > 0) {
      balance += fundAmount;
      history.unshift({
        type: 'Deposit',
        amount: fundAmount,
        date: new Date().toISOString().split('T')[0],
      });
      fundAmount = null;
    }
  }

  function withdrawFunds() {
    if (withdrawAmount && withdrawAmount > 0 && withdrawAmount <= balance) {
      balance -= withdrawAmount;
      history.unshift({
        type: 'Withdrawal',
        amount: withdrawAmount,
        date: new Date().toISOString().split('T')[0],
      });
      withdrawAmount = null;
    }
  }
</script>

<div class="p-4 max-w-2xl mx-auto">
  <h2 class="text-2xl sm:text-3xl font-bold mb-4">
    <i class="fa-solid fa-wallet mr-2"></i>Wallet
  </h2>

  <!-- Balance Section -->
  <div class="bg-gray-100 rounded-lg p-4 mb-6 shadow">
    <h3 class="text-lg font-semibold"><i class="fa-solid fa-money-bill-wave mr-1"></i>Current Balance</h3>
    <p class="text-2xl font-bold text-green-600">${balance.toFixed(2)}</p>
  </div>

  <!-- Tabs -->
  <div class="flex mb-4 border-b">
    <button
      class={`px-4 py-2 font-semibold flex items-center gap-2 ${activeTab === 'fund' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
      on:click={() => activeTab = 'fund'}
    >
      <i class="fa-solid fa-circle-plus"></i> Fund Wallet
    </button>
    <button
      class={`px-4 py-2 font-semibold flex items-center gap-2 ml-4 ${activeTab === 'withdraw' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
      on:click={() => activeTab = 'withdraw'}
    >
      <i class="fa-solid fa-circle-minus"></i> Withdraw
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === 'fund'}
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-2"><i class="fa-solid fa-coins mr-1"></i>Add Funds</h4>
      <input
        type="number"
        placeholder="Enter amount"
        bind:value={fundAmount}
        class="input border rounded p-2 mb-2 md:w-1/2 lg:w-1/3"
      /><br />
      <button on:click={fundWallet} class="button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <i class="fa-solid fa-arrow-up-right-dots mr-1"></i> Fund Wallet
      </button>
    </div>
  {:else if activeTab === 'withdraw'}
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-2"><i class="fa-solid fa-hand-holding-dollar mr-1"></i>Withdraw Funds</h4>
      <input
        type="number"
        placeholder="Enter amount"
        bind:value={withdrawAmount}
        class="input border rounded p-2 mb-2 md:w-1/2 lg:w-1/3"
      /><br />
      <button on:click={withdrawFunds} class="button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        <i class="fa-solid fa-arrow-down-wide-short mr-1"></i> Withdraw
      </button>
    </div>
  {/if}

  <!-- Transaction History -->
  <div>
    <h4 class="text-lg font-semibold mb-2"><i class="fa-solid fa-clock-rotate-left mr-1"></i>Transaction History</h4>
    {#if history.length === 0}
      <p class="text-gray-500">No transactions yet.</p>
    {:else}
      <ul class="space-y-2">
        {#each history as item}
          <li class="bg-white shadow p-3 rounded flex justify-between items-center">
            <div class="flex items-center gap-3">
              <i class={`text-xl ${item.type === 'Deposit' ? 'fa-solid fa-arrow-down text-green-600' : 'fa-solid fa-arrow-up text-red-500'}`}></i>
              <div>
                <p class="font-medium">{item.type}</p>
                <p class="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
            <span class={`font-bold ${item.type === 'Withdrawal' ? 'text-red-500' : 'text-green-600'}`}>
              {item.type === 'Withdrawal' ? '-' : '+'}${item.amount.toFixed(2)}
            </span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
