// AdSense Configuration
// Use environment variables for sensitive data in production
const getPublisherId = () => {
  // In production, use environment variable
  if (import.meta.env.VITE_ADSENSE_PUBLISHER_ID) {
    return import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
  }
  // Fallback for development
  return 'ca-pub-5458357692522592';
};

// Validate publisher ID format
const validatePublisherId = (publisherId) => {
  const pubIdRegex = /^ca-pub-\d{16}$/;
  return pubIdRegex.test(publisherId);
};

export const adConfig = {
  // Set to true for production, false for development/testing
  showRealAds: import.meta.env.PROD && import.meta.env.VITE_ENABLE_ADS === 'true',
  
  // Your AdSense Publisher ID (secured)
  publisherId: getPublisherId(),
  
  // Validate configuration
  isValid: () => {
    const pubId = getPublisherId();
    return validatePublisherId(pubId);
  },
  
  // Ad Slot IDs - Use environment variables in production
  adSlots: {
    topBanner: import.meta.env.VITE_AD_SLOT_TOP_BANNER || '1234567890',
    leftSidebar: import.meta.env.VITE_AD_SLOT_LEFT_SIDEBAR || '1234567891',
    rightSidebar: import.meta.env.VITE_AD_SLOT_RIGHT_SIDEBAR || '1234567892',
    mobileInline: import.meta.env.VITE_AD_SLOT_MOBILE_INLINE || '1234567893',
    contentInline: import.meta.env.VITE_AD_SLOT_CONTENT_INLINE || '1234567894',
    bottomContent: import.meta.env.VITE_AD_SLOT_BOTTOM_CONTENT || '1234567895',
    footer: import.meta.env.VITE_AD_SLOT_FOOTER || '1234567896'
  },
  
  // Security: Validate ad slot IDs
  validateAdSlot: (slotId) => {
    const slotRegex = /^\d{8,12}$/;
    return slotRegex.test(slotId);
  }
};

// Ad placement configuration
export const adPlacements = {
  topBanner: {
    size: 'large',
    position: 'center',
    className: 'max-w-6xl mx-auto mb-6',
    slot: adConfig.adSlots.topBanner
  },
  leftSidebar: {
    size: 'vertical',
    position: 'center', 
    className: 'sticky top-6',
    slot: adConfig.adSlots.leftSidebar
  },
  rightSidebar: {
    size: 'vertical',
    position: 'center',
    className: 'sticky top-6', 
    slot: adConfig.adSlots.rightSidebar
  },
  mobileInline: {
    size: 'mobile',
    position: 'center',
    className: 'my-6',
    slot: adConfig.adSlots.mobileInline
  },
  contentInline: {
    size: 'horizontal',
    position: 'center',
    className: 'my-6',
    slot: adConfig.adSlots.contentInline
  },
  bottomContent: {
    size: 'large', 
    position: 'center',
    className: 'mt-8',
    slot: adConfig.adSlots.bottomContent
  },
  footer: {
    size: 'large',
    position: 'center', 
    className: 'max-w-6xl mx-auto mt-12 pb-6',
    slot: adConfig.adSlots.footer
  }
};