from rest_framework import status
from rest_framework.response import Response
from ..models import Customer
from ..serializers import CustomerSerializer
from .base import BaseService

class CustomerService(BaseService):
    @staticmethod
    def get_customers():
        try:
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_customer(data):
        try:
            serializer = CustomerSerializer(data=data)
            if serializer.is_valid():
                customer = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 