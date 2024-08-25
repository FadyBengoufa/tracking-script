(function () {
  // Function to get query parameters from the URL
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Function to store affiliate_id in cookies
  function storeAffiliateId(id) {
    document.cookie = `affiliate_id=${id}; path=/; Secure`;
  }

  // Function to send event data to your API
  function sendEventToApi(eventType, eventData) {
    fetch("http://localhost:8080/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        event: eventType,
        ...eventData,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error tracking event:", error));
  }

  // Store affiliate_id when the user lands on the site
  const affiliateId = getQueryParam("affiliate_id");
  if (affiliateId) {
    storeAffiliateId(affiliateId);
  }

  window.sendEventToApi = sendEventToApi;
})();
