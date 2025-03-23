from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer

# Create your views here.
@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializedData = BookSerializer(books, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_book(request):
    data = request.data
    serializerss=BookSerializer(data=data)
    if serializerss.is_valid():
        serializerss.save()
        return Response(serializerss.data,status=status.HTTP_201_CREATED)
    return Response(serializerss.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
def book_detail(request,pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "DELETE":
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method =="PUT":
        data = request.data
        serializersss= BookSerializer(book,data=data)
        if serializersss.is_valid():
            serializersss.save()
            return Response(serializersss.data, status=status.HTTP_201_CREATED)
        return Response(serializersss.errors, status=status.HTTP_400_BAD_REQUEST)

    


