function trackProductClick(event, trackingHistory) {
    window.dataLayer.push(event);
    return event;
};

trackProductClick.eventType = "PAGE_CLICK";

export default trackProductClick;