import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@store/auth';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@pages/HomePage.vue'), 
    meta: { breadcrumb: 'Home', title: 'Home' },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@pages/LoginPage.vue'),
    meta: { breadcrumb: 'Login', title: 'Login' },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@pages/RegisterPage.vue'),
    meta: { breadcrumb: 'Register', title: 'Register' },
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: () => import('@pages/DashboardPage.vue'),
    meta: { breadcrumb: 'Dashboard', title: 'Dashboard' },
    // children: [
    //   {
    //     path: 'booking',
    //     name: 'BookingPage',
    //     component: () => import('@pages/BookingPage.vue'),
    //     meta: { breadcrumb: 'Booking' },
    //   }
    // ]
  },
  {
    path: '/admin/profile',
    name: 'ProfileView',
    component: () => import('@pages/profile/ProfileView.vue'),
    meta: { breadcrumb: 'Profile', title: 'Profile' },
    children: [
      {
        path: '',
        name: 'ProfilePage',
        component: () => import('@pages/profile/ProfilePage.vue'),
        meta: { title: 'Profile' },
      },
      {
        path: 'edit',
        name: 'ProfileEditPage',
        component: () => import('@pages/profile/ProfileEditPage.vue'),
        meta: { breadcrumb: 'Edit' ,title: 'Edit Profile' },
      }
    ]
  },
  // {
  //   path: '/admin/profile',
  //   name: 'ProfilePage',
  //   component: () => import('@pages/profile/ProfilePage.vue'),
  //   meta: { breadcrumb: 'Profile', title: 'Profile' },
  //   children: [
  //     {
  //       path: 'edit',
  //       name: 'ProfileEditPage',
  //       component: () => import('@pages/profile/ProfileEditPage.vue'),
  //       meta: { breadcrumb: 'Edit' },
  //     }
  //   ]
  // },
  // {
  //   path: '/admin/customer',
  //   name: 'CustomerPage',
  //   component: () => import('@pages/customer/CustomerPage.vue'),
  //   meta: { breadcrumb: 'Customer', title: 'Customer' },
  // },
  {
    path: '/admin/customer',
    name: 'CustomerView',
    component: () => import('@pages/customer/CustomerView.vue'),
    meta: { breadcrumb: 'Customer', title: 'Customer' },
    children: [
      {
        path: '',
        name: 'CustomerPage',
        component: () => import('@pages/customer/CustomerPage.vue'),
        meta: { title: 'Customer' },
      },
    ]
  },
  {
    path: '/admin/booking',
    name: 'BookingPage',
    component: () => import('@pages/BookingPage.vue'),
    meta: { breadcrumb: 'Booking', title: 'Booking' },
  },
  {
    path: '/admin/billing',
    name: 'BillingPage',
    component: () => import('@pages/BillingPage.vue'),
    meta: { breadcrumb: 'Billing', title: 'Billing' },
  },
  {
    path: '/admin/discount',
    name: 'DiscountPage',
    component: () => import('@pages/DiscountPage.vue'),
    meta: { breadcrumb: 'Discount', title: 'Discount' },
  },
  {
    path: '/admin/vehicle',
    name: 'VehiclePage',
    component: () => import('@pages/VehiclePage.vue'),
    meta: { breadcrumb: 'Vehicle', title: 'Vehicle' },
  },
  // {
  //   path: '/booking',
  //   name: 'UserBookingPage',
  //   component: () => import('@pages/user/booking/BookingPage.vue'), 
  //   meta: { breadcrumb: 'Booking', title: 'Booking' },
  // },
  {
    path: '/booking',
    name: 'UserBookingPageView',
    component: () => import('@pages/user/booking/BookingView.vue'), 
    meta: { breadcrumb: 'Booking', title: 'UserBooking' },
    children: [
      {
        path: '',
        name: 'UserCheckBookingPage',
        component: () => import('@pages/user/booking/BookingPage.vue'), 
        meta: { title: 'UserBooking' },
      },
      {
        path: '/car-list',
        name: 'UserCarListBookingPage',
        component: () => import('@pages/user/booking/BookingCarListPage.vue'), 
        meta: { title: 'UserCarListBooking' },
      },
      {
        path: '/confirmation',
        name: 'UserBookingConfirmationPage',
        component: () => import('@pages/user/booking/BookingConfirmation.vue'), 
        meta: { title: 'UserBookingConfirmation' },
      },
    ]
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   beforeEnter: (to, from, next) => {
  //     const authStore = useAuthStore();
  //     const isAuth = authStore.getIsAuth; // Adjust based on your auth logic.
  //     if (isAuth) {
  //       next({ name: 'DashboardPage' });
  //     } else {
  //       next({ name: 'HomePage' });
  //     }
  //   },
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: (to) => {
      const authStore = useAuthStore();
      const isAuth = authStore.getIsAuth; // Replace with your auth logic
      return isAuth ? { name: 'DashboardPage' } : { name: 'HomePage' };
    },
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
