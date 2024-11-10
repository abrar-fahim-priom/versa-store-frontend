import React from "react";
import Marquee from "react-fast-marquee";
import apple from "../../images/companies/apple.png";
import asus from "../../images/companies/asus.png";
import dell from "../../images/companies/drll.png";
import gigabyte from "../../images/companies/gigabyte.png";
import huawei from "../../images/companies/huawei.png";
import mi from "../../images/companies/mi.png";
import MSI from "../../images/companies/msi.png";
import pixel from "../../images/companies/pixel.png";
import ralph from "../../images/companies/ralph.png";
import sony from "../../images/companies/sony.png";

const BrandShowcaseMarquee = () => {
  // Sample brand logos (replace with actual logos if needed)
  const brands = [
    {
      id: 1,
      name: "MSI",
      logo: MSI,
    },
    {
      id: 2,
      name: "PIXEL",
      logo: pixel,
    },
    {
      id: 3,
      name: "Dell",
      logo: dell,
    },
    {
      id: 4,
      name: "Apple",
      logo: apple,
    },
    {
      id: 5,
      name: "Asus",
      logo: asus,
    },
    {
      id: 6,
      name: "Gigabyte",
      logo: gigabyte,
    },
    {
      id: 7,
      name: "Huawei",
      logo: huawei,
    },
    {
      id: 8,
      name: "Xiaomi",
      logo: mi,
    },
    {
      id: 9,
      name: "Ralph Lauren",
      logo: ralph,
    },
    {
      id: 10,
      name: "Sony",
      logo: sony,
    },
  ];

  return (
    <div className="py-6 bg-gray-100">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center justify-center mx-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandShowcaseMarquee;
