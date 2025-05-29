<script lang="ts">
  let settings = {
    profile: true,
    notifications: false,
    security: true,
  };

  function toggleSetting(key: keyof typeof settings) {
    settings[key] = !settings[key];
  }
</script>

<section class="max-w-xl p-2 md:p-6 bg-[#131214] text-white rounded-2xl shadow-lg space-y-6">
  <h2 class="text-2xl font-bold mb-4">
    <i class="fa-solid fa-gear mr-2 text-blue-400"></i> Settings
  </h2>

  <!-- Profile Settings -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <i class="fa-solid fa-user text-lg text-green-400"></i>
      <span>Profile Visibility</span>
    </div>
    <button class="button" on:click={() => toggleSetting('profile')}>
      {settings.profile ? "On" : "Off"}
    </button>
  </div>

  <!-- Notifications -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <i class="fa-solid fa-bell text-lg text-yellow-400"></i>
      <span>Notifications</span>
    </div>
    <button class="button" on:click={() => toggleSetting('notifications')}>
      {settings.notifications ? "On" : "Off"}
    </button>
  </div>

  <!-- Security -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <i class="fa-solid fa-shield-halved text-lg text-red-400"></i>
      <span>Two-Factor Auth</span>
    </div>
    <button class="button" on:click={() => toggleSetting('security')}>
      {settings.security ? "On" : "Off"}
    </button>
  </div>
</section>
