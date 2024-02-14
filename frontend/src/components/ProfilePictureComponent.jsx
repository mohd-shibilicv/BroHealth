import React, { useEffect, useState } from 'react';

function ProfilePictureComponent({ base64ProfilePicture }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Decode the base64 string to create a URL for the image
    if (base64ProfilePicture) {
      const imageUrl = `data:image/jpeg;base64,${base64ProfilePicture}`;
      setImageUrl(imageUrl);
    }
  }, [base64ProfilePicture]);

  return (
    <div>
      {imageUrl && (
        <img src={imageUrl} alt="Profile Picture" className='rounded-full h-10 w-10' />
      )}
    </div>
  );
}

export default ProfilePictureComponent;
