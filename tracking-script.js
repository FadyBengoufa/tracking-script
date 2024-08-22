(function () {
  // Function to get query parameters from the URL
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Function to store affiliate_id in local storage or cookies
  function storeAffiliateId(id) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("affiliate_id", id);
    } else {
      document.cookie = `affiliate_id=${id}; path=/`;
    }
  }

  // Function to retrieve stored affiliate_id
  function getStoredAffiliateId() {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem("affiliate_id");
    } else {
      const match = document.cookie.match(
        new RegExp("(^| )affiliate_id=([^;]+)")
      );
      return match ? match[2] : null;
    }
  }

  // Function to send event data to your API
  function sendEventToApi(eventType, eventData) {
    const affiliateId = getStoredAffiliateId();
    console.log("sending event to API....", affiliateId);
    
    fetch("https://your-api.com/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventType,
        affiliateId: affiliateId,
        ...eventData,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Event tracked:", data))
      .catch((error) => console.error("Error tracking event:", error));
  }

  // Store affiliate_id when the user lands on the site
  const affiliateId = getQueryParam("affiliate_id");
  if (affiliateId) {
    storeAffiliateId(affiliateId);
  }

  window.sendEventToApi = sendEventToApi;
})();
