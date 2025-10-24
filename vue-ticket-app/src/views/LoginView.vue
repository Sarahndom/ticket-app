<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useToast } from "vue-toastification";

// Import the "BRAIN" (Note: the path is ../../../)
import { login } from '../../../shared-assets/api.js';

// Setup state and tools
const email = ref('test@user.com'); // Pre-filled for testing
const password = ref('password123'); // Pre-filled for testing
const error = ref('');
const router = useRouter();
const toast = useToast();

const handleSubmit = () => {
  error.value = ''; // Clear old errors

  // Validation
  if (email.value === '' || password.value === '') {
    error.value = 'Email and password are required.';
    return;
  }

  // Call the "Brain"
  const result = login(email.value, password.value);

  if (result.success) {
    toast.success('Login Successful!');
    router.push('/dashboard'); // Redirect
  } else {
    error.value = result.message; // Show inline error
    toast.error(result.message); // Show toast error
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h2 style="text-align: center; margin-bottom: 1.5rem;">Login</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
        />
      </div>

      <p v-if="error" class="error-inline">{{ error }}</p>

      <button type="submit" class="btn btn-primary" style="width: 100%;">
        Login
      </button>

      <p style="margin-top: 1rem; text-align: center;">
        No account? <RouterLink to="/auth/signup">Sign Up</RouterLink>
      </p>
    </form>
  </div>
  <footer style="position: absolute; bottom: 0; width: 100%;">
    <div class="container">
      <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
    </div>
  </footer>
</template>