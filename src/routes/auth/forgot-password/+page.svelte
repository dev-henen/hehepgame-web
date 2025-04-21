<script>
  let email = "";
</script>

<svelte:head>
  <title>Forgot Password - hehepgame</title>
  <meta name="description" content="Reset your password on hehepgame" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
    <h2 class="text-3xl font-bold text-white text-center">Forgot Password</h2>
    <p class="text-gray-400 text-center">
      Enter your registered email to receive OTP
    </p>

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

      <button
        type="submit"
        class="w-full button secondary"
      >
        Send OTP
      </button>
    </div>

    <div class="text-center text-gray-400">
      Remember your password?
      <a href="/auth/login" class="text-green-500 hover:underline">Login</a>
    </div>
  </div>
</div>
