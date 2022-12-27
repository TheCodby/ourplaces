"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
export default function ImagesList({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <Fragment>
      <div>
        <Image
          key={images[selectedImage].id}
          src={`https://s3.amazonaws.com/ourplaces/${images[selectedImage].key}`}
          className="rounded-3xl overflow-hidden basis-auto"
          width={400}
          height={400}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div className="relative w-20 h-20 rounded-full" key={image.id}>
            <button onClick={() => setSelectedImage(index)}>
              <Image
                key={image.id}
                src={`https://s3.amazonaws.com/ourplaces/${image.key}`}
                fill
                style={{
                  objectFit: "cover",
                  filter: selectedImage === index ? "opacity(0.5)" : "",
                }}
                className="rounded-full hover:scale-110 transition duration-300 ease-in-out bg-white"
              />
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
