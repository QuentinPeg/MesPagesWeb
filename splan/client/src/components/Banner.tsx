type BannerProps = {
  image: string;
  description: string;

}

const Banner: React.FC<BannerProps> = ({ image, description }) => {
  return (
    <div className="w-1/4 relative bg-gray-200 min-w-[280px]">
      <img src={image} className="w-full" />
      <p className="inset-0 flex items-center justify-center p-5">{description}</p>
    </div>
  );
};

export default Banner;


