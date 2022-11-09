from ast import Return
from unicodedata import category
from urllib import response
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from base.serializers import OrderSerializer,CategorySerializer,ProductSerializer,WishlistSerializer
from base.models import Profile,Categories,Products,Orders,Orders_details,Wishlist
from django.contrib.auth import logout

def index(req):
    return JsonResponse('hello', safe=False)


@api_view(['GET'])
def get_data(request):
    if request.method == 'GET':
        return JsonResponse({"test":"test"} , safe=False)
    

@api_view(["POST"])
def register(request):
    Username = request.data["username"]
    Password = request.data["password"]
    Email = request.data["email"]
    First_name = request.data["first_name"]
    Last_name = request.data["last_name"]
    print(Username, Password, Email,)
    user = User.objects.create_user(
        username=Username, password=Password, email=Email,first_name= First_name, last_name= Last_name)
    return Response({"first name": First_name, "last name": Last_name})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # classmethod (static method) method we can use with out creating an object
    @classmethod
    def get_token(cls, user):
        # super -> the class we inherit
        token = super().get_token(user)
        # select one row from Profile table (where user = given user)
        token['username'] = user.username
        # from here it's our code
        # pro = Profile.objects.get(user=user)
        # print(pro)
        # our code done
        # ...
        print("logged")
        return token

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myLogout(request):
    logout(request)
    return Response("logged out")
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def AddCategory(request):
    serializer = CategorySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response("data was not saved")
    return Response({'new category':"added"})

@api_view(["POST"])
def AddProduct(request):
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response("data was not saved")
    return Response({"new product":"Added"})

@api_view(["GET"])
def GetProductsByCategory(request):
    products = Products.objects.filter(category = request.data["catId"])
    serializer = ProductSerializer(products,many = True)
    return Response(serializer.data)

@api_view(["PUT"])
def UpdatePriceToPrudct(request):
    id = request.data["_id"]
    temp=Products.objects.get(_id = id)
    temp.price =request.data['price']
    temp.save()
    return Response({"new price":"Updated"})

@api_view(["GET"])
def GetProducts(request, id = 0):
    if int(id) > 0:
        products = Products.objects.filter(_id = int(id))
    else:
        products = Products.objects.all()
    serializer = ProductSerializer(products,many =True)
    return Response(serializer.data)

    



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def AddOrder(request):

    myCart = request.data
    print(myCart)
    
    newOrder = Orders.objects.create(Total = 1, user = request.user)
    p_id = Products.objects.get(_id = myCart["id"])
    a = myCart["amount"]
    prod_price  = p_id.price
    Total = prod_price * a
    Orders_details.objects.create(order_id = newOrder,prod_id = p_id,amount = a,total = Total)
    # for x in myCart:
    #     Orders_details.objects.create(
    #         # order_id = newOrder, 
    #         # order_id = x["o_id"],
    #         # prod_id= Products.objects.get(_id = x["id"]),
    #         prod_id = x['prod_id'],
    #         amount = x["amount"], total = x["total"])
    
    
    return Response({"order saved, cost:":Total})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToWishlist(request):
    user_id = request.user.id # returnes the user id.
    user = request.user # returnes the user as an Object.
    print(json.dumps(request.data))
    prod_id = request.data["prod_id"] # returnes the id of the product
    product_id = Products.objects.get(_id = request.data["prod_id"])
    
    count = Wishlist.objects.filter(prod_id = prod_id, user_id= user_id).count()
    print(count)
    print(prod_id)
    print(count)
    if count >= 1: # checks if the product id and the same user id is already in db.
        return Response("item already in wishlist") # if so notify.
    else: # otherwise add the new item to the user wishlist
        Wishlist.objects.create(user = user, prod_id = product_id)
        print(user_id)
        return Response("item added to wishlist.")


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteFromWishlist(request):
    name = Products.objects.get(desc = request.data["prod_id"]) # returnes the name of the product.
    temp= Products.objects.get(_id = request.data["prod_id"]) # get the product you want to delete by his id.
    temp.delete() # final delete.
    return JsonResponse({"item name that deleted":name})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetWishlist(request):
    user_id = request.user.id # returens the user id as int.
    all_products = Wishlist.objects.filter(user_id = user_id) # returnes all the product of the user 
    count1 = Wishlist.objects.filter(user_id = user_id).count() # counts how many products are in the wishlist.
    print(count1)
    serializer = WishlistSerializer(all_products,many =True)
    return Response(serializer.data) # returnes the data in JSON format.