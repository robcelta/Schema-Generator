# 🔒 Security Documentation

## Overview

This document outlines the comprehensive security measures implemented in the Schema Markup Generator to protect against various threats including XSS, injection attacks, data breaches, and unauthorized access.

## 🛡️ Security Features Implemented

### 1. **Input Sanitization & Validation**

#### XSS Prevention
- **HTML Entity Encoding**: All user inputs are sanitized using HTML entity encoding
- **Dangerous Pattern Detection**: Real-time scanning for script tags, event handlers, JavaScript URLs
- **Content Security Policy**: Strict CSP prevents inline script execution

#### SQL Injection Prevention  
- **Pattern Recognition**: Detects SQL keywords and injection patterns
- **Input Validation**: All database-related inputs are validated and sanitized

#### Implementation
```javascript
// Located in: src/utils/security.js
import { sanitizeInput, validateAndSanitizeSchemaData } from './utils/security';

// Automatic sanitization on all form inputs
const sanitizedData = sanitizeInput(userInput, {
  maxLength: 1000,
  allowHtml: false,
  preventSqlInjection: true
});
```

### 2. **Content Security Policy (CSP)**

Strict CSP headers prevent code injection and unauthorized resource loading:

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://pagead2.googlesyndication.com;
  style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
  img-src 'self' data: https: blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
```

### 3. **AdSense Security**

#### Environment Variable Protection
- Sensitive AdSense data stored in environment variables
- Publisher ID validation with regex patterns
- Ad slot ID validation before rendering
- HTTPS enforcement for ad serving

#### Implementation
```javascript
// Secure configuration in: src/config/adConfig.js
const validatePublisherId = (publisherId) => {
  const pubIdRegex = /^ca-pub-\d{16}$/;
  return pubIdRegex.test(publisherId);
};
```

### 4. **Rate Limiting**

Prevents abuse and DoS attacks:
- **Form Submissions**: Maximum 20 submissions per minute per IP
- **Automatic Reset**: Rate limits reset after time window
- **Client-side Implementation**: Reduces server load

### 5. **Security Headers**

Comprehensive HTTP security headers:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY  
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 6. **HTTPS Enforcement**

- **Production Requirements**: HTTPS mandatory for AdSense
- **Automatic Redirects**: HTTP traffic redirected to HTTPS
- **HSTS Headers**: Enforce HTTPS in browsers

## 🚨 Threat Mitigation

### Cross-Site Scripting (XSS)
- ✅ **Input Sanitization**: All user inputs sanitized
- ✅ **CSP Headers**: Prevent inline script execution  
- ✅ **Output Encoding**: Safe HTML rendering
- ✅ **React Protection**: Built-in XSS protection

### Injection Attacks
- ✅ **SQL Injection**: Pattern detection and blocking
- ✅ **Code Injection**: Script tag filtering
- ✅ **Command Injection**: Input validation

### Clickjacking
- ✅ **X-Frame-Options**: Prevent embedding in frames
- ✅ **CSP frame-ancestors**: Additional frame protection

### Man-in-the-Middle (MITM)
- ✅ **HTTPS Only**: SSL/TLS encryption required
- ✅ **HSTS Headers**: Force secure connections
- ✅ **Certificate Pinning**: In production environments

### Data Exposure
- ✅ **Environment Variables**: Sensitive data in env vars
- ✅ **Git Ignore**: Secrets excluded from version control
- ✅ **Client-side Validation**: No sensitive logic exposed

## 🔧 Configuration & Deployment

### Environment Variables Setup

1. **Copy template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Configure values**:
   ```bash
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-YOUR-REAL-ID
   VITE_ENABLE_ADS=true
   VITE_AD_SLOT_TOP_BANNER=YOUR-REAL-SLOT-ID
   ```

### Production Deployment Security

1. **Web Server Configuration**:
   - Use `security-headers.conf` with Nginx/Apache
   - Enable rate limiting at server level
   - Configure SSL/TLS properly

2. **Environment Security**:
   - Never commit `.env` files
   - Use secure hosting with HTTPS
   - Regular security updates

3. **Monitoring**:
   - Monitor for unusual traffic patterns
   - Log security violations
   - Set up alerts for failed requests

## 🔍 Security Audit Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] CSP headers tested and working
- [ ] Rate limiting functional
- [ ] HTTPS properly configured
- [ ] Input sanitization tested
- [ ] No sensitive data in client code

### Post-Deployment
- [ ] Security headers verified (use securityheaders.com)
- [ ] SSL certificate valid and properly configured
- [ ] CSP working without blocking legitimate content
- [ ] AdSense loading properly on HTTPS
- [ ] Rate limiting preventing abuse
- [ ] No console errors or warnings

### Regular Maintenance
- [ ] Update dependencies regularly
- [ ] Monitor security advisories
- [ ] Review and update CSP as needed
- [ ] Rotate API keys if compromised
- [ ] Check for new vulnerabilities

## 🛠️ Security Testing

### Manual Testing
```javascript
// Test XSS prevention
const maliciousInput = '<script>alert("XSS")</script>';
const sanitized = sanitizeInput(maliciousInput);
console.log(sanitized); // Should be encoded

// Test SQL injection prevention  
const sqlInjection = "'; DROP TABLE users; --";
const result = validateAndSanitizeSchemaData('LocalBusiness', { name: sqlInjection });
console.log(result.isValid); // Should be false
```

### Automated Testing
```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm audit fix

# Test CSP compliance
# Use browser dev tools Security tab
```

## 🚨 Incident Response

### If Security Breach Detected:

1. **Immediate Actions**:
   - Take affected systems offline if necessary
   - Change all API keys and secrets
   - Review logs for extent of breach

2. **Investigation**:
   - Identify attack vector
   - Assess data compromise
   - Document timeline of events

3. **Recovery**:
   - Deploy security patches
   - Update security measures
   - Restore services with enhanced monitoring

4. **Prevention**:
   - Update security documentation
   - Improve monitoring and alerting
   - Conduct security review

## 📞 Security Contacts

- **Security Issues**: Report to repository maintainer
- **AdSense Security**: [Google AdSense Support](https://support.google.com/adsense)
- **General Web Security**: [OWASP Guidelines](https://owasp.org/)

## 🔄 Security Updates

This security documentation is regularly updated. Last review: **January 2025**

### Change Log
- **v1.0**: Initial security implementation
- **v1.1**: Added CSP and rate limiting
- **v1.2**: Enhanced AdSense security and environment variables

---

**Remember**: Security is an ongoing process, not a one-time setup. Regular reviews and updates are essential for maintaining a secure application.