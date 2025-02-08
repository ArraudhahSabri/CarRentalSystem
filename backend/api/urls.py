from django.urls import path
from .views import (
    HomeView, CustomerView, VehicleView, BookingView,
    VehicleMaintenanceView, StaffView, BillingView,
    DiscountView, PaymentView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('vehicles/', VehicleView.as_view(), name='vehicle-list'),
    path('customers/', CustomerView.as_view(), name='customer-list'),
    path('maintenance/', VehicleMaintenanceView.as_view(), name='maintenance-list'),
    path('staff/', StaffView.as_view(), name='staff-list'),
    path('bookings/', BookingView.as_view(), name='booking-list'),
    path('billing/', BillingView.as_view(), name='billing-list'),
    path('discounts/', DiscountView.as_view(), name='discount-list'),
    path('payments/', PaymentView.as_view(), name='payment-list')
]

