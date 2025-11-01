# Wix Product Page Redirect Setup Guide

## Goal
Redirect customers from Wix product pages to your Lovable frontend, while keeping products visible on Wix for checkout functionality.

## Why This Is Needed
- Products must remain visible/published on Wix for checkout to work
- But you don't want customers landing on Wix product pages
- Solution: Set up 301 redirects from Wix to your Lovable site

## Option 1: Manual Setup (Recommended - Simple & Reliable)

### Step-by-Step Instructions:

1. **Access Wix Dashboard**
   - Go to https://manage.wix.com
   - Select your Beauty Vault site

2. **Open URL Redirect Manager**
   - Click **Settings** (gear icon) in left sidebar
   - Select **SEO Tools**
   - Click **URL Redirect Manager**

3. **Create Wildcard Redirect**
   - Click **"+ New Redirect"** button
   - Configure the redirect:
     ```
     Old URL: /product-page/*
     New URL: https://your-lovable-site.lovable.app/product/*
     Redirect Type: 301 - Permanent
     ```
   - Click **Save**

4. **Test the Redirect**
   - Try accessing any Wix product page directly
   - You should be automatically redirected to your Lovable frontend

### What This Does:
- Any URL matching `your-wix-site.com/product-page/anything` will redirect to `your-lovable-site.com/product/anything`
- The `*` is a wildcard that captures the product slug
- 301 means it's a permanent redirect (good for SEO)

## Option 2: Individual Product Redirects

If you need more control, redirect each product individually:

1. **For each product:**
   ```
   Old URL: /product-page/rare-beauty-matte-lip-cream
   New URL: https://your-lovable-site.lovable.app/product/rare-beauty-matte-lip-cream
   Redirect Type: 301 - Permanent
   ```

2. **Repeat for all products**

## Option 3: Using Wix Velo Code (Advanced)

If you want to handle redirects programmatically:

1. **Open Wix Editor**
   - Go to your Wix site editor
   - Enable Dev Mode (if not already enabled)

2. **Add Code to Product Page**
   - Open the product page template
   - Add this code to the page code:
   
   ```javascript
   import wixLocation from 'wix-location';
   import wixWindow from 'wix-window';
   
   $w.onReady(function () {
     // Get current product slug from URL
     const currentPath = wixWindow.rendering.env === "browser" 
       ? wixLocation.path[wixLocation.path.length - 1]
       : "";
     
     if (currentPath) {
       // Redirect to Lovable frontend
       const lovableUrl = `https://your-lovable-site.lovable.app/product/${currentPath}`;
       wixLocation.to(lovableUrl, false); // false = external redirect
     }
   });
   ```

3. **Publish your Wix site**

## Verification Checklist

- [ ] Products are published/visible on Wix (for checkout)
- [ ] Redirects are configured in Wix URL Manager
- [ ] Test redirect: Try accessing a Wix product page directly
- [ ] Verify redirect goes to correct Lovable product page
- [ ] Checkout still works from Lovable site

## Important Notes

1. **Don't Hide Products**: Keep products published on Wix, just redirect the URLs
2. **Checkout URLs**: The checkout URLs from Wix will still work normally
3. **SEO Benefit**: 301 redirects pass SEO value to your Lovable site
4. **Testing**: Use incognito/private mode to test redirects without cache

## Troubleshooting

**Problem**: Redirect not working
- **Solution**: Clear browser cache and try in incognito mode
- **Solution**: Verify redirect is saved in Wix URL Manager
- **Solution**: Check that the redirect type is 301 Permanent

**Problem**: Checkout broken
- **Solution**: Don't hide/unpublish products, only set up URL redirects
- **Solution**: Ensure products have correct wix_id in database

**Problem**: Wrong destination URL
- **Solution**: Verify your Lovable site URL in redirect settings
- **Solution**: Check that product slugs match between Wix and Lovable

## Next Steps

After setting up redirects:
1. Test checkout flow from Lovable -> Wix checkout -> Success
2. Test that direct Wix product URLs redirect to Lovable
3. Monitor for any 404 errors
4. Update any existing links to point directly to Lovable URLs

## Alternative: Hide Wix Store Pages

If you want to completely prevent access to Wix store pages:

1. **Make Wix Site Password Protected**
   - This will require password for all pages except checkout
   - Checkout URLs with special tokens bypass the password

2. **Use Wix Members Area**
   - Restrict product pages to members only
   - Checkout URLs will still work for non-members

---

**Recommended Approach**: Option 1 (Manual Wildcard Redirect) is the simplest and most reliable solution.
