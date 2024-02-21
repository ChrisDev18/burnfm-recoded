import React, {useEffect, useState} from 'react';
import Image from "next/image";

// Needs server side rendering
export default function ProgressiveImage(props: React.ComponentProps<typeof Image>) {
  // Path to your original image
  const imagePath = `${props.src}?w=50&h=50`;
  let base64data: string = "";
  try {
    fetch(`${props.src}?w=50&h=50`)
      .then((x) => x.blob()
        .then((y) => {
          const reader = new FileReader();
          reader.readAsDataURL(y); // Read the Blob as data URL (base64)
          reader.onloadend = () => {
            base64data = reader.result as string; // Set base64 data as blurDataURL for Image component
          };
        }));

  } catch (error) {
    console.error('Error fetching and converting image to base64:', error);
  }

  return (
    <Image
      src={props.src} // Low-resolution version
      alt={props.alt}
      placeholder="blur" // Use the blur placeholder
      blurDataURL={base64data} // A small base64 encoded image
      height={props.height}
      width={props.width}
    />
  );
};
