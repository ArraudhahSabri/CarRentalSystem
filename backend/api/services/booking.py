from rest_framework import status
from rest_framework.response import Response
from ..models import Booking
from ..serializers import BookingSerializer
from .base import BaseService

class BookingService(BaseService):
    @staticmethod
    def get_bookings():
        try:
            bookings = Booking.objects.all()
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return BaseService.handle_exception(e)

    @staticmethod
    def create_booking(data):
        try:
            serializer = BookingSerializer(data=data)
            if serializer.is_valid():
                booking = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return BaseService.handle_exception(e) 