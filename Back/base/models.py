from msilib.schema import Class
from pyexpat import model
from unicodedata import category
from django.db import models
from django.contrib.auth.models import User
from sqlalchemy import null

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

class Categories(models.Model):
    desc = models.CharField(max_length=50)
    _id = models.AutoField(primary_key=True,editable=False)

class Products(models.Model):
    desc = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    _id = models.AutoField(primary_key=True, editable=False)
    category = models.ForeignKey(Categories ,on_delete=models.CASCADE, null=True)

class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    _id = models.AutoField(primary_key=True, editable=False)
    createdTime = models.DateTimeField(auto_now_add=True)
    Total = models.IntegerField(null=True)

class Orders_details(models.Model):
    _id = models.AutoField(primary_key=True,editable=False)
    order_id = models.ForeignKey(Orders,on_delete=models.CASCADE, null=True)
    prod_id = models.ForeignKey(Products,on_delete=models.CASCADE, null=True)
    amount = models.IntegerField()
    total = models.IntegerField()

class Wishlist(models.Model):
    _id = models.AutoField(primary_key = True,editable = False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    prod_id = models.ForeignKey(Products,on_delete=models.CASCADE, null=True)



