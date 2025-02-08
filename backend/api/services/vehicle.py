from ..models import Vehicle
from ..serializers import VehicleSerializer
from rest_framework.response import Response
from rest_framework import status
from .base import BaseService

# test param
def get_available_vehicles():
    mock_data = [
        {"id": 1, "name": "Car A", "brand": "Brand X", "price_per_day": 100.00, "available": True},
        {"id": 2, "name": "Car B", "brand": "Brand Y", "price_per_day": 150.00, "available": True},
        {"id": 3, "name": "Car C", "brand": "Brand Z", "price_per_day": 200.00, "available": False},
    ]
    return JsonResponse(mock_data, safe=False)

# def get_available_vehicles():
#     return Vehicle.objects.filter(available=True)

class VehicleService(BaseService):
    @staticmethod
    def get_available_vehicles():
        try:
            vehicles = Vehicle.objects.filter(status=1)
            serializer = VehicleSerializer(vehicles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_vehicle(data):
        try:
            serializer = VehicleSerializer(data=data)
            if serializer.is_valid():
                vehicle = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e)