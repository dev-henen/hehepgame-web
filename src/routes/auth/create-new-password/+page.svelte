<script>
  let newPassword = "";
  let confirmPassword = "";
</script>

<svelte:head>
  <title>Create New Password</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div
    class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
  >
    <h2 class="text-3xl font-bold text-white text-center">
      Create New Password
    </h2>
    <p class="text-gray-400 text-center">Enter your new password below</p>

    <div class="space-y-4">
      <!-- New Password -->
      <div class="relative">
        <i
          class="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="password"
          placeholder="New Password"
          bind:value={newPassword}
          class="pl-12 input"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="relative">
        <i
          class="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="password"
          placeholder="Confirm Password"
          bind:value={confirmPassword}
          class="pl-12 input"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full button secondary"
      >
        Reset Password
      </button>
    </div>

    <div class="text-center text-gray-400">
      <a href="/login" class="text-green-500 hover:underline">Back to Login</a>
    </div>
  </div>
</div>
