<script lang="ts">
  import { notify } from "$lib/notification";

  let email = "";
  let password = "";
  let error: string = "";
  let isBusy: boolean = false;

  async function handleLogin() {
    error = ""; // Reset error message

    try {
        isBusy = true; // Set busy state
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
    
        const data = await response.json();
    
        if (response.status === 200) {
            notify("Login successful!");
            window.location.replace('/');
        } else {
            error = data.message || data.error || "Failed to log you in.";
        }
    } catch(e) {
        console.error(e);
        notify("An error occurred while logging your account in.");
    } finally {
        isBusy = false; // Reset busy state
    }
  }
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

    <div class="text-red-500 text-sm"> {error} </div>

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
          disabled={isBusy}
        />
      </div>
      <div>
        <a href="/auth/forgot-password" class="text-green-500 hover:underline">Forgot password?</a>
      </div>

      <button type="submit" class="w-full button secondary" on:click={handleLogin} disabled={isBusy}> Log In </button>
    </div>

    <div class="text-center text-gray-400">
      Don't have an account?
      <a href="/auth/signup" class="text-green-500 hover:underline">Sign up</a>
    </div>
  </div>
</div>
