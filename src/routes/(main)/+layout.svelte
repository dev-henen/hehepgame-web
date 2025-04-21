<script>
  let search = "";
  let sidebarOpen = false;
</script>

<!-- Navbar -->
<nav
  class="fixed top-0 left-0 flex items-center bg-[#171618] w-full p-4 z-50 md:left-[300px] md:w-[calc(100%-300px)]"
>
  <button
    class="md:hidden mr-4"
    on:click={() => (sidebarOpen = !sidebarOpen)}
    aria-label="Menu"
  >
    <i class="fa fa-bars text-2xl text-white"></i>
  </button>

  <div class="flex-1">
    <h1 class="text-2xl md:text-3xl font-bold gradient-text">hehepgame</h1>
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

  <div class="hidden md:flex md:w-1/4 justify-end gap-2">
    <a
      href="/auth/login"
      class="text-green-400 font-bold px-4 py-2 rounded-full hover:bg-white/20"
      >Sign in</a
    >
    <a
      href="/auth/signup"
      class="bg-green-600 text-white font-bold px-4 py-2 rounded-full hover:bg-green-500 hover:text-white/80"
      >Sign up</a
    >
  </div>
</nav>

<!-- Sidebar -->
<aside
  class="fixed top-0 left-0 w-[250px] h-full bg-[#131214] shadow-lg p-4 space-y-6 transform transition-transform duration-300 z-40
    md:translate-x-0
    {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:w-[300px]"
>
  <div class="flex justify-between items-center mb-6 md:hidden">
    <h1 class="text-2xl gradient-text">OGAMB</h1>
    <button on:click={() => (sidebarOpen = false)} aria-label="close">
      <i class="bi bi-x-lg text-xl text-white"></i>
    </button>
  </div>

  <div>
    <a
      href="#/1"
      class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
    >
      <i class="fa fa-wallet"></i> Wallet
    </a>
  </div>

  <nav class="space-y-6">
    <ul class="space-y-2">
      <li>
        <a
          href="/"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-gradient-to-r from-green-400/30 to-white/20 hover:text-white"
          >🏠 Home</a
        >
      </li>
      <li>
        <a
          href="/profile"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white"
          >👨🏾‍💼 Profile</a
        >
      </li>
      <li>
        <a
          href="#/1"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white"
          >🎁 BC Originals</a
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
              class="absolute invisible group-hover:visible bg-white/30 backdrop-blur-sm p-2 rounded-md text-xs md:text-sm text-white -top-2 left-14 whitespace-nowrap"
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
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white"
          >💰 Lottery</a
        >
      </li>
      <li>
        <a
          href="#/1"
          class="block px-4 py-2 rounded-r-full text-gray-400 hover:bg-white/10 hover:text-white"
          >⚙ Settings</a
        >
      </li>
    </ul>
  </nav>
</aside>

<!-- Main -->
<main class="pt-24 p-4 space-y-10 md:ml-[300px]">
  <slot />
</main>
