import stripe

from django.shortcuts import redirect
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(["POST"])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency="inr",
        payment_method_types=["card"],
        receipt_email="test@example.com",
    )
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price": "price_1Oqd4oSC7P1iNlkRIAh0eezV",
                        "quantity": 1,
                    },
                ],
                payment_method_types=[
                    "card",
                ],
                mode="payment",
                success_url=settings.SITE_URL
                + "/?success=true&session_id={CHECKOUT_SESSION_ID}",
                cancel_url=settings.SITE_URL + "/?canceled=true",
            )
            return redirect(checkout_session.url)

        except:
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
