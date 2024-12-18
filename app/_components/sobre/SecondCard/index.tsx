"use client";

interface IProps {
  title: string;
  description: string;
}

const SecondCard = ({ title, description }: IProps) => {
  return (
    <section className="p-8 py-12 flex flex-col bg-[#0c0c0c] rounded-lg w-full lg:w-2/3 h-auto">
      <div className="text-white">
        <div>
          <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        </div>
        <div>
          <p className="text-base font-medium">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SecondCard;
