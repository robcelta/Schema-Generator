/**
 * Security utilities for input sanitization and validation
 * Prevents XSS, injection attacks, and malicious content
 */

// HTML entities for encoding
const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

// Dangerous patterns to detect and prevent
const DANGEROUS_PATTERNS = [
  // Script tags
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  // Event handlers
  /on\w+\s*=/gi,
  // JavaScript URLs
  /javascript:/gi,
  // Data URLs with scripts
  /data:\s*text\/html/gi,
  // Style expressions (IE)
  /expression\s*\(/gi,
  // Import statements
  /@import/gi,
  // CSS behavior
  /behavior\s*:/gi,
  // Vbscript
  /vbscript:/gi,
  // Object/embed tags
  /<(object|embed|iframe|frame|frameset)\b/gi,
  // Meta refresh
  /<meta[^>]*http-equiv[^>]*refresh/gi,
  // Link with javascript
  /<link[^>]*href[^>]*javascript:/gi,
];

// SQL injection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
  /('|(\\')|(;)|(--)|(\|\|)|(\/\*)|(\*\/))/gi,
];

/**
 * Sanitize HTML content by encoding potentially dangerous characters
 * @param {string} str - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeHtml = (str) => {
  if (typeof str !== 'string') return '';
  
  return str.replace(/[&<>"'\/]/g, (match) => HTML_ENTITIES[match] || match);
};

/**
 * Deep sanitize an object recursively
 * @param {any} obj - Object to sanitize
 * @returns {any} Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize both key and value
      const cleanKey = sanitizeInput(key);
      sanitized[cleanKey] = sanitizeObject(value);
    }
    return sanitized;
  }
  
  return obj;
};

/**
 * Comprehensive input sanitization
 * @param {string} input - User input to sanitize
 * @param {Object} options - Sanitization options
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input, options = {}) => {
  if (typeof input !== 'string') return '';
  
  const {
    allowHtml = false,
    maxLength = 10000,
    trimWhitespace = true,
    preventSqlInjection = true,
  } = options;
  
  let sanitized = input;
  
  // Trim whitespace if requested
  if (trimWhitespace) {
    sanitized = sanitized.trim();
  }
  
  // Enforce maximum length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  // Check for dangerous patterns
  if (containsDangerousContent(sanitized)) {
    console.warn('Dangerous content detected and blocked:', sanitized.substring(0, 100));
    return ''; // Return empty string for dangerous content
  }
  
  // SQL injection prevention
  if (preventSqlInjection && containsSqlInjection(sanitized)) {
    console.warn('Potential SQL injection detected and blocked:', sanitized.substring(0, 100));
    return '';
  }
  
  // HTML encoding if not allowing HTML
  if (!allowHtml) {
    sanitized = sanitizeHtml(sanitized);
  }
  
  return sanitized;
};

/**
 * Check if content contains dangerous patterns
 * @param {string} content - Content to check
 * @returns {boolean} True if dangerous content detected
 */
export const containsDangerousContent = (content) => {
  return DANGEROUS_PATTERNS.some(pattern => pattern.test(content));
};

/**
 * Check for SQL injection patterns
 * @param {string} content - Content to check
 * @returns {boolean} True if SQL injection detected
 */
export const containsSqlInjection = (content) => {
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(content));
};

/**
 * Validate and sanitize URL inputs
 * @param {string} url - URL to validate
 * @returns {string} Sanitized URL or empty string if invalid
 */
export const sanitizeUrl = (url) => {
  if (typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  
  // Check for dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file|ftp):/i;
  if (dangerousProtocols.test(trimmed)) {
    console.warn('Dangerous URL protocol detected:', trimmed);
    return '';
  }
  
  // Ensure it's a valid HTTP/HTTPS URL
  try {
    const urlObj = new URL(trimmed);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return urlObj.toString();
  } catch (e) {
    // If not a valid URL, try prefixing with https://
    if (!trimmed.includes('://')) {
      try {
        const urlObj = new URL('https://' + trimmed);
        return urlObj.toString();
      } catch (e2) {
        return '';
      }
    }
    return '';
  }
};

/**
 * Sanitize email addresses
 * @param {string} email - Email to sanitize
 * @returns {string} Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';
  
  const trimmed = email.trim().toLowerCase();
  
  // Basic email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmed)) {
    return '';
  }
  
  return trimmed;
};

/**
 * Sanitize phone numbers
 * @param {string} phone - Phone number to sanitize
 * @returns {string} Sanitized phone number
 */
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return '';
  
  // Remove all non-numeric characters except +, -, (, ), and spaces
  const cleaned = phone.replace(/[^+\d\s\-\(\)]/g, '');
  
  return cleaned.trim();
};

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  constructor(maxAttempts = 10, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }
  
  isAllowed(identifier = 'global') {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }
  
  reset(identifier = 'global') {
    this.attempts.delete(identifier);
  }
}

// Global rate limiter instance
export const formRateLimiter = new RateLimiter(20, 60000); // 20 submissions per minute

/**
 * Validate schema data before processing
 * @param {string} schemaType - Type of schema
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with sanitized data
 */
export const validateAndSanitizeSchemaData = (schemaType, formData) => {
  const errors = [];
  const sanitizedData = {};
  
  // Rate limiting check
  if (!formRateLimiter.isAllowed()) {
    errors.push('Too many requests. Please wait before submitting again.');
    return { isValid: false, errors, data: {} };
  }
  
  // Sanitize all form data
  for (const [key, value] of Object.entries(formData)) {
    const sanitizedKey = sanitizeInput(key, { maxLength: 100 });
    
    if (typeof value === 'string') {
      // Special handling for URLs
      if (key.includes('url') || key.includes('Url') || key === 'image' || key === 'logo') {
        sanitizedData[sanitizedKey] = sanitizeUrl(value);
      }
      // Special handling for emails
      else if (key.includes('email')) {
        sanitizedData[sanitizedKey] = sanitizeEmail(value);
      }
      // Special handling for phone numbers
      else if (key.includes('telephone') || key.includes('phone')) {
        sanitizedData[sanitizedKey] = sanitizePhone(value);
      }
      // General text sanitization
      else {
        sanitizedData[sanitizedKey] = sanitizeInput(value, {
          maxLength: key.includes('description') || key.includes('text') ? 5000 : 1000
        });
      }
    } else {
      // For arrays and objects (like breadcrumbs, questions, steps)
      sanitizedData[sanitizedKey] = sanitizeObject(value);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: sanitizedData
  };
};