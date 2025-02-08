from django.contrib import admin
from .models import Vehicle, Customer, Staff, Booking, VehicleMaintenance, Billing, Payment, Discount

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle_id', 'make', 'vehicle_model', 'model_year', 'status')
    search_fields = ('make', 'vehicle_model', 'plate_number')
    list_filter = ('status', 'vehicle_type')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'first_name', 'last_name', 'email', 'phone_number')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('license_type',)

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('staff_id', 'first_name', 'last_name', 'email', 'phone_number', 'job_role')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('job_role',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'customer_id', 'vehicle_id', 'booking_date', 'status')
    search_fields = ('booking_id', 'customer_id', 'vehicle_id')
    list_filter = ('status',)

@admin.register(VehicleMaintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('vehicle_id', 'maintenance_date', 'service_description', 'service_cost')
    search_fields = ('vehicle_id', 'service_description')
    list_filter = ('maintenance_date',)

@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ('bill_id', 'booking_id', 'amount_due', 'payment_status')
    search_fields = ('bill_id', 'booking_id')
    list_filter = ('payment_status',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('payment_id', 'bill_id', 'payment_amount', 'payment_status', 'payment_method')
    search_fields = ('payment_id', 'bill_id')
    list_filter = ('payment_status', 'payment_method')

@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('discount_id', 'discount_code', 'discount_percentage', 'valid_from', 'valid_to')
    search_fields = ('discount_code', 'discount_description')
    list_filter = ('valid_from', 'valid_to')

