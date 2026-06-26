self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/getProductByLink"
      },
      {
        "source": "/api/search"
      },
      {
        "source": "/api/trending-products"
      },
      {
        "source": "/api/price-alert"
      },
      {
        "source": "/api/update-prices"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()