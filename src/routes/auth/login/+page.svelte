<script>
  let email = "";
  let password = "";
</script>

<svelte:head>
  <title>Log In - hehepgame</title>
  <meta name="description" content="Log in to your hehepgame account" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div
    class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
  >
    <div class="text-2xl">
      <a href="/" class="gradient-text">hehepgame</a>
    </div>
    <h2 class="text-3xl font-bold text-white">Log In</h2>

    <div class="space-y-4">
      <!-- Email -->
      <div class="relative">
        <i
          class="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="email"
          placeholder="Email"
          bind:value={email}
          class="pl-12 input"
          required
        />
      </div>

      <!-- Password -->
      <div class="relative">
        <i
          class="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="pl-12 input"
          required
        />
      </div>
      <div>
        <a href="/auth/forgot-password" class="text-green-500 hover:underline">Forgot password?</a>
      </div>

      <button type="submit" class="w-full button secondary"> Log In </button>
    </div>

    <div class="text-center text-gray-400">
      Don't have an account?
      <a href="/auth/signup" class="text-green-500 hover:underline">Sign up</a>
    </div>
  </div>
</div>
