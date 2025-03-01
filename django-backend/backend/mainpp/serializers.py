from rest_framework import serializers
from .models import*

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image']  # Include image in the fields

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'category']

# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity']

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  # Correct ForeignKey handling

    class Meta:
        model = Order
        fields = ['id', 'product', 'user', 'email', 'first_name', 'last_name', 'address', 'apartment', 'city', 'postal_code', 'phone_number']

class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'name', 'image']