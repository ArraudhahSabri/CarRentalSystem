from rest_framework import status
from rest_framework.response import Response
from ..models import Payment
from ..serializers import PaymentSerializer
from .base import BaseService

class PaymentService(BaseService):
    @staticmethod
    def get_payments():
        try:
            payments = Payment.objects.all()
            serializer = PaymentSerializer(payments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_payment(data):
        try:
            serializer = PaymentSerializer(data=data)
            if serializer.is_valid():
                payment = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 