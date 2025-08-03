import React, { useEffect, useRef } from 'react';
import { adConfig } from '../config/adConfig';

const AdBanner = ({ 
  size = 'horizontal', 
  position = 'center',
  className = '',
  placeholder = false, // Changed default to false for production
  responsive = true,
  adSlot = null // AdSense ad slot ID
}) => {
  const adRef = useRef(null);
  // Different ad sizes with responsive considerations
  const sizeClasses = {
    horizontal: responsive ? 'w-full h-20 sm:h-24' : 'w-full h-24', // 728x90 leaderboard
    square: responsive ? 'w-48 h-48 sm:w-64 sm:h-64' : 'w-64 h-64',       // 250x250 square
    vertical: responsive ? 'w-32 h-80 lg:w-40 lg:h-96' : 'w-40 h-96',     // 160x600 skyscraper
    mobile: 'w-full h-12 sm:h-16',     // 320x50 mobile banner
    large: responsive ? 'w-full h-24 lg:h-32' : 'w-full h-32'       // 970x90 large banner
  };

  const positionClasses = {
    center: 'mx-auto',
    left: 'mr-auto',
    right: 'ml-auto'
  };

  // Get responsive dimensions text
  const getDimensionsText = () => {
    switch(size) {
      case 'horizontal': return responsive ? '728×90 / 320×50' : '728×90';
      case 'square': return responsive ? '250×250 / 200×200' : '250×250';
      case 'vertical': return responsive ? '160×600 / 120×480' : '160×600';
      case 'mobile': return '320×50';
      case 'large': return responsive ? '970×90 / 728×90' : '970×90';
      default: return 'Ad';
    }
  };

  if (placeholder) {
    return (
      <div className={`
        ${sizeClasses[size]} 
        ${positionClasses[position]}
        ${className}
        bg-gradient-to-r from-gray-100 to-gray-200 
        border-2 border-dashed border-gray-300 
        rounded-lg 
        flex items-center justify-center 
        text-gray-500 text-xs sm:text-sm font-medium
        hover:from-gray-200 hover:to-gray-300 transition-all
        min-h-0
      `}>
        <div className="text-center px-2">
          <div className="text-xs opacity-75 mb-1">Advertisement</div>
          <div className="hidden sm:block">{getDimensionsText()}</div>
          <div className="sm:hidden text-xs">Ad Space</div>
        </div>
      </div>
    );
  }

  // AdSense configuration based on size
  const getAdSenseConfig = () => {
    const configs = {
      horizontal: {
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
        style: { display: 'block', width: '100%', height: '90px' }
      },
      large: {
        'data-ad-format': 'auto', 
        'data-full-width-responsive': 'true',
        style: { display: 'block', width: '100%', height: '90px' }
      },
      vertical: {
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true', 
        style: { display: 'block', width: '160px', height: '600px' }
      },
      square: {
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
        style: { display: 'block', width: '250px', height: '250px' }
      },
      mobile: {
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true',
        style: { display: 'block', width: '100%', height: '50px' }
      }
    };
    return configs[size] || configs.horizontal;
  };

  // Validate ad configuration
  const isValidAdConfig = () => {
    if (!adConfig.isValid()) {
      console.error('Invalid AdSense publisher ID');
      return false;
    }
    
    if (adSlot && !adConfig.validateAdSlot(adSlot)) {
      console.error('Invalid ad slot ID:', adSlot);
      return false;
    }
    
    return true;
  };

  // Initialize AdSense ad with security validation
  useEffect(() => {
    if (!placeholder && adRef.current && window.adsbygoogle && isValidAdConfig()) {
      try {
        // Additional security check: ensure we're on HTTPS in production
        if (import.meta.env.PROD && window.location.protocol !== 'https:') {
          console.error('AdSense requires HTTPS in production');
          return;
        }
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [placeholder, adSlot]);

  // Real AdSense ad
  if (!placeholder) {
    const config = getAdSenseConfig();
    
    return (
      <div className={`
        ${sizeClasses[size]} 
        ${positionClasses[position]}
        ${className}
        min-h-0
      `}>
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={config.style}
          data-ad-client="ca-pub-5458357692522592"
          data-ad-slot={adSlot || "auto"}
          {...(config['data-ad-format'] && { 'data-ad-format': config['data-ad-format'] })}
          {...(config['data-full-width-responsive'] && { 'data-full-width-responsive': config['data-full-width-responsive'] })}
        ></ins>
      </div>
    );
  }
};

export default AdBanner;