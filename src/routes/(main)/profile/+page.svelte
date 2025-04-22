<script lang="ts">
  import { notify } from "$lib/notification";

  export let data;

  const user = data.user;

  let isEditing: boolean = false;
  let name: string = user.data.name || "";
  let email: string = user.data.email || "";
  let birthday: string = user.data.dateOfBirth
    ? new Date(user.data.dateOfBirth).toISOString().split("T")[0]
    : "";
  let formattedBirthday: string = user.data.dateOfBirth
    ? new Date(user.data.dateOfBirth).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  let phone: string = "+1234567890";
  let error: string = "";
  let isBusy: boolean = false;

  function toggleEdit() {
    isEditing = !isEditing;
  }

  async function handleUpdate() {
    error = ""; // Reset error message

    if (
      name === user.data.name &&
      birthday ===
        (new Date(user.data.dateOfBirth).toISOString().split("T")[0] || "")
    ) {
      notify("No changes detected!");
      return;
    }

    try {
      isBusy = true; // Set busy state
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          dateOfBirth: birthday,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        notify("Changes updated successfully!");
        isEditing = false; // Exit edit mode
      } else {
        error = data.message || data.error || "Failed to update account";
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while update your account.");
    } finally {
      isBusy = false; // Reset busy state
    }
  }
</script>

<div class="p-4 sm:p-6 text-white">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl sm:text-3xl font-bold">Profile</h1>
    <button class="button" on:click={toggleEdit}>
      {isEditing ? "Cancel" : "Edit Profile"}
    </button>
  </div>

  <div class="bg-[#131214] rounded-2xl shadow-lg p-6 space-y-6 max-w-3xl">
    <div class="text-red-500">{error}</div>
    <!-- Profile Fields -->
    <div class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-gray-400 mb-1" for="name">Name</label>
        {#if isEditing}
          <input
            id="name"
            type="text"
            bind:value={name}
            class="input"
            disabled={isBusy}
          />
        {:else}
          <p class="text-lg">{name}</p>
        {/if}
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-400 mb-1" for="email">Email</label>
        <p class="text-lg" id="email">{email}</p>
        <!-- Email is never editable -->
      </div>

      <!-- Phone -->
      <!-- <div>
        <label class="block text-gray-400 mb-1" for="phone">Phone</label>
        {#if isEditing}
          <input id="phone" type="tel" bind:value={phone} class="input" disabled={isBusy} />
        {:else}
          <p class="text-lg">{phone}</p>
        {/if}
      </div> -->

      <!-- Birthday -->
      <div>
        <label class="block text-gray-400 mb-1" for="birthday">Birthday</label>
        {#if isEditing}
          <input
            id="birthday"
            type="date"
            bind:value={birthday}
            class="input"
            disabled={isBusy}
          />
        {:else}
          <p class="text-lg">{formattedBirthday}</p>
        {/if}
      </div>
    </div>

    {#if isEditing}
      <!-- Save button appears only when editing -->
      <div class="flex justify-end pt-4">
        <button class="button" on:click={handleUpdate} disabled={isBusy}>
          Save Changes
        </button>
      </div>
    {/if}
  </div>
</div>
