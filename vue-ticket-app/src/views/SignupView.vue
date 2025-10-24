<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useToast } from "vue-toastification";
import { signup } from '../../../shared-assets/api.js';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const toast = useToast();

const handleSubmit = () => {
  error.value = '';

  if (email.value === '' || password.value === '') {
    error.value = 'Email and password are required.';
    return;
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.';
    return;
  }

  try {
    const result = signup(email.value, password.value);

    if (result.success) {
      toast.success(result.message);
      router.push('/dashboard'); // Redirect
    } else {
      error.value = result.message;
      toast.error(result.message);
    }
  } catch (err) {
    error.value = err.message;
    toast.error(err.message);
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h2 style="text-align: center; margin-bottom: 1.5rem;">Get Started</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="email"
          placeholder="your@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
          placeholder="6+ characters"
        />
      </div>

      <p v-if="error" class="error-inline">{{ error }}</p>

      <button type="submit" class="btn btn-primary" style="width: 100%;">
        Create Account
      </button>

      <p style="margin-top: 1rem; text-align: center;">
        Already have an account? <RouterLink to="/auth/login">Login</RouterLink>
      </p>
    </form>
  </div>
  <footer style="position: absolute; bottom: 0; width: 100%;">
    <div class="container">
      <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
    </div>
  </footer>
</template>