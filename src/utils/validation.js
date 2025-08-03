export const isValidUrl = (string) => {
  try {
    new URL(string);
    return string.startsWith('http://') || string.startsWith('https://');
  } catch (_) {
    return false;
  }
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

export const validateSchema = (selectedSchema, formData) => {
  const errors = [];
  const warnings = [];
  
  if (selectedSchema === 'LocalBusiness') {
    if (!formData.name?.trim()) errors.push('Business name is required');
    if (!formData.description?.trim()) errors.push('Business description is required');
    if (!formData.telephone?.trim()) errors.push('Phone number is required');
    if (!formData.url?.trim()) errors.push('Website URL is required');
    if (!formData.streetAddress?.trim()) errors.push('Street address is required');
    if (!formData.addressLocality?.trim()) errors.push('City is required');
    if (!formData.addressRegion?.trim()) errors.push('State/Region is required');
    if (!formData.postalCode?.trim()) errors.push('Postal code is required');
    if (!formData.addressCountry?.trim()) errors.push('Country is required');
    
    if (formData.url && !isValidUrl(formData.url)) {
      errors.push('Website URL must be a valid URL (include https://)');
    }
    if (formData.telephone && !isValidPhone(formData.telephone)) {
      warnings.push('Phone number format could be improved (e.g., +1-555-123-4567)');
    }
  }
  
  if (selectedSchema === 'Article') {
    if (!formData.headline?.trim()) errors.push('Article title is required');
    if (!formData.description?.trim()) errors.push('Article description is required');
    if (!formData.author?.trim()) errors.push('Author name is required');
    if (!formData.datePublished?.trim()) errors.push('Publication date is required');
    if (!formData.url?.trim()) errors.push('Article URL is required');
    if (!formData.publisher?.trim()) errors.push('Publisher name is required');
    
    if (formData.url && !isValidUrl(formData.url)) {
      errors.push('Article URL must be a valid URL');
    }
    if (formData.image && !isValidUrl(formData.image)) {
      warnings.push('Featured image should be a valid URL');
    }
    if (formData.headline && formData.headline.length > 110) {
      warnings.push('Headlines over 110 characters may be truncated in search results');
    }
  }
  
  if (selectedSchema === 'Product') {
    if (!formData.name?.trim()) errors.push('Product name is required');
    if (!formData.description?.trim()) errors.push('Product description is required');
    if (!formData.brand?.trim()) errors.push('Brand name is required');
    if (!formData.price?.trim()) errors.push('Price is required');
    if (!formData.priceCurrency?.trim()) errors.push('Currency is required');
    if (!formData.availability?.trim()) errors.push('Availability is required');
    if (!formData.url?.trim()) errors.push('Product URL is required');
    
    if (formData.price && isNaN(parseFloat(formData.price))) {
      errors.push('Price must be a valid number');
    }
    if (formData.url && !isValidUrl(formData.url)) {
      errors.push('Product URL must be a valid URL');
    }
    if (!formData.image) {
      warnings.push('Adding a product image URL improves SEO performance');
    }
  }
  
  if (selectedSchema === 'Event') {
    if (!formData.name?.trim()) errors.push('Event name is required');
    if (!formData.description?.trim()) errors.push('Event description is required');
    if (!formData.startDate?.trim()) errors.push('Start date is required');
    if (!formData.locationName?.trim()) errors.push('Venue name is required');
    if (!formData.streetAddress?.trim()) errors.push('Street address is required');
    if (!formData.addressLocality?.trim()) errors.push('City is required');
    if (!formData.addressRegion?.trim()) errors.push('State/Region is required');
    if (!formData.postalCode?.trim()) errors.push('Postal code is required');
    if (!formData.addressCountry?.trim()) errors.push('Country is required');
    if (!formData.organizer?.trim()) errors.push('Organizer name is required');
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.push('End date must be after start date');
    }
    if (formData.url && !isValidUrl(formData.url)) {
      warnings.push('Event URL should be a valid URL');
    }
  }
  
  if (selectedSchema === 'Organization') {
    if (!formData.name?.trim()) errors.push('Organization name is required');
    if (!formData.description?.trim()) errors.push('Description is required');
    if (!formData.url?.trim()) errors.push('Website URL is required');
    
    if (formData.url && !isValidUrl(formData.url)) {
      errors.push('Website URL must be a valid URL');
    }
    if (formData.logo && !isValidUrl(formData.logo)) {
      warnings.push('Logo should be a valid URL');
    }
    if (!formData.logo) {
      warnings.push('Adding a logo URL helps with brand recognition in search results');
    }
  }

  if (selectedSchema === 'BreadcrumbList') {
    if (!formData.breadcrumbs || !Array.isArray(formData.breadcrumbs) || formData.breadcrumbs.length === 0) {
      errors.push('At least one breadcrumb item is required');
    } else {
      formData.breadcrumbs.forEach((item, index) => {
        if (!item.name?.trim()) {
          errors.push(`Breadcrumb item ${index + 1}: Page name is required`);
        }
        if (!item.url?.trim()) {
          errors.push(`Breadcrumb item ${index + 1}: Page URL is required`);
        } else if (!isValidUrl(item.url)) {
          errors.push(`Breadcrumb item ${index + 1}: Page URL must be a valid URL`);
        }
      });
      
      if (formData.breadcrumbs.length < 2) {
        warnings.push('Breadcrumbs work best with at least 2 items to show navigation hierarchy');
      }
    }
  }

  if (selectedSchema === 'FAQPage') {
    if (!formData.questions || !Array.isArray(formData.questions) || formData.questions.length === 0) {
      errors.push('At least one FAQ item is required');
    } else {
      formData.questions.forEach((item, index) => {
        if (!item.question?.trim()) {
          errors.push(`FAQ item ${index + 1}: Question is required`);
        }
        if (!item.answer?.trim()) {
          errors.push(`FAQ item ${index + 1}: Answer is required`);
        }
        if (item.question && item.question.length > 200) {
          warnings.push(`FAQ item ${index + 1}: Questions over 200 characters may be truncated in search results`);
        }
        if (item.answer && item.answer.length < 50) {
          warnings.push(`FAQ item ${index + 1}: Detailed answers (50+ characters) provide better SEO value`);
        }
      });
      
      if (formData.questions.length < 3) {
        warnings.push('FAQ pages work best with at least 3-5 questions for optimal SEO impact');
      }
    }
  }

  if (selectedSchema === 'Review') {
    if (!formData.reviewBody?.trim()) errors.push('Review text is required');
    if (!formData.reviewRating?.trim()) errors.push('Rating is required');
    if (!formData.author?.trim()) errors.push('Reviewer name is required');
    if (!formData.datePublished?.trim()) errors.push('Review date is required');
    if (!formData.itemReviewed?.trim()) errors.push('Item being reviewed is required');
    
    if (formData.reviewRating) {
      const rating = parseFloat(formData.reviewRating);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be a number between 1 and 5');
      }
    }
    if (formData.reviewBody && formData.reviewBody.length < 50) {
      warnings.push('Detailed reviews (50+ characters) provide better SEO value');
    }
  }

  if (selectedSchema === 'HowTo') {
    if (!formData.name?.trim()) errors.push('Guide title is required');
    if (!formData.description?.trim()) errors.push('Guide description is required');
    if (!formData.steps || !Array.isArray(formData.steps) || formData.steps.length === 0) {
      errors.push('At least one instruction step is required');
    } else {
      formData.steps.forEach((step, index) => {
        if (!step.name?.trim()) {
          errors.push(`Step ${index + 1}: Step title is required`);
        }
        if (!step.text?.trim()) {
          errors.push(`Step ${index + 1}: Step instructions are required`);
        }
        if (step.image && !isValidUrl(step.image)) {
          warnings.push(`Step ${index + 1}: Step image should be a valid URL`);
        }
      });
      
      if (formData.steps.length < 3) {
        warnings.push('How-to guides work best with at least 3 steps for comprehensive instructions');
      }
    }
    
    if (formData.totalTime && !formData.totalTime.match(/^PT\d+[HM]?/)) {
      warnings.push('Total time should use ISO 8601 format (e.g., PT30M for 30 minutes)');
    }
  }

  if (selectedSchema === 'Recipe') {
    if (!formData.name?.trim()) errors.push('Recipe name is required');
    if (!formData.description?.trim()) errors.push('Recipe description is required');
    if (!formData.author?.trim()) errors.push('Recipe author is required');
    if (!formData.recipeIngredient?.trim()) errors.push('Ingredients are required');
    if (!formData.recipeInstructions?.trim()) errors.push('Instructions are required');
    
    if (formData.image && !isValidUrl(formData.image)) {
      warnings.push('Recipe image should be a valid URL');
    }
    if (!formData.image) {
      warnings.push('Adding a recipe image greatly improves search visibility');
    }
    if (formData.prepTime && !formData.prepTime.match(/^PT\d+[HM]?/)) {
      warnings.push('Prep time should use ISO 8601 format (e.g., PT15M for 15 minutes)');
    }
    if (formData.cookTime && !formData.cookTime.match(/^PT\d+[HM]?/)) {
      warnings.push('Cook time should use ISO 8601 format (e.g., PT30M for 30 minutes)');
    }
    if (!formData.recipeYield) {
      warnings.push('Adding yield/servings helps users plan portions');
    }
  }

  if (selectedSchema === 'VideoObject') {
    if (!formData.name?.trim()) errors.push('Video title is required');
    if (!formData.description?.trim()) errors.push('Video description is required');
    if (!formData.thumbnailUrl?.trim()) errors.push('Thumbnail image URL is required');
    if (!formData.uploadDate?.trim()) errors.push('Upload date is required');
    
    if (formData.thumbnailUrl && !isValidUrl(formData.thumbnailUrl)) {
      errors.push('Thumbnail URL must be a valid URL');
    }
    if (formData.contentUrl && !isValidUrl(formData.contentUrl)) {
      warnings.push('Video file URL should be a valid URL');
    }
    if (formData.embedUrl && !isValidUrl(formData.embedUrl)) {
      warnings.push('Embed URL should be a valid URL');
    }
    if (formData.duration && !formData.duration.match(/^PT\d+[HMS]?/)) {
      warnings.push('Duration should use ISO 8601 format (e.g., PT5M30S for 5 minutes 30 seconds)');
    }
    if (!formData.contentUrl && !formData.embedUrl) {
      warnings.push('Adding either a video file URL or embed URL improves discoverability');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};