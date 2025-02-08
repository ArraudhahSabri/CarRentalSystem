from rest_framework import status
from rest_framework.response import Response
from ..models import Discount
from ..serializers import DiscountSerializer
from .base import BaseService

class DiscountService(BaseService):
    @staticmethod
    def get_discounts():
        try:
            discounts = Discount.objects.all()
            serializer = DiscountSerializer(discounts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_discount(data):
        try:
            serializer = DiscountSerializer(data=data)
            if serializer.is_valid():
                discount = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 