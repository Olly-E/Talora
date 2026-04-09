# Cloudinary Setup Guide

## Getting Your Cloudinary API Keys

Follow these steps to get your Cloudinary credentials and complete the setup:

### Step 1: Create a Cloudinary Account

1. **Go to Cloudinary**: Visit [https://cloudinary.com/](https://cloudinary.com/)
2. **Sign Up**: Click "Sign Up Free" button
3. **Fill in your details**:
   - Email address
   - Password
   - Choose your role (e.g., Developer, Designer)
   - Accept terms and conditions
4. **Verify your email**: Check your inbox and click the verification link

### Step 2: Access Your Dashboard

1. **Log in** to your Cloudinary account
2. You'll be taken to your **Dashboard** automatically
3. The dashboard shows your account usage and API credentials

### Step 3: Get Your API Credentials

On your dashboard, you'll see a section called **"Account Details"** or **"Product Environment Credentials"**:

```
Cloud name: your-cloud-name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

**Important Notes:**
- **Cloud Name**: This is your unique identifier (visible in URLs)
- **API Key**: Public key (safe to use in client-side code)
- **API Secret**: Private key (NEVER expose in client-side code or commit to version control)

### Step 4: Copy Your Credentials

1. Click on the **"eye" icon** next to API Secret to reveal it
2. Click the **copy icon** to copy each credential
3. Keep these handy for the next step

### Step 5: Update Your .env.local File

Open your `.env.local` file and replace the placeholder values:

```env
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

### Step 6: Restart Your Development Server

After updating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 7: Test the Upload

1. Log in to your admin dashboard (`/godmode`)
2. Go to **Articles Management**
3. Click **Create New Article**
4. Try uploading an image using the file upload button
5. You should see the image uploaded and the URL auto-filled

## Cloudinary Features You Get

✅ **Free Tier Includes:**
- 25 GB storage
- 25 GB monthly bandwidth
- Image and video optimization
- Transformations and filters
- CDN delivery worldwide

## Folder Structure

Your uploaded images will be organized in:
```
cloudinary.com/your-cloud-name/image/upload/talora/articles/filename.jpg
```

## Security Best Practices

1. ✅ **Never commit** `.env.local` to version control
2. ✅ **API Secret** is only used on the server-side (already configured in `/app/lib/cloudinary.ts`)
3. ✅ **Upload endpoint** is protected with authentication (only logged-in admins can upload)
4. ✅ **File validation** is in place (5MB limit, images only)

## Optional: Configure Upload Presets

For more control over uploads:

1. Go to **Settings** > **Upload** in Cloudinary dashboard
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - Folder: `talora/articles`
   - Mode: `Unsigned` (for client-side) or `Signed` (for server-side - recommended)
   - Transformations: Auto-optimize quality, format
   - Allowed formats: jpg, png, webp, gif

## Troubleshooting

### "Invalid API credentials"
- Double-check your `.env.local` values
- Make sure there are no extra spaces
- Restart your dev server after changing env vars

### "Upload failed"
- Check file size (must be < 5MB)
- Verify file is an image (jpg, png, gif, webp)
- Check your Cloudinary dashboard quota

### "Image not displaying"
- Verify the URL in the database
- Check if the image exists in Cloudinary dashboard
- Ensure URL is public (not private)

## Additional Resources

- 📚 [Cloudinary Documentation](https://cloudinary.com/documentation)
- 🎥 [Video Tutorials](https://cloudinary.com/documentation/video_tutorials)
- 💬 [Community Forum](https://community.cloudinary.com/)
- 📧 [Support](https://support.cloudinary.com/)

---

**Need Help?** Contact Cloudinary support or check their extensive documentation.
