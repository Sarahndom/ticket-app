<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getTickets, deleteTicket } from '../../../shared-assets/api.js';
import { useToast } from "vue-toastification";
import AppHeader from '../components/AppHeader.vue';

const tickets = ref([]);
const toast = useToast();

// Function to load tickets from the "Brain"
const loadTickets = () => {
  tickets.value = getTickets();
};

// Load tickets when the page first opens
onMounted(() => {
  loadTickets();
});

// Handle the delete button click
const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    try {
      deleteTicket(id);
      toast.success('Ticket deleted successfully!');
      loadTickets(); // Refresh the list
    } catch (error) {
      toast.error(error.message);
    }
  }
};
</script>

<template>
  <AppHeader />
  <main class="container">
    <div class="page-header">
      <h1>Ticket Management</h1>
      <RouterLink to="/tickets/new" class="btn btn-primary">Create New Ticket</RouterLink>
    </div>

    <div class="ticket-list">
      <p v-if="tickets.length === 0">No tickets found. Create one!</p>

      <div v-for="ticket in tickets" :key="ticket.id" :class="`ticket-card status-${ticket.status}`">
        <div>
          <h3>{{ ticket.title }}</h3>
          <p>{{ ticket.description || 'No description provided.' }}</p>
        </div>
        <div>
          <span :class="`status-tag status-tag-${ticket.status}`">
            {{ ticket.status.replace('_', ' ') }}
          </span>
          <div class="ticket-card-actions">
            <RouterLink :to="`/tickets/edit/${ticket.id}`" class="btn btn-secondary" style="padding: 0.25rem 0.75rem;">Edit</RouterLink>
            <button @click="handleDelete(ticket.id)" class="btn btn-danger" style="padding: 0.25rem 0.75rem;">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer style="margin-top: 4rem;">
    <div class="container">
      <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
    </div>
  </footer>
</template>