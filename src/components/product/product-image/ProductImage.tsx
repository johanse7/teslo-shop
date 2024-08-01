import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
};

export const ProductImage = (props: Props) => {
  const { src, alt, className, width, height } = props;

  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
