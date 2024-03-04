from django.urls import path

from payments.views import test_payment, StripeCheckoutView


app_name = "payments"
urlpatterns = [
    path("test-payment/", test_payment, name="test-payment"),
    path(
        "stripe/create-checkout-session",
        StripeCheckoutView.as_view(),
        name="stripe-create-checkout-session",
    ),
]
