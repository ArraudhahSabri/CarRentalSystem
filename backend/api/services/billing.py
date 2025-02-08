from rest_framework import status
from rest_framework.response import Response
from ..models import Billing
from ..serializers import BillingSerializer
from .base import BaseService

class BillingService(BaseService):
    @staticmethod
    def get_bills():
        try:
            bills = Billing.objects.all()
            serializer = BillingSerializer(bills, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_bill(data):
        try:
            serializer = BillingSerializer(data=data)
            if serializer.is_valid():
                bill = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 