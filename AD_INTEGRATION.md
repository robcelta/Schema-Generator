# Advertisement Integration Guide

## Overview
The Schema Markup Generator has been optimized for advertisement integration with strategic ad placements throughout the application.

## Ad Placement Strategy

### 1. **Top Banner** (970×90 / 728×90)
- **Location**: Above the main header
- **Visibility**: High - First thing users see
- **Best for**: Brand awareness, high-impact campaigns

### 2. **Sidebar Ads** (160×600) - Desktop Only
- **Location**: Left and right sidebars on extra-large screens (xl+)
- **Visibility**: Persistent while scrolling (sticky positioning)
- **Best for**: Contextual ads, long-form content

### 3. **Mobile Banner** (320×50)
- **Location**: Between schema selector and form on mobile devices
- **Visibility**: Mobile-only, doesn't interfere with desktop layout
- **Best for**: Mobile-optimized campaigns

### 4. **Inline Banner** (728×90)
- **Location**: Between validation results and instructions
- **Visibility**: High engagement area where users spend time
- **Best for**: Action-oriented ads, tool recommendations

### 5. **Bottom Content** (970×90 / 728×90)
- **Location**: After main content, before footer
- **Visibility**: Users who complete the flow
- **Best for**: Related tools, conversion campaigns

### 6. **Footer Banner** (970×90 / 728×90)
- **Location**: Bottom of page
- **Visibility**: Final impression before leaving
- **Best for**: Retargeting, newsletter signups

## Implementation

### AdSense Integration Setup

1. **Configure Ad Settings** in `src/config/adConfig.js`:
   ```javascript
   export const adConfig = {
     showRealAds: true, // Set to true for production
     publisherId: 'ca-pub-5458357692522592', // Your publisher ID
     adSlots: {
       topBanner: 'YOUR_AD_SLOT_ID',
       leftSidebar: 'YOUR_AD_SLOT_ID',
       // ... add your actual ad slot IDs
     }
   };
   ```

2. **Create Ad Units** in your Google AdSense account for each placement

3. **Update Slot IDs** in the configuration file

### Using the AdBanner Component

```jsx
import AdBanner from './components/AdBanner';
import { adPlacements, adConfig } from './config/adConfig';

// Using configured placement
<AdBanner 
  {...adPlacements.topBanner}
  placeholder={!adConfig.showRealAds}
  adSlot={adPlacements.topBanner.slot}
/>

// Custom ad
<AdBanner 
  size="horizontal" 
  placeholder={false}
  adSlot="your-ad-slot-id"
  className="my-4"
/>
```

### Available Sizes
- `horizontal`: 728×90 leaderboard
- `large`: 970×90 large banner  
- `vertical`: 160×600 skyscraper
- `square`: 250×250 square
- `mobile`: 320×50 mobile banner

### Responsive Features
- Automatically adjusts sizes for mobile devices
- Hides vertical ads on mobile/tablet
- Shows mobile-specific banner on small screens
- Maintains optimal spacing and readability

## Integration with Ad Networks

### Google AdSense
1. **✅ AdSense script already added** to `index.html`
2. **Create ad units** in your AdSense dashboard:
   - Leaderboard (728x90) for horizontal banners
   - Skyscraper (160x600) for sidebar ads  
   - Mobile banner (320x50) for mobile
   - Large banner (970x90) for top/footer
3. **Update ad slot IDs** in `src/config/adConfig.js`
4. **Enable real ads** by setting `showRealAds: true` in config

### Other Networks
The component is designed to work with any ad network:
- Replace the placeholder div with your ad code
- Maintain the existing CSS classes for proper styling
- Ensure responsive behavior is preserved

## Performance Considerations

- All ads use lazy loading principles
- Minimal impact on Core Web Vitals
- Sticky positioning for better viewability
- Responsive images reduce mobile data usage

## Best Practices

1. **User Experience First**: Ads complement, don't disrupt the tool's functionality
2. **Mobile Optimization**: Different ad strategy for mobile users
3. **Performance**: Ads load after critical content
4. **Accessibility**: Proper contrast and sizing maintained
5. **Revenue Optimization**: Strategic placement in high-engagement areas

## Customization

To modify ad placements:
1. **Edit positions** in `src/config/adConfig.js` (recommended)
2. **Adjust sizing** in `AdBanner.jsx` for responsive behavior
3. **Modify App.jsx** for new placement locations
4. **Test across all device sizes**

### Development vs Production

**Development Mode** (`showRealAds: false`):
- Shows placeholder ads with dimensions
- No real ad requests to AdSense
- Safe for testing and development

**Production Mode** (`showRealAds: true`):
- Shows real AdSense ads
- Requires valid ad slot IDs
- Generates actual revenue

## Analytics Integration

Consider adding tracking for:
- Ad viewability
- Click-through rates
- Revenue per visitor
- User flow impact

The layout is optimized for both user experience and ad revenue potential.