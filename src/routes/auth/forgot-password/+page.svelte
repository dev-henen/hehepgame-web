<script lang="ts">
  import { notify } from "$lib/notification";

  let email = "";
  let error: string = "";
  let isBusy: boolean = false;
  let verificationSent: boolean = false;

  async function handleForgotPassword() {
    error = ""; // Reset error message

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = "Please enter a valid email address.";
      return;
    }

    try {
      isBusy = true; // Set busy state
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        notify(data.message || "Account verification successful!");
        verificationSent = true; // Set verification sent state
      } else {
        error =
          data.message || data.error || "Failed to verify account";
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while verifying your account.");
    } finally {
      isBusy = false; // Reset busy state
    }
  }
</script>

<svelte:head>
  <title>Forgot Password - hehepgame</title>
  <meta name="description" content="Reset your password on hehepgame" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
    <h2 class="text-3xl font-bold text-white text-center">Forgot Password</h2>
    
    <div class="text-red-500 text-sm text-center">{error}</div>

    {#if verificationSent} 
      <div class="text-green-500 text-sm text-center">
        Verification email sent! Please check your inbox.
      </div>
    {:else}
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
          disabled={isBusy}
        />
      </div>

      <button
        type="submit"
        class="w-full button secondary"
        on:click={handleForgotPassword}
        disabled={isBusy}
      >
        Send OTP
      </button>
    </div>

    <div class="text-center text-gray-400">
      Remember your password?
      <a href="/auth/login" class="text-green-500 hover:underline">Login</a>
    </div>
    {/if}
  </div>
</div>
