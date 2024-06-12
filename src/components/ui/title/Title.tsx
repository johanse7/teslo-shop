import { titleFont } from "@/config/fonts";

type TitleProps = {
  title: string;
  subTitle?: string;
  className?: string;
};

export const Title = (props: TitleProps) => {
  const { subTitle, title, className } = props;

  return (
    <div className={`mt-3 px-4 md:px-0 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-xl mb-5">{subTitle}</h3>}
    </div>
  );
};
