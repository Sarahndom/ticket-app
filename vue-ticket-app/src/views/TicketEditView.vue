<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink, useRoute } from 'vue-router';
import { getTicket, updateTicket } from '../../../shared-assets/api.js';
import { useToast } from "vue-toastification";
import AppHeader from '../components/AppHeader.vue';

const router = useRouter();
const route = useRoute(); // This gets info about the current URL
const toast = useToast();
const ticketId = route.params.ticketId; // Get ID from URL

const title = ref('');
const status = ref('open');
const priority = ref('medium');
const description = ref('');
const error = ref('');

// 1. Load the ticket's data when the page opens
onMounted(() => {
  try {
    const ticket = getTicket(ticketId);
    if (ticket) {
      title.value = ticket.title;
      status.value = ticket.status;
      priority.value = ticket.priority;
      description.value = ticket.description || '';
    } else {
      toast.error('Ticket not found');
      router.push('/tickets');
    }
  } catch (err) {
    toast.error(err.message);
    router.push('/tickets');
  }
});

// 2. Handle the form submit
const handleSubmit = () => {
  error.value = '';

  if (title.value === '' || status.value === '') {
    error.value = 'Title and status are mandatory.';
    toast.error('Title and status are mandatory.');
    return;
  }

  try {
    updateTicket(ticketId, {
      title: title.value,
      status: status.value,
      priority: priority.value,
      description: description.value
    });
    toast.success('Ticket updated successfully!');
    router.push('/tickets');
  } catch (err) {
    error.value = err.message;
    toast.error(err.message);
  }
};
</script>

<template>
  <AppHeader />
  <main class="container">
    <div class="form-container" style="max-width: 700px; margin: 2rem auto;">
      <form @submit.prevent="handleSubmit">
        <h2 style="margin-bottom: 1.5rem;">Edit Ticket #{{ ticketId }}</h2>

        <p v-if="error" class="error-inline" style="margin-bottom: 1rem;">{{ error }}</p>

        <div class="form-group">
          <label for="title">Title (Mandatory)</label>
          <input
            type="text"
            id="title"
            class="form-control"
            v-model="title"
          />
        </div>

        <div class="form-group">
          <label for="status">Status (Mandatory)</label>
          <select id="status" class="form-control" v-model="status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="priority">Priority (Optional)</label>
          <select id="priority" class="form-control" v-model="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea
            id="description"
            class="form-control"
            v-model="description"
          ></textarea>
        </div>

        <div style="display: flex; gap: 1rem;">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <RouterLink to="/tickets" class="btn btn-secondary">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </main>
</template>