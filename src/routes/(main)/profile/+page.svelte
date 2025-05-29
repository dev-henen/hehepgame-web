<script lang="ts">
  import { notify } from "$lib/notification";

  export let data;
  const user = data.user;

  let isEditing = false;
  let isBusy = false;
  let error = "";

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

  function toggleEdit() {
    isEditing = !isEditing;
  }

  async function handleUpdate() {
    error = "";

    if (
      name === user.data.name &&
      birthday ===
        (new Date(user.data.dateOfBirth).toISOString().split("T")[0] || "")
    ) {
      notify("No changes detected!");
      return;
    }

    try {
      isBusy = true;
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dateOfBirth: birthday }),
      });

      const data = await response.json();

      if (response.status === 201) {
        notify("Changes updated successfully!");
        isEditing = false;
      } else {
        error = data.message || data.error || "Failed to update account";
      }
    } catch (e) {
      console.error(e);
      notify("An error occurred while updating your account.");
    } finally {
      isBusy = false;
    }
  }
</script>

<section class="max-w-4xl p-2 md:p-6 text-white space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl sm:text-3xl font-bold flex items-center gap-2">
      <i class="fa-solid fa-user text-blue-400"></i> Profile
    </h1>
    <button class="button flex items-center gap-2" on:click={toggleEdit}>
      <i class={`fa-solid ${isEditing ? "fa-xmark" : "fa-pen-to-square"}`}></i>
      {isEditing ? "Cancel" : "Edit Profile"}
    </button>
  </div>

  <div class="bg-[#131214] rounded-2xl p-6 shadow-lg grid sm:grid-cols-2 gap-6">
    <!-- Error Message -->
    {#if error}
      <div class="sm:col-span-2 text-red-500 flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation"></i> {error}
      </div>
    {/if}

    <!-- Name -->
    <div>
      <label class="block text-sm text-gray-400 mb-1">
        <i class="fa-solid fa-signature mr-1"></i> Name
      </label>
      {#if isEditing}
        <input
          type="text"
          bind:value={name}
          class="input w-full"
          disabled={isBusy}
        />
      {:else}
        <p class="text-lg">{name}</p>
      {/if}
    </div>

    <!-- Email -->
    <div>
      <label class="block text-sm text-gray-400 mb-1">
        <i class="fa-solid fa-envelope mr-1"></i> Email
      </label>
      <p class="text-lg text-gray-300">{email}</p>
    </div>

    <!-- Birthday -->
    <div>
      <label class="block text-sm text-gray-400 mb-1">
        <i class="fa-solid fa-cake-candles mr-1"></i> Birthday
      </label>
      {#if isEditing}
        <input
          type="date"
          bind:value={birthday}
          class="input w-full"
          disabled={isBusy}
        />
      {:else}
        <p class="text-lg">{formattedBirthday}</p>
      {/if}
    </div>
  </div>

  {#if isEditing}
    <div class="flex justify-end">
      <button
        class="button bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        on:click={handleUpdate}
        disabled={isBusy}
      >
        <i class="fa-solid fa-floppy-disk"></i> Save Changes
      </button>
    </div>
  {/if}
</section>
