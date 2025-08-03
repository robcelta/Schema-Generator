export const generateSchema = (selectedSchema, formData) => {
  const schema = { "@context": "https://schema.org" };
  
  if (selectedSchema === 'LocalBusiness') {
    schema["@type"] = "LocalBusiness";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.telephone = formData.telephone || "";
    schema.email = formData.email || "";
    schema.url = formData.url || "";
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: formData.streetAddress || "",
      addressLocality: formData.addressLocality || "",
      addressRegion: formData.addressRegion || "",
      postalCode: formData.postalCode || "",
      addressCountry: formData.addressCountry || ""
    };
    if (formData.priceRange) schema.priceRange = formData.priceRange;
    if (formData.openingHours) schema.openingHours = formData.openingHours;
  } else if (selectedSchema === 'Article') {
    schema["@type"] = "Article";
    schema.headline = formData.headline || "";
    schema.description = formData.description || "";
    schema.author = {
      "@type": "Person",
      name: formData.author || ""
    };
    schema.datePublished = formData.datePublished || "";
    schema.dateModified = formData.dateModified || formData.datePublished || "";
    schema.url = formData.url || "";
    schema.publisher = {
      "@type": "Organization",
      name: formData.publisher || ""
    };
    if (formData.image) schema.image = formData.image;
    if (formData.mainEntityOfPage) schema.mainEntityOfPage = formData.mainEntityOfPage;
  } else if (selectedSchema === 'Product') {
    schema["@type"] = "Product";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.brand = {
      "@type": "Brand",
      name: formData.brand || ""
    };
    if (formData.sku) schema.sku = formData.sku;
    if (formData.image) schema.image = formData.image;
    schema.offers = {
      "@type": "Offer",
      price: formData.price || "",
      priceCurrency: formData.priceCurrency || "USD",
      availability: `https://schema.org/${formData.availability || "InStock"}`,
      url: formData.url || ""
    };
    if (formData.condition) schema.offers.itemCondition = `https://schema.org/${formData.condition}`;
  } else if (selectedSchema === 'Event') {
    schema["@type"] = "Event";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.startDate = formData.startDate || "";
    if (formData.endDate) schema.endDate = formData.endDate;
    schema.location = {
      "@type": "Place",
      name: formData.locationName || "",
      address: {
        "@type": "PostalAddress",
        streetAddress: formData.streetAddress || "",
        addressLocality: formData.addressLocality || "",
        addressRegion: formData.addressRegion || "",
        postalCode: formData.postalCode || "",
        addressCountry: formData.addressCountry || ""
      }
    };
    schema.organizer = {
      "@type": "Organization",
      name: formData.organizer || ""
    };
    if (formData.url) schema.url = formData.url;
    if (formData.image) schema.image = formData.image;
  } else if (selectedSchema === 'Organization') {
    schema["@type"] = "Organization";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.url = formData.url || "";
    if (formData.logo) schema.logo = formData.logo;
    if (formData.telephone) schema.telephone = formData.telephone;
    if (formData.email) schema.email = formData.email;
    if (formData.streetAddress) {
      schema.address = {
        "@type": "PostalAddress",
        streetAddress: formData.streetAddress || "",
        addressLocality: formData.addressLocality || "",
        addressRegion: formData.addressRegion || "",
        postalCode: formData.postalCode || "",
        addressCountry: formData.addressCountry || ""
      };
    }
    if (formData.foundingDate) schema.foundingDate = formData.foundingDate;
  } else if (selectedSchema === 'BreadcrumbList') {
    schema["@type"] = "BreadcrumbList";
    schema.itemListElement = [];
    
    if (formData.breadcrumbs && Array.isArray(formData.breadcrumbs)) {
      formData.breadcrumbs.forEach((item, index) => {
        if (item.name && item.url) {
          schema.itemListElement.push({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          });
        }
      });
    }
  } else if (selectedSchema === 'FAQPage') {
    schema["@type"] = "FAQPage";
    schema.mainEntity = [];
    
    if (formData.questions && Array.isArray(formData.questions)) {
      formData.questions.forEach((item) => {
        if (item.question && item.answer) {
          schema.mainEntity.push({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          });
        }
      });
    }
  } else if (selectedSchema === 'Review') {
    schema["@type"] = "Review";
    schema.reviewBody = formData.reviewBody || "";
    schema.reviewRating = {
      "@type": "Rating",
      ratingValue: formData.reviewRating || "",
      bestRating: "5"
    };
    schema.author = {
      "@type": "Person",
      name: formData.author || ""
    };
    schema.datePublished = formData.datePublished || "";
    schema.itemReviewed = {
      "@type": "Thing",
      name: formData.itemReviewed || ""
    };
    if (formData.publisher) {
      schema.publisher = {
        "@type": "Organization",
        name: formData.publisher
      };
    }
  } else if (selectedSchema === 'HowTo') {
    schema["@type"] = "HowTo";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    if (formData.totalTime) schema.totalTime = formData.totalTime;
    if (formData.supply) {
      schema.supply = formData.supply.split(',').map(item => item.trim()).filter(item => item);
    }
    if (formData.tool) {
      schema.tool = formData.tool.split(',').map(item => item.trim()).filter(item => item);
    }
    
    schema.step = [];
    if (formData.steps && Array.isArray(formData.steps)) {
      formData.steps.forEach((step) => {
        if (step.name && step.text) {
          const stepObj = {
            "@type": "HowToStep",
            name: step.name,
            text: step.text
          };
          if (step.image) stepObj.image = step.image;
          schema.step.push(stepObj);
        }
      });
    }
  } else if (selectedSchema === 'Recipe') {
    schema["@type"] = "Recipe";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.author = {
      "@type": "Person",
      name: formData.author || ""
    };
    if (formData.prepTime) schema.prepTime = formData.prepTime;
    if (formData.cookTime) schema.cookTime = formData.cookTime;
    if (formData.totalTime) schema.totalTime = formData.totalTime;
    if (formData.recipeYield) schema.recipeYield = formData.recipeYield;
    if (formData.recipeCategory) schema.recipeCategory = formData.recipeCategory;
    if (formData.recipeCuisine) schema.recipeCuisine = formData.recipeCuisine;
    if (formData.image) schema.image = formData.image;
    if (formData.keywords) schema.keywords = formData.keywords;
    
    if (formData.recipeIngredient) {
      schema.recipeIngredient = formData.recipeIngredient.split('\n').map(item => item.trim()).filter(item => item);
    }
    if (formData.recipeInstructions) {
      schema.recipeInstructions = formData.recipeInstructions.split('\n').map((instruction, index) => ({
        "@type": "HowToStep",
        text: instruction.trim()
      })).filter(step => step.text);
    }
  } else if (selectedSchema === 'VideoObject') {
    schema["@type"] = "VideoObject";
    schema.name = formData.name || "";
    schema.description = formData.description || "";
    schema.thumbnailUrl = formData.thumbnailUrl || "";
    schema.uploadDate = formData.uploadDate || "";
    if (formData.duration) schema.duration = formData.duration;
    if (formData.contentUrl) schema.contentUrl = formData.contentUrl;
    if (formData.embedUrl) schema.embedUrl = formData.embedUrl;
    if (formData.author) {
      schema.author = {
        "@type": "Person",
        name: formData.author
      };
    }
    if (formData.publisher) {
      schema.publisher = {
        "@type": "Organization",
        name: formData.publisher
      };
    }
  }

  return JSON.stringify(schema, null, 2);
};

export const generateScript = (selectedSchema, formData) => {
  const schemaJson = generateSchema(selectedSchema, formData);
  return `<script type="application/ld+json">
${schemaJson}
</script>`;
};