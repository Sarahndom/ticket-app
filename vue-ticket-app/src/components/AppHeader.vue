<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '../../../shared-assets/api.js';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/'); // Redirect to landing page
};
</script>

<template>
  <nav class="app-nav">
    <div class="container">
      <RouterLink to="/dashboard" class="app-nav-logo">TicketApp</RouterLink>
      <ul>
        <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
        <li><RouterLink to="/tickets">Tickets</RouterLink></li>
        <li><button @click="handleLogout" class="btn btn-secondary">Logout</button></li>
      </ul>
    </div>
  </nav>
</template>