<script lang="ts">
  import { notify } from "$lib/notification";
  import { goto } from "$app/navigation";

  let username: string = "";
  let email: string = "";
  let password = "";
  let confirmPassword: string = "";
  let birthday: string = "";
  let error: string = "";
  let isBusy: boolean = false;

  async function handleSignup() {
    error = ""; // Reset error message

    if (password !== confirmPassword) {
        error = "Passwords do not match!";
      return;
    }

    try {
        isBusy = true; // Set busy state
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            dateOfBirth: birthday,
          }),
        });
    
        const data = await response.json();
    
        if (response.status === 201) {
            notify("Account created successfully! Please check your email for verification.");
            goto("/auth/verify-otp", { replaceState: true });
        } else {
            error = data.message || data.error || "Failed to create account";
        }
    } catch(e) {
        console.error(e);
        notify("An error occurred while creating the account.");
    } finally {
        isBusy = false; // Reset busy state
    }
  }
</script>

<svelte:head>
  <title>Sign Up - hehepgame</title>
  <meta name="description" content="Create a new account on hehepgame" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-[#0B0E11] p-4">
  <div
    class="md:bg-[#131214] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
  >
    <div class="text-2xl">
      <a href="/" class="gradient-text">hehepgame</a>
    </div>
    <h2 class="text-3xl font-bold text-white">Create your account</h2>

    <div class="text-red-500 text-sm"> {error} </div>

    <div class="space-y-4">
      <!-- username -->
      <div class="relative">
        <i
          class="fa-solid fa-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input
          type="text"
          placeholder="Username"
          bind:value={username}
          class="pl-12 input"
          required
          disabled={isBusy}
        />
      </div>

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

      <!-- Birthday -->
      <div class="relative">
        <i
          class="fa-solid fa-calendar-days absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <input type="date" bind:value={birthday} class="pl-12 input" required disabled={isBusy} />
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

      <button type="submit" class="w-full button secondary" on:click={handleSignup} disabled={isBusy}> Sign Up </button>
    </div>

    <div class="text-center text-gray-400">
      Already have an account?
      <a href="/auth/login" class="text-green-500 hover:underline">Log in</a>
    </div>
  </div>
</div>
