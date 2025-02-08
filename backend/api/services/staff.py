from rest_framework import status
from rest_framework.response import Response
from ..models import Staff
from ..serializers import StaffSerializer
from .base import BaseService

class StaffService(BaseService):
    @staticmethod
    def get_staff():
        try:
            staff = Staff.objects.all()
            serializer = StaffSerializer(staff, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_staff(data):
        try:
            serializer = StaffSerializer(data=data)
            if serializer.is_valid():
                staff = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 