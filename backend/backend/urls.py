"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    CustomerViewSet, VehicleViewSet, VehicleMaintenanceViewSet,
    StaffViewSet, DiscountViewSet, BookingViewSet,
    BillingViewSet, PaymentViewSet
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'maintenance', VehicleMaintenanceViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'discounts', DiscountViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'billing', BillingViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# urlpatterns = [
#     path('hello/', HelloWorldView.as_view(), name='hello_world'),
# ]

