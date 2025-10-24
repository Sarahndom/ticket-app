<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="hero">
    <div class="deco-circle circle-hero-overlap"></div>

    <div class="container hero-content">
      <h1>Welcome to TicketApp</h1>
      <p>Your one-stop solution for managing all your support tickets.</p>
      <div>
        <RouterLink to="/auth/login" class="btn btn-primary" style="margin-right: 1rem;">Login</RouterLink>
        <RouterLink to="/auth/signup" class="btn btn-secondary">Get Started</RouterLink>
      </div>
    </div>

    <img
      src="../../../shared-assets/hero-wave.svg"
      alt=""
      class="hero-wave"
    />
  </div>

  <div class="features">
    <div class="container">
      <h2>Why Choose Us?</h2>
      <div class="features-grid">
        <div class="feature-box">
          <h3>Manage Tickets</h3>
          <p>Full Create, Read, Update, and Delete functionality for all your tickets.</p>
        </div>
        <div class="feature-box">
          <h3>See Stats</h3>
          <p>A simple, high-level dashboard to see your team's progress at a glance.</p>
        </div>
        <div class="feature-box">
          <h3>Secure & Fast</h3>
          <p>Your data is safe with our secure (simulated) authentication.</p>
        </div>
      </div>
    </div>

    <div class="deco-circle circle-content"></div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; 2025 HNG TicketApp. All rights reserved.</p>
    </div>
  </footer>
</template>