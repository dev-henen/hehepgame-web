<script>
  let isEditing = false;
  let name = "John Doe";
  let email = "johndoe@example.com";
  let birthday = "1995-05-15";
  let phone = "+1234567890";

  function toggleEdit() {
    isEditing = !isEditing;
  }

  function saveChanges() {
    isEditing = false;
    // Save logic here
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
    <!-- Profile Fields -->
    <div class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-gray-400 mb-1" for="name">Name</label>
        {#if isEditing}
          <input id="name" type="text" bind:value={name} class="input" />
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
      <div>
        <label class="block text-gray-400 mb-1" for="phone">Phone</label>
        {#if isEditing}
          <input id="phone" type="tel" bind:value={phone} class="input" />
        {:else}
          <p class="text-lg">{phone}</p>
        {/if}
      </div>

      <!-- Birthday -->
      <div>
        <label class="block text-gray-400 mb-1" for="birthday">Birthday</label>
        {#if isEditing}
          <input
            id="birthday"
            type="date"
            bind:value={birthday}
            class="input"
          />
        {:else}
          <p class="text-lg">{birthday}</p>
        {/if}
      </div>
    </div>

    {#if isEditing}
      <!-- Save button appears only when editing -->
      <div class="flex justify-end pt-4">
        <button class="button" on:click={saveChanges}> Save Changes </button>
      </div>
    {/if}
  </div>
</div>
