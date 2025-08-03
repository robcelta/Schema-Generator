import { Building, FileText, Star, Calendar, Users, Navigation, HelpCircle, MessageCircle, ListChecks, ChefHat, Play } from 'lucide-react';

export const schemaTypes = {
  LocalBusiness: {
    name: 'Local Business',
    icon: Building,
    description: 'Perfect for restaurants, shops, services, and local companies',
    fields: {
      name: { label: 'Business Name', type: 'text', required: true, placeholder: 'Your Business Name' },
      description: { label: 'Description', type: 'textarea', required: true, placeholder: 'Brief description of your business' },
      telephone: { label: 'Phone Number', type: 'tel', required: true, placeholder: '+1-555-123-4567' },
      email: { label: 'Email', type: 'email', required: false, placeholder: 'contact@yourbusiness.com' },
      url: { label: 'Website URL', type: 'url', required: true, placeholder: 'https://yourbusiness.com' },
      streetAddress: { label: 'Street Address', type: 'text', required: true, placeholder: '123 Main Street' },
      addressLocality: { label: 'City', type: 'text', required: true, placeholder: 'New York' },
      addressRegion: { label: 'State/Region', type: 'text', required: true, placeholder: 'NY' },
      postalCode: { label: 'Postal Code', type: 'text', required: true, placeholder: '10001' },
      addressCountry: { label: 'Country', type: 'text', required: true, placeholder: 'US' },
      priceRange: { label: 'Price Range', type: 'text', required: false, placeholder: '$$' },
      openingHours: { label: 'Opening Hours', type: 'text', required: false, placeholder: 'Mo-Fr 09:00-17:00' }
    }
  },
  Article: {
    name: 'Article/Blog Post',
    icon: FileText,
    description: 'Great for blog posts, news articles, and editorial content',
    fields: {
      headline: { label: 'Article Title', type: 'text', required: true, placeholder: 'Your Article Title' },
      description: { label: 'Article Description', type: 'textarea', required: true, placeholder: 'Brief summary of your article' },
      author: { label: 'Author Name', type: 'text', required: true, placeholder: 'John Doe' },
      datePublished: { label: 'Publication Date', type: 'date', required: true, placeholder: '' },
      dateModified: { label: 'Last Modified', type: 'date', required: false, placeholder: '' },
      url: { label: 'Article URL', type: 'url', required: true, placeholder: 'https://yourblog.com/article' },
      image: { label: 'Featured Image URL', type: 'url', required: false, placeholder: 'https://yourblog.com/image.jpg' },
      publisher: { label: 'Publisher Name', type: 'text', required: true, placeholder: 'Your Blog Name' },
      mainEntityOfPage: { label: 'Main Page URL', type: 'url', required: false, placeholder: 'https://yourblog.com' }
    }
  },
  Product: {
    name: 'Product',
    icon: Star,
    description: 'Essential for e-commerce and product showcase pages',
    fields: {
      name: { label: 'Product Name', type: 'text', required: true, placeholder: 'Amazing Product' },
      description: { label: 'Product Description', type: 'textarea', required: true, placeholder: 'Detailed description of your product' },
      brand: { label: 'Brand Name', type: 'text', required: true, placeholder: 'Your Brand' },
      sku: { label: 'SKU', type: 'text', required: false, placeholder: 'ABC123' },
      image: { label: 'Product Image URL', type: 'url', required: false, placeholder: 'https://yourstore.com/product.jpg' },
      price: { label: 'Price', type: 'number', required: true, placeholder: '99.99' },
      priceCurrency: { label: 'Currency', type: 'text', required: true, placeholder: 'USD' },
      availability: { label: 'Availability', type: 'select', required: true, options: ['InStock', 'OutOfStock', 'PreOrder'], placeholder: 'InStock' },
      condition: { label: 'Condition', type: 'select', required: false, options: ['NewCondition', 'UsedCondition', 'RefurbishedCondition'], placeholder: 'NewCondition' },
      url: { label: 'Product URL', type: 'url', required: true, placeholder: 'https://yourstore.com/product' }
    }
  },
  Event: {
    name: 'Event',
    icon: Calendar,
    description: 'Perfect for conferences, workshops, concerts, and meetings',
    fields: {
      name: { label: 'Event Name', type: 'text', required: true, placeholder: 'Amazing Conference 2024' },
      description: { label: 'Event Description', type: 'textarea', required: true, placeholder: 'What this event is about' },
      startDate: { label: 'Start Date & Time', type: 'datetime-local', required: true, placeholder: '' },
      endDate: { label: 'End Date & Time', type: 'datetime-local', required: false, placeholder: '' },
      locationName: { label: 'Venue Name', type: 'text', required: true, placeholder: 'Convention Center' },
      streetAddress: { label: 'Street Address', type: 'text', required: true, placeholder: '123 Event Street' },
      addressLocality: { label: 'City', type: 'text', required: true, placeholder: 'New York' },
      addressRegion: { label: 'State/Region', type: 'text', required: true, placeholder: 'NY' },
      postalCode: { label: 'Postal Code', type: 'text', required: true, placeholder: '10001' },
      addressCountry: { label: 'Country', type: 'text', required: true, placeholder: 'US' },
      organizer: { label: 'Organizer Name', type: 'text', required: true, placeholder: 'Event Company' },
      url: { label: 'Event URL', type: 'url', required: false, placeholder: 'https://yourevent.com' },
      image: { label: 'Event Image URL', type: 'url', required: false, placeholder: 'https://yourevent.com/image.jpg' }
    }
  },
  Organization: {
    name: 'Organization',
    icon: Users,
    description: 'Ideal for companies, nonprofits, and institutions',
    fields: {
      name: { label: 'Organization Name', type: 'text', required: true, placeholder: 'Your Organization' },
      description: { label: 'Description', type: 'textarea', required: true, placeholder: 'What your organization does' },
      url: { label: 'Website URL', type: 'url', required: true, placeholder: 'https://yourorg.com' },
      logo: { label: 'Logo URL', type: 'url', required: false, placeholder: 'https://yourorg.com/logo.png' },
      telephone: { label: 'Phone Number', type: 'tel', required: false, placeholder: '+1-555-123-4567' },
      email: { label: 'Email', type: 'email', required: false, placeholder: 'info@yourorg.com' },
      streetAddress: { label: 'Street Address', type: 'text', required: false, placeholder: '123 Organization St' },
      addressLocality: { label: 'City', type: 'text', required: false, placeholder: 'New York' },
      addressRegion: { label: 'State/Region', type: 'text', required: false, placeholder: 'NY' },
      postalCode: { label: 'Postal Code', type: 'text', required: false, placeholder: '10001' },
      addressCountry: { label: 'Country', type: 'text', required: false, placeholder: 'US' },
      foundingDate: { label: 'Founded Date', type: 'date', required: false, placeholder: '' }
    }
  },
  BreadcrumbList: {
    name: 'Breadcrumbs',
    icon: Navigation,
    description: 'Navigation breadcrumbs to show page hierarchy and improve SEO',
    fields: {
      breadcrumbs: { 
        label: 'Breadcrumb Items', 
        type: 'array', 
        required: true, 
        placeholder: '',
        itemFields: {
          name: { label: 'Page Name', type: 'text', required: true, placeholder: 'Home' },
          url: { label: 'Page URL', type: 'url', required: true, placeholder: 'https://example.com' }
        }
      }
    }
  },
  FAQPage: {
    name: 'FAQ',
    icon: HelpCircle,
    description: 'Frequently Asked Questions to enhance search visibility',
    fields: {
      questions: { 
        label: 'FAQ Items', 
        type: 'array', 
        required: true, 
        placeholder: '',
        itemFields: {
          question: { label: 'Question', type: 'text', required: true, placeholder: 'What is your return policy?' },
          answer: { label: 'Answer', type: 'textarea', required: true, placeholder: 'Our return policy allows...' }
        }
      }
    }
  },
  Review: {
    name: 'Review',
    icon: MessageCircle,
    description: 'Customer reviews and ratings for products or services',
    fields: {
      reviewBody: { label: 'Review Text', type: 'textarea', required: true, placeholder: 'This product is amazing because...' },
      reviewRating: { label: 'Rating (1-5)', type: 'number', required: true, placeholder: '5', min: 1, max: 5 },
      author: { label: 'Reviewer Name', type: 'text', required: true, placeholder: 'John Smith' },
      datePublished: { label: 'Review Date', type: 'date', required: true, placeholder: '' },
      itemReviewed: { label: 'Item Being Reviewed', type: 'text', required: true, placeholder: 'Product or Service Name' },
      publisher: { label: 'Publisher/Website', type: 'text', required: false, placeholder: 'Your Website Name' }
    }
  },
  HowTo: {
    name: 'How-To Guide',
    icon: ListChecks,
    description: 'Step-by-step instructions and tutorials',
    fields: {
      name: { label: 'Guide Title', type: 'text', required: true, placeholder: 'How to Install a Ceiling Fan' },
      description: { label: 'Guide Description', type: 'textarea', required: true, placeholder: 'Learn how to safely install a ceiling fan in your home...' },
      totalTime: { label: 'Total Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT30M (30 minutes)' },
      supply: { label: 'Supplies Needed', type: 'textarea', required: false, placeholder: 'List supplies separated by commas' },
      tool: { label: 'Tools Needed', type: 'textarea', required: false, placeholder: 'List tools separated by commas' },
      steps: { 
        label: 'Instructions', 
        type: 'array', 
        required: true, 
        placeholder: '',
        itemFields: {
          name: { label: 'Step Title', type: 'text', required: true, placeholder: 'Turn off power at breaker' },
          text: { label: 'Step Instructions', type: 'textarea', required: true, placeholder: 'Detailed instructions for this step...' },
          image: { label: 'Step Image URL', type: 'url', required: false, placeholder: 'https://example.com/step1.jpg' }
        }
      }
    }
  },
  Recipe: {
    name: 'Recipe',
    icon: ChefHat,
    description: 'Cooking recipes with ingredients and instructions',
    fields: {
      name: { label: 'Recipe Name', type: 'text', required: true, placeholder: 'Chocolate Chip Cookies' },
      description: { label: 'Recipe Description', type: 'textarea', required: true, placeholder: 'Delicious homemade chocolate chip cookies...' },
      author: { label: 'Recipe Author', type: 'text', required: true, placeholder: 'Chef Johnson' },
      prepTime: { label: 'Prep Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT15M (15 minutes)' },
      cookTime: { label: 'Cook Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT12M (12 minutes)' },
      totalTime: { label: 'Total Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT27M (27 minutes)' },
      recipeYield: { label: 'Servings/Yield', type: 'text', required: false, placeholder: '24 cookies' },
      recipeCategory: { label: 'Recipe Category', type: 'text', required: false, placeholder: 'Dessert' },
      recipeCuisine: { label: 'Cuisine Type', type: 'text', required: false, placeholder: 'American' },
      image: { label: 'Recipe Image URL', type: 'url', required: false, placeholder: 'https://example.com/cookies.jpg' },
      recipeIngredient: { label: 'Ingredients', type: 'textarea', required: true, placeholder: 'List ingredients, one per line' },
      recipeInstructions: { label: 'Instructions', type: 'textarea', required: true, placeholder: 'List instructions, one per line' },
      keywords: { label: 'Keywords', type: 'text', required: false, placeholder: 'cookies, dessert, baking' }
    }
  },
  VideoObject: {
    name: 'Video',
    icon: Play,
    description: 'Video content for enhanced search visibility',
    fields: {
      name: { label: 'Video Title', type: 'text', required: true, placeholder: 'How to Make Perfect Coffee' },
      description: { label: 'Video Description', type: 'textarea', required: true, placeholder: 'Learn the secrets to brewing the perfect cup of coffee...' },
      thumbnailUrl: { label: 'Thumbnail Image URL', type: 'url', required: true, placeholder: 'https://example.com/thumbnail.jpg' },
      uploadDate: { label: 'Upload Date', type: 'date', required: true, placeholder: '' },
      duration: { label: 'Duration (ISO 8601)', type: 'text', required: false, placeholder: 'PT5M30S (5 minutes 30 seconds)' },
      contentUrl: { label: 'Video File URL', type: 'url', required: false, placeholder: 'https://example.com/video.mp4' },
      embedUrl: { label: 'Embed URL', type: 'url', required: false, placeholder: 'https://youtube.com/embed/xyz' },
      author: { label: 'Video Creator', type: 'text', required: false, placeholder: 'Your Channel Name' },
      publisher: { label: 'Publisher', type: 'text', required: false, placeholder: 'Your Website' }
    }
  }
};