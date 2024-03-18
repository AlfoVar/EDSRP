import React, { useState } from 'react';
import fs from 'fs';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      fs.writeFile(`./images/${file.name}`, reader.result, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Imagen guardada con éxito');
        }
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
}

export default ImageUpload;