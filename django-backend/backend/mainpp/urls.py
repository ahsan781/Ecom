from django.urls import path
from .views import*

urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:category_id>/products/', ProductList.as_view(), name='product-list'),
    path('cart/<str:user>/', CartList.as_view(), name='cart-list'),
    path('order/', OrderCreate.as_view(), name='order-create'),
    path('sliders/', SliderList.as_view(), name='slider-list'),
    path('products/<int:id>/', ProductDetail.as_view(), name='product-detail'),  # New route for individual product


]
