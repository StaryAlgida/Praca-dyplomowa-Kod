from rest_framework import pagination


class CustomPagination(pagination.PageNumberPagination):
    page_size = 12
    max_page_size = 12
    page_query_param = "p"
