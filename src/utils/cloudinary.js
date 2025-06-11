// Cloudinary upload utility
export const uploadToCloudinary = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Create form data for Cloudinary upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dbs_group_preset'); // You'll need to create this preset in Cloudinary
  formData.append('folder', 'client_logos');

  try {
    // Replace 'your_cloud_name' with your actual Cloudinary cloud name
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name'}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      imageUrl: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

// Helper function to transform Cloudinary URLs (optional)
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
};

// Helper to delete image from Cloudinary (handled by backend)
export const deleteFromCloudinary = async (publicId) => {
  // This should be handled by your backend API for security
  // The frontend shouldn't have direct delete access to Cloudinary
  console.warn('Image deletion should be handled by backend API');
  return false;
};