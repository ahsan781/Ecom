from django.db import models

# Create your models here.from django.db import models

# Category model to hold main categories with an image field
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)  # Added image field

    def __str__(self):
        return self.name
    
class Slider(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='slider_images/')
    
    def __str__(self):
        return self.name
# Product model for items in each category
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Cart model for storing products added to a cart by a user
class Cart(models.Model):
    user = models.CharField(max_length=100)  # User identifier (can be a username or email)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.quantity} of {self.product.name}'

# Order model for storing the purchase information and buyer details
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # ForeignKey to Product
    user = models.CharField(max_length=100)  # User identifier (can be a username or email)
    email = models.EmailField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f'Order by {self.first_name} {self.last_name} ({self.email})'
    
class OrderStatusHistory(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_history')  # Link to Order model
    new_status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Delivered', 'Delivered')],
    )
    status_updated_at = models.DateTimeField(auto_now_add=True)  # Store the timestamp of the status change

    def __str__(self):
        return f'Order {self.order.id} changed to {self.new_status} on {self.status_updated_at}'
