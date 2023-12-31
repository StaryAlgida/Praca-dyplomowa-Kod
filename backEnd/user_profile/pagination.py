from rest_framework import pagination


class HistoryPagination(pagination.PageNumberPagination):
    page_size = 30
    max_page_size = 30
    page_query_param = "p"
