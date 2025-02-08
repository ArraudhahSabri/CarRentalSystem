from django.db import models

# CUSTOMER Table
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=500)
    last_name = models.CharField(max_length=500)
    email = models.EmailField(max_length=500)
    phone_number = models.IntegerField()
    address = models.CharField(max_length=500)
    license_type = models.CharField(max_length=25)
    date_of_birth = models.DateField()
    register_date = models.DateField()
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    create_by = models.CharField(max_length=500)
    update_by = models.CharField(max_length=500)

# VEHICLE_MAINTENANCE Table
class VehicleMaintenance(models.Model):
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    maintenance_date = models.DateField()
    service_description = models.CharField(max_length=500)
    mileage_at_service = models.IntegerField()
    service_cost = models.FloatField()
    next_service_mileage = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# STAFF Table
class Staff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=500)
    last_name = models.CharField(max_length=500)
    email = models.EmailField(max_length=500)
    phone_number = models.IntegerField()
    job_role = models.IntegerField()
    hire_date = models.DateField()
    salary = models.FloatField()
    employee_password = models.CharField(max_length=500)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# BOOKING Table
class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    discount = models.ForeignKey('Discount', on_delete=models.SET_NULL, null=True)
    booking_date = models.DateField()
    pickup_date = models.DateField()
    return_date = models.DateField()
    pickup_location = models.CharField(max_length=500)
    return_location = models.CharField(max_length=500)
    total_price = models.FloatField()
    status = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# VEHICLE Table
class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)
    make = models.CharField(max_length=50)
    vehicle_model = models.CharField(max_length=50)
    model_year = models.IntegerField()
    vehicle_type = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=25)
    mileage = models.IntegerField()
    current_service_date = models.DateField()
    current_location = models.CharField(max_length=50)
    status = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# BILLING Table
class Billing(models.Model):
    bill_id = models.AutoField(primary_key=True)
    booking = models.ForeignKey('Booking', on_delete=models.CASCADE)
    amount_due = models.FloatField()
    payment_status = models.IntegerField()
    payment_method = models.IntegerField()
    payment_date = models.DateField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# DISCOUNT Table
class Discount(models.Model):
    discount_id = models.AutoField(primary_key=True)
    discount_code = models.CharField(max_length=25, unique=True)
    valid_from = models.DateField()
    valid_to = models.DateField()
    discount_description = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# PAYMENT Table
class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    bill = models.ForeignKey('Billing', on_delete=models.CASCADE)
    payment_date = models.DateField()
    payment_amount = models.FloatField()
    payment_status = models.IntegerField()
    payment_method = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    created_by = models.CharField(max_length=500)
    updated_by = models.CharField(max_length=500)

# New function to get vehicles from the Vehicle table
def get_vehicles(vehicle_id=None, vehicle_type=None, status=None):
    """
    Function to get vehicles based on filters.
    Parameters:
    - vehicle_id: Optional filter for vehicle ID
    - vehicle_type: Optional filter for vehicle type
    - status: Optional filter for vehicle status
    """
    vehicles = Vehicle.objects.all()
    
    if vehicle_id:
        vehicles = vehicles.filter(vehicle_id=vehicle_id)
    if vehicle_type:
        vehicles = vehicles.filter(vehicle_type=vehicle_type)
    if status is not None:
        vehicles = vehicles.filter(status=status)
    
    return vehicles
