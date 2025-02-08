from rest_framework import status
from rest_framework.response import Response
from ..models import VehicleMaintenance
from ..serializers import VehicleMaintenanceSerializer
from .base import BaseService

class MaintenanceService(BaseService):
    @staticmethod
    def get_maintenance_records():
        try:
            records = VehicleMaintenance.objects.all()
            serializer = VehicleMaintenanceSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_maintenance_record(data):
        try:
            serializer = VehicleMaintenanceSerializer(data=data)
            if serializer.is_valid():
                record = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 