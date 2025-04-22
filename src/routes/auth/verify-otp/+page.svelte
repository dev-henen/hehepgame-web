<script lang="ts">
  import { notify } from "$lib/notification";

  let otp = "";
  let error: string = "";
  let isBusy: boolean = false;

  async function handleVerification() {
    error = ""; // Reset error message

    try {
      isBusy = true; // Set busy state
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.status === 200) {
        notify("Account verification successful!");
        window.location.replace("/");
      } else {
        error =
          data.message || data.error || "Failed to verify account.";
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while verifying your account.");
    } finally {
      isBusy = false; // Reset busy state
      otp = ""; // Clear OTP input
    }
  }

  async function handleResend() {
    error = ""; // Reset error message

    try {
      isBusy = true; // Set busy state
      const response = await fetch("/api/auth/request-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.status === 200) {
        notify("OTP resent successfully!");
      } else {
        error = data.message || data.error || "Failed to resend OTP";
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while resending the OTP.");
    } finally {
      isBusy = false; // Reset busy state
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div
    class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
  >
    <h2 class="text-3xl font-bold text-white text-center">Verify OTP</h2>
    <p class="text-gray-400 text-center">Enter the OTP sent to your email</p>

    <div class="text-red-500 text-sm text-center">{error}</div>

    <div class="space-y-4">
      <!-- OTP -->
      <div class="relative">
        <i
          class="fa-solid fa-key absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="text"
          placeholder="Enter OTP"
          bind:value={otp}
          maxlength="6"
          class="pl-12 input"
          required
          disabled={isBusy}
        />
      </div>

      <button
        type="submit"
        class="w-full button secondary"
        disabled={isBusy}
        on:click={handleVerification}
      >
        Verify OTP
      </button>
    </div>

    <div class="text-center text-gray-400">
      Didn't receive the code?
      <button class="text-green-500 hover:underline" on:click={handleResend}
        >Resend</button
      >
    </div>
  </div>
</div>
