<script lang="ts">
  import { formatMoney, trimName } from "$lib/functions";
  import { onMount } from "svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import Notifications from "$lib/components/Notifications.svelte";
  import Settings from "$lib/components/Settings.svelte";
  import Wallet from "$lib/components/Wallet.svelte";

  export let data;

  let pathname: string = "";
  let showNotificationsDialog: boolean = false;
  let showSettingsDialog: boolean = false;
  let showWalletDialog: boolean = false;

  $: {
    pathname = data.pathname;
    sidebarOpen = false;
    showTopNavLoginDropDown = false;
  }

  const user = data.user;

  let search: string = "";
  let sidebarOpen: boolean = false;
  let showTopNavLoginDropDown: boolean = false;

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".sidebar") &&
        !target.closest(".menuButton") &&
        sidebarOpen
      ) {
        sidebarOpen = false;
      }
      if (
        !target.closest(".topNavLoginDropDown") &&
        !target.closest(".topNavLoginDropDownButton") &&
        showTopNavLoginDropDown
      ) {
        showTopNavLoginDropDown = false;
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<!-- Navbar -->
<nav
  class="fixed top-0 left-0 flex items-center bg-[#171618] w-full p-4 z-50 md:left-[300px] md:w-[calc(100%-300px)]"
>
  <button
    class="md:hidden mr-4 menuButton"
    on:click={() => (sidebarOpen = !sidebarOpen)}
    aria-label="Menu"
  >
    <i class="fa fa-bars text-2xl text-white"></i>
  </button>

  <div class="flex-1">
    <h1 class="text-2xl md:text-3xl font-bold">
      <a href="/" class="gradient-text">hehepgame</a>
    </h1>
  </div>

  <div class="hidden md:block md:w-1/2 px-2">
    <div class="flex items-center bg-[#131214] rounded-full px-4 py-2">
      <i class="bi bi-search text-gray-500"></i>
      <input
        type="text"
        bind:value={search}
        placeholder="Game | Category Tag"
        class="bg-transparent border-0 outline-none ml-2 w-full text-gray-400 placeholder-gray-600"
      />
    </div>
  </div>

  <div class="flex md:w-1/4 justify-end gap-2">
    {#if !user.isLoggedIn}
      <a
        href="/auth/login"
        class="text-green-400 font-bold px-4 py-2 rounded-full hover:bg-white/20"
        >Sign in</a
      >
      <a
        href="/auth/signup"
        class="hidden md:inline-block bg-green-600 text-white font-bold px-4 py-2 rounded-full hover:bg-green-500 hover:text-white/80"
        >Sign up</a
      >
    {:else}
      <div class="relative">
        <button
          class="flex items-center gap-2 text-white font-bold px-4 py-2 rounded-full hover:bg-white/20 topNavLoginDropDownButton"
          aria-label="User Menu"
          on:click={() => (showTopNavLoginDropDown = !showTopNavLoginDropDown)}
        >
          <i class="fa fa-user-circle text-2xl"></i>
          <span>{trimName(user.data.name)}</span>
        </button>
        {#if showTopNavLoginDropDown}
          <div
            class="topNavLoginDropDown absolute right-0 mt-2 w-48 bg-[#131214] rounded-md shadow-lg overflow-hidden z-50"
          >
            <a
              href="/profile"
              class="block px-4 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >Profile</a
            >
            <a
              href="/auth/logout"
              class="block px-4 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >Logout</a
            >
          </div>
        {/if}
      </div>
    {/if}
  </div>
</nav>

<!-- Sidebar -->
<aside
  class="sidebar fixed top-0 left-0 w-[250px] h-full bg-[#131214] shadow-lg p-4 space-y-6 transform transition-transform duration-300 z-[100]
    md:translate-x-0
    {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:w-[300px]"
>
  <div class="flex justify-between items-center mb-6 md:hidden">
    <h1 class="text-2xl gradient-text">hehepgame</h1>
    <button on:click={() => (sidebarOpen = false)} aria-label="close">
      <i class="fa fa-x text-xl text-white"></i>
    </button>
  </div>

  <div class="flex items-center justify-between">
    <button
      class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
      on:click={() => (
        (showWalletDialog = true), (showTopNavLoginDropDown = false)
      )}
    >
      <i class="fa fa-wallet"></i>
      {!user.isLoggedIn ? "Wallet" : formatMoney(user.data.balance)}
    </button>

    {#if user.isLoggedIn}
      <button
        class="relative text-white"
        on:click={() => (
          (showNotificationsDialog = true), (showTopNavLoginDropDown = false)
        )}
      >
        <i class="fa fa-bell"></i>
        <span
          class="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1"
          >3</span
        >
      </button>
    {/if}
  </div>

  <nav class="space-y-6">
    <ul class="space-y-2">
      <li>
        <a
          href="/"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white {pathname ===
          '/'
            ? 'bg-gradient-to-r from-green-400/30 to-white/20 text-white'
            : ''}">🏠 Home</a
        >
      </li>
      <li>
        <a
          href="/profile"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white {pathname ===
          '/profile'
            ? 'bg-gradient-to-r from-green-400/30 to-white/20 text-white'
            : ''}">👨🏾‍💼 Profile</a
        >
      </li>
    </ul>

    <div>
      <div class="gradient-text font-bold mb-2">🤝🏾 Quickplays</div>
      <div class="flex flex-wrap gap-3">
        {#each [{ icon: "💣", tip: "Boom Games" }, { icon: "🎃", tip: "Ghost Games" }, { icon: "🎁", tip: "Win Presents" }, { icon: "🎯", tip: "Lucky Play" }, { icon: "🎡", tip: "Spin me" }, { icon: "🏆", tip: "Rewards" }] as quickplay}
          <div class="relative group">
            <a
              href="#/1"
              class="text-2xl md:text-3xl bg-[#202020] p-2 rounded-2xl block hover:bg-[#2a2a2a]"
              >{quickplay.icon}</a
            >
            <span
              class="absolute invisible group-hover:visible bg-white/30 backdrop-blur-sm p-2 rounded-md text-xs md:text-sm text-white -top-2 left-14 whitespace-nowrap z-10"
            >
              {quickplay.tip}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <ul class="space-y-2">
      <li>
        <a
          href="#/1"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white {pathname ===
          '/link'
            ? 'bg-gradient-to-r from-green-400/30 to-white/20 text-white'
            : ''}">💰 Slots</a
        >
      </li>
      <li>
        <button
          class="block w-full text-left px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white"
          on:click={() => (
            (showSettingsDialog = true), (showTopNavLoginDropDown = false)
          )}>⚙ Settings</button
        >
      </li>
    </ul>
  </nav>
</aside>

<!-- Main -->
<main class="px-1 md:px-4 pt-24 space-y-10 md:ml-[300px]">
  <slot />
</main>

<Dialog bind:open={showNotificationsDialog}>
  <Notifications />
</Dialog>

<Dialog bind:open={showSettingsDialog}>
  <Settings />
</Dialog>

<Dialog bind:open={showWalletDialog}>
  <Wallet />
</Dialog>
