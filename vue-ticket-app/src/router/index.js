// vue-ticket-app/src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from "vue-toastification";

// Import the "Brain"
import { isLoggedIn } from '../../../shared-assets/api.js'

// Import all your pages (we will create these next)
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import TicketsView from '../views/TicketsView.vue'
import TicketNewView from '../views/TicketNewView.vue'
import TicketEditView from '../views/TicketEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- Public Routes ---
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView
    },

    // --- Protected Routes (Must be logged in) ---
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // This tells the router to protect it
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets/new',
      name: 'ticket-new',
      component: TicketNewView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets/edit/:ticketId', // The :ticketId is a URL parameter
      name: 'ticket-edit',
      component: TicketEditView,
      meta: { requiresAuth: true }
    }
  ]
})

// This is the "Navigation Guard" (REQUIRED)
// It runs before every single page load
router.beforeEach((to, from, next) => {
  const needsAuth = to.meta.requiresAuth;
  const toast = useToast();

  if (needsAuth && !isLoggedIn()) {
    // If user is not logged in and tries to access a protected page
    toast.error("Your session has expired — please log in again.");
    next('/auth/login'); // Redirect to login
  } else {
    // Otherwise, let them go
    next();
  }
});

export default router
