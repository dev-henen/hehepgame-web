<script lang="ts">
  import { notify } from "$lib/notification";
  import { goto } from "$app/navigation";

  export let data;
  const token: string = data.token;

  let newPassword: string = "";
  let confirmPassword: string = "";
  let error: string = "";
  let isBusy: boolean = false;

  async function handleCreatePassword() {
    error = ""; // Reset error message

    if(newPassword !== confirmPassword) {
      error = 'Passwords does not match.';
    }

    try {
      isBusy = true; // Set busy state
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.status === 200) {
        notify("Password reset successfully! Please login.");
        goto('/auth/login');
      } else {
        error =
          data.message || data.error || "Failed to reset your password.";
        confirmPassword = ""; // Clear confirm password field
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while resetting your password.");
    } finally {
      isBusy = false; // Reset busy state
    }
  }
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
    
    <div class="text-red-500 text-sm text-center">{error}</div>

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
          disabled={isBusy}
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
          disabled={isBusy}
        />
      </div>

      <button
        type="submit"
        class="w-full button secondary"
        on:click={handleCreatePassword}
        disabled={isBusy}
      >
        Reset Password
      </button>
    </div>
<!-- 
    <div class="text-center text-gray-400">
      <a href="/login" class="text-green-500 hover:underline">Back to Login</a>
    </div> -->
  </div>
</div>
