import Image from "next/image";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function ImageWithCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 400,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-lg shadow-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
