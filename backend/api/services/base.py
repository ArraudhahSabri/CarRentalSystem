from rest_framework.response import Response
from rest_framework import status

class BaseService:
    @staticmethod
    def handle_exception(e):
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        ) 