<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getTicketStats } from '../../../shared-assets/api.js';

// Import our shared header component
import AppHeader from '../components/AppHeader.vue';

const stats = ref({ total: 0, open: 0, inProgress: 0, closed: 0 });

// onMounted is the Vue version of React's useEffect
onMounted(() => {
  stats.value = getTicketStats();
});
</script>

<template>
  <AppHeader />
  <main class="container">
    <div class="page-header">
      <h1>Dashboard</h1>
      <RouterLink to="/tickets/new" class="btn btn-primary">Create New Ticket</RouterLink>
    </div>

    <p style="margin-bottom: 1.5rem;">Welcome! Here's a summary of your tickets.</p>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Tickets</h3>
        <p>{{ stats.total }}</p>
      </div>
      <div class="stat-card">
        <h3>Open Tickets</h3>
        <p style="color: #28a745;">{{ stats.open }}</p>
      </div>
      <div class="stat-card">
        <h3>In Progress</h3>
        <p style="color: #ffc107;">{{ stats.inProgress }}</p>
      </div>
      <div class="stat-card">
        <h3>Closed Tickets</h3>
        <p style="color: #6c757d;">{{ stats.closed }}</p>
      </div>
    </div>
  </main>
  <footer style="margin-top: 4rem;">
    <div class="container">
      <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
    </div>
  </footer>
</template>