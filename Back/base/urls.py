from django.urls import path
from . import views
from .views import GetWishlist,DeleteFromWishlist,Wishlist,AddOrder,GetProducts,UpdatePriceToPrudct,AddCategory,GetProductsByCategory, MyTokenObtainPairView,AddProduct


urlpatterns = [
     path('test/', views.get_data),
     path('register/', views.register),# register to the website 
     path('updateProd/',views.UpdatePriceToPrudct),
     path('products/<id>/',views.GetProducts),# get product by his category id
     path('products/',views.GetProducts), # get all products
     path("addProduct/", views.AddProduct),
     path("getprodbycat/",views.GetProductsByCategory),
     # path('mycartprods/',views.GetCartProdsbyidw),
     path('addOrder/',views.AddOrder),
     path("addCategory/",views.AddCategory),
     path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),# log in
     path('logout/',views.myLogout),
     path('AddToWishlist/',views.AddToWishlist),
     path('RemoveFromWishlist/', views.DeleteFromWishlist),
     path('GetWishlist/',views.GetWishlist),
]