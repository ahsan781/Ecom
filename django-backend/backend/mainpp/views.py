from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Product, Cart, Order
from .serializers import*

# Category View to list all categories
class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)



class ProductDetail(APIView):
    def get(self, request, id):
        try:
            product = Product.objects.get(id=id)  # Retrieve product by ID
            serializer = ProductSerializer(product)  # Serialize the product data
            return Response(serializer.data)  # Return serialized product data
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        

        
# Product View to list products by category
class ProductList(APIView):
    def get(self, request, category_id):
        products = Product.objects.filter(category_id=category_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Cart View for adding products to the cart and viewing the cart
class CartList(APIView):
    def get(self, request, user):
        cart_items = Cart.objects.filter(user=user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request, user):
        product_id = request.data['product_id']
        quantity = request.data['quantity']
        
        # Check if the product is already in the cart
        cart_item, created = Cart.objects.get_or_create(user=user, product_id=product_id)
        
        if not created:
            # If product is already in the cart, update the quantity
            cart_item.quantity += quantity
            cart_item.save()
        else:
            cart_item.quantity = quantity
            cart_item.save()
        
        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user):
        product_id = request.data['product_id']
        cart_item = Cart.objects.filter(user=user, product_id=product_id).first()
        if cart_item:
            cart_item.delete()
            return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"message": "Item not found in cart"}, status=status.HTTP_404_NOT_FOUND)

# Order View for placing an order and saving user details
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, Product
from .serializers import OrderSerializer
from django.core.mail import send_mail


class OrderCreate(APIView):
    def post(self, request):
        # Get the product ID from the request data
        product_id = request.data.get('product')
        print(product_id)
        
        # Check if the product exists in the database
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Add the product_id to the request data
        request.data['product'] = product.id

        # Create the order
        serializer = OrderSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            # Save the order in the database
            order = serializer.save()

            # Add the initial status history with 'Pending' status
            OrderStatusHistory.objects.create(order=order, new_status='Pending')

            # Send email to the user (Customer)
            send_mail(
                'Order Confirmation',  # Subject
                f'Thank you for your order, {request.data["first_name"]} {request.data["last_name"]}! Your order for {product.name} (Order ID: {order.id}) has been placed successfully.',
                'ahsanaziz895@gmail.com',  # From email (can be a dummy email or your own email)
                [request.data["email"]],  # To email (user's email)
                fail_silently=False,
            )

            # Send email to the host (admin) about the new order
            send_mail(
                'New Order Notification',  # Subject
                f'A new order has been placed! Order ID: {order.id}\nCustomer Name: {request.data["first_name"]} {request.data["last_name"]}\nProduct: {product.name}\nEmail: {request.data["email"]}\nPhone: {request.data["phone_number"]}',
                'ahsanaziz895@gmail.com',  # From email (can be a dummy email or your own email)
                ['ahsanaziz895@gmail.com'],  # To email (admin's email)
                fail_silently=False,
            )

            # Clear the cart after placing the order (optional)
            # Cart.objects.filter(user=request.data['user']).delete()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SliderList(APIView):
    def get(self, request):
        sliders = Slider.objects.all()  # Get all slider objects
        serializer = SliderSerializer(sliders, many=True)
        return Response(serializer.data)