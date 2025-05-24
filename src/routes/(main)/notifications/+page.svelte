<script lang="ts">
  type Notification = {
    id: number;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    date: string;
    read: boolean;
  };

  let globalEnabled = true;

  let notifications: Notification[] = [
    {
      id: 1,
      type: 'info',
      message: 'New feature update is live!',
      date: '2025-05-24T10:30:00Z',
      read: false,
    },
    {
      id: 2,
      type: 'success',
      message: 'Your withdrawal was successful.',
      date: '2025-05-23T09:15:00Z',
      read: true,
    },
    {
      id: 3,
      type: 'warning',
      message: 'Password will expire soon.',
      date: '2025-05-22T14:45:00Z',
      read: false,
    },
    {
      id: 4,
      type: 'error',
      message: 'Transaction failed. Try again.',
      date: '2025-05-21T18:20:00Z',
      read: true,
    },
  ];

  function toggleGlobal() {
    globalEnabled = !globalEnabled;
  }

  function markAsRead(id: number) {
    const note = notifications.find(n => n.id === id);
    if (note) note.read = true;
  }

  function iconClass(type: Notification["type"]) {
    switch (type) {
      case "info": return "fa-solid fa-circle-info text-blue-400";
      case "success": return "fa-solid fa-circle-check text-green-400";
      case "warning": return "fa-solid fa-triangle-exclamation text-yellow-400";
      case "error": return "fa-solid fa-circle-xmark text-red-400";
    }
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
</script>

<section class="max-w-3xl p-6 text-white space-y-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">
      <i class="fa-solid fa-bell mr-2 text-yellow-400"></i> Notifications
    </h1>
    <button class="button" on:click={toggleGlobal}>
      {globalEnabled ? 'Disable All' : 'Enable All'}
    </button>
  </div>

  <div class="space-y-4">
    {#each notifications as note}
      <div class="flex items-start gap-4 bg-[#1a1a1d] rounded-xl p-4 shadow-md">
        <i class={`${iconClass(note.type)} text-2xl mt-1`}></i>
        <div class="flex-1">
          <p class="font-medium text-sm md:text-base">{note.message}</p>
          <p class="text-xs text-gray-400 mt-1">{formatDate(note.date)}</p>
        </div>
        {#if !note.read}
          <button
            class="text-xs text-blue-400 hover:underline"
            on:click={() => markAsRead(note.id)}
          >
            Mark as read
          </button>
        {/if}
      </div>
    {/each}
  </div>

  {#if notifications.length === 0}
    <p class="text-gray-500">No notifications to show.</p>
  {/if}
</section>
