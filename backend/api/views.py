from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from .services.customer import CustomerService
from .services.vehicle import VehicleService
from .services.booking import BookingService
from .services.maintenance import MaintenanceService
from .services.staff import StaffService
from .services.billing import BillingService
from .services.payment import PaymentService
from .services.discount import DiscountService
from rest_framework import viewsets

class HomeView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Car Rental System!"}, status=200)


class CustomerView(APIView):
    def get(self, request):
        return CustomerService.get_customers()

    def post(self, request):
        return CustomerService.create_customer(request.data)

class VehicleView(APIView):
    def get(self, request):
        return VehicleService.get_available_vehicles()

    def post(self, request):
        return VehicleService.create_vehicle(request.data)

class BookingView(APIView):
    def get(self, request):
        return BookingService.get_bookings()

    def post(self, request):
        return BookingService.create_booking(request.data)

class VehicleMaintenanceView(APIView):
    def get(self, request):
        return MaintenanceService.get_maintenance_records()

    def post(self, request):
        return MaintenanceService.create_maintenance_record(request.data)

class StaffView(APIView):
    def get(self, request):
        return StaffService.get_staff()

    def post(self, request):
        return StaffService.create_staff(request.data)

class BillingView(APIView):
    def get(self, request):
        return BillingService.get_bills()

    def post(self, request):
        return BillingService.create_bill(request.data)

class DiscountView(APIView):
    def get(self, request):
        return DiscountService.get_discounts()

    def post(self, request):
        return DiscountService.create_discount(request.data)

class PaymentView(APIView):
    def get(self, request):
        return PaymentService.get_payments()

    def post(self, request):
        return PaymentService.create_payment(request.data)

def home(request):
    return HttpResponse("Welcome to the Car Rental System!")

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleMaintenanceViewSet(viewsets.ModelViewSet):
    queryset = VehicleMaintenance.objects.all()
    serializer_class = VehicleMaintenanceSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
