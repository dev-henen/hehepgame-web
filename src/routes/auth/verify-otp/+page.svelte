<script lang="ts">
  let otp = "";
</script>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
    <h2 class="text-3xl font-bold text-white text-center">Verify OTP</h2>
    <p class="text-gray-400 text-center">Enter the OTP sent to your email</p>

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
        />
      </div>

      <button type="submit" class="w-full button secondary">
        Verify OTP
      </button>
    </div>

    <div class="text-center text-gray-400">
      Didn't receive the code?
      <button class="text-green-500 hover:underline">Resend</button>
    </div>
  </div>
</div>
