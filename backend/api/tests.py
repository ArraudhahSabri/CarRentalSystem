# tests.py
from django.test import TestCase
from .models import Customer, Vehicle, Booking, Billing, Payment
from django.utils import timezone

class CustomerModelTest(TestCase):
    
    def test_customer_creation(self):
        customer = Customer.objects.create(
            customer_id=1,
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            phone_number=1234567890,
            address="123 Main St, Example City",
            license_type="A",
            date_of_birth="1990-01-01",
            register_date="2023-01-01",
            create_by="admin",
            update_by="admin"
        )
        self.assertEqual(customer.first_name, "John")
        self.assertEqual(customer.last_name, "Doe")
        self.assertTrue(isinstance(customer, Customer))
        self.assertEqual(str(customer), "John Doe")
        
class VehicleModelTest(TestCase):
    
    def test_vehicle_creation(self):
        vehicle = Vehicle.objects.create(
            vehicle_id=1,
            make="Toyota",
            vehicle_model="Corolla",
            model_year=2021,
            vehicle_type="Sedan",
            color="Blue",
            plate_number="ABC1234",
            mileage=5000,
            current_service_date="2023-06-01",
            current_location="Garage A",
            status=1,
            created_by="admin",
            updated_by="admin"
        )
        self.assertEqual(vehicle.make, "Toyota")
        self.assertEqual(vehicle.vehicle_model, "Corolla")
        self.assertTrue(isinstance(vehicle, Vehicle))
        self.assertEqual(str(vehicle), "ABC1234")
        
class BookingModelTest(TestCase):
    
    def setUp(self):
        customer = Customer.objects.create(
            customer_id=1,
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            phone_number=1234567890,
            address="123 Main St",
            license_type="A",
            date_of_birth="1990-01-01",
            register_date="2023-01-01",
            create_by="admin",
            update_by="admin"
        )
        vehicle = Vehicle.objects.create(
            vehicle_id=1,
            make="Toyota",
            vehicle_model="Corolla",
            model_year=2021,
            vehicle_type="Sedan",
            color="Blue",
            plate_number="ABC1234",
            mileage=5000,
            current_service_date="2023-06-01",
            current_location="Garage A",
            status=1,
            created_by="admin",
            updated_by="admin"
        )
        self.booking = Booking.objects.create(
            booking_id=1,
            customer=customer,
            vehicle=vehicle,
            discount_id="DISC10",
            booking_date=timezone.now().date(),
            pickup_date=timezone.now().date(),
            return_date=timezone.now().date(),
            pickup_location="Pickup Point A",
            return_location="Return Point A",
            status=1,
            total_price=100.00,
            created_by="admin",
            updated_by="admin"
        )
        
    def test_booking_creation(self):
        booking = self.booking
        self.assertEqual(booking.customer.first_name, "John")
        self.assertEqual(booking.vehicle.plate_number, "ABC1234")
        self.assertEqual(booking.status, 1)
        self.assertTrue(isinstance(booking, Booking))

class BillingModelTest(TestCase):

    def test_billing_creation(self):
        booking = Booking.objects.first()
        billing = Billing.objects.create(
            bill_id=1,
            booking=booking,
            amount_due=100.00,
            payment_status=1,
            payment_method=1,
            payment_date=timezone.now().date(),
            created_by="admin",
            updated_by="admin"
        )
        self.assertEqual(billing.amount_due, 100.00)
        self.assertTrue(isinstance(billing, Billing))

class PaymentModelTest(TestCase):

    def test_payment_creation(self):
        billing = Billing.objects.first()
        payment = Payment.objects.create(
            payment_id=1,
            bill=billing,
            payment_date=timezone.now().date(),
            payment_amount=100.00,
            payment_status=1,
            payment_method=1,
            created_by="admin",
            updated_by="admin"
        )
        self.assertEqual(payment.payment_amount, 100.00)
        self.assertTrue(isinstance(payment, Payment))

