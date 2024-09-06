import applwwatch1 from "../images/products/applewatch1.png";
import gamingcontrollwe from "../images/products/controller.jpg";
import ear from "../images/products/earphones.jpg";
import fifa from "../images/products/fifa.jpg";
import harman from "../images/products/Harman-Kardon.jpg";
import head from "../images/products/headphones.jpg";
import iphone from "../images/products/iphone.jpg";
import jbl from "../images/products/JBL GO 3.jpg";
import macbook from "../images/products/Macbook 1.jpg";
import mouse from "../images/products/mouse1.png";
import pixel from "../images/products/pixel.png";
import watch2 from "../images/products/watch2.png";
import shot1 from "../images/shots/Macbook 2.jpg";
import shot2 from "../images/shots/Macbook 3.jpg";

export const products = [
  {
    slug: "macbook-air-13inch-m1-chip-256gb-143",
    category: {
      _id: "66d486129891ab753aa56c0b",
      name: "computer",
      image:
        "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725203985/versaShop/image-1725203983524_seyqyt.png",
    },
    name: "Macbook Air 13inch M1 Chip 256GB",
    description: "The mackbook air 13 inch 256 GB lorem ipsum dolor set",
    defaultType: "256 GB",
    currentPrice: 335,
    previousPrice: 478,
    variant: [
      {
        type: "512 GB",
        currentPrice: 400,
        previousPrice: 500,

        description:
          "The mackbook air 13 inch 512 GB lorem ipsum dolor set  HELLO hi sample sample avriant",
        _id: "66d5579baa242b27480f35f8",
      },
    ],
    coverImage: macbook,

    images: [
      {
        url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624597_alavb6.jpg",
        publicId: "versaShop/images-1725257624597_alavb6",
        _id: "66d5579baa242b27480f35f5",
      },
      {
        url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624598_kv3seh.jpg",
        publicId: "versaShop/images-1725257624598_kv3seh",
        _id: "66d5579baa242b27480f35f6",
      },
      {
        url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624599_hjb9px.jpg",
        publicId: "versaShop/images-1725257624599_hjb9px",
        _id: "66d5579baa242b27480f35f7",
      },
    ],
    // category: "Laptops",
    discount: 15,
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    brand: "APPLE",
    stock: 388,

    addedBy: "66d1ae5915a70e31707a85d7",
    addedByModel: "Vendor",
    deliveryCharge: 50,
    onSale: true,
    shots: [macbook, shot1, shot2],
    overview:
      "The Macbook Air 13inch M1 Chip 256GB is a high-performing and visually stunning laptop that is perfect for both personal and professional use. With its advanced image signal processor, 8-core CPU, and 16-core Neural Engine, this laptop offers unparalleled speed and power.",
  },
  {
    slug: "jbl-go-3-165",
    name: "JBL GO 3",
    coverImage: jbl,
    currentPrice: 334,
    previousPrice: 474,
    category: "Speakers",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: false,
    shots: [jbl, shot1, shot2],
    overview:
      "Get the ultimate portable speaker with JBL GO 3. With its dynamic frequency response range, water resistance rating, and Bluetooth technology, you can enjoy up to 5 hours of high-quality sound wherever you go. Its compact size and durability make it perfect for outdoor use. Choose from four different colors to match your style.",
  },
  {
    slug: "iphone-14-128gb-12",
    name: "iPhone 14 128GB",
    coverImage: iphone,
    currentPrice: 552,
    previousPrice: 585,
    category: "Phones",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [iphone, shot1, shot2],
    overview:
      "The iPhone 14 128GB is the must-have gadget for tech enthusiasts, featuring a stunning 6.1-inch OLED screen, powerful 128GB storage, and 6GB RAM. With its dual rear camera setup and 12MP selfie camera with biometric sensor, you can capture high-quality photos and videos with ease",
  },
  {
    slug: "google-pixel-8-pro-128gb-663",
    name: "Google Pixel 8 Pro 128GB",
    coverImage: pixel,
    currentPrice: 338,
    previousPrice: 391,
    category: "Phones",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [pixel, shot1, shot2],
    overview: `The Google Pixel 8 Pro 128GB is the perfect phone for the tech-savvy user who wants the latest and greatest gadgets. With its stunning 6.7 LTPO OLED screen, 120Hz refresh rate, HDR10+, 1600 nits HBM, and 2400 nits peak, you'll have beautiful visuals and vibrant colors no matter what you're doing.`,
  },
  {
    slug: "logitech-m190-wireless-mouse-391",
    name: "Logitech M190 Wireless Mouse",
    coverImage: mouse,
    currentPrice: 229,
    previousPrice: 334,
    category: "Laptops",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: false,
    shots: [mouse, shot1, shot2],
    overview: `The Logitech M190 Wireless Mouse is a comfortable and reliable mouse that works seamlessly with your PC or laptop. With a contoured ergonomic shape and scooped buttons, it provides all-day comfort, while its power-saving features and`,
  },
  {
    slug: "playstation-dualsense-controller-146",
    name: "Playstation DualSense Controller",
    coverImage: gamingcontrollwe,
    currentPrice: 233,
    previousPrice: 553,
    category: "Gaming",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [gamingcontrollwe, shot1, shot2],
    overview: `The Playstation DualSense Controller is a must-have for serious gamers. With Haptic feedback and Adaptive Triggers, you'll feel more immersed in your games than ever before. The built-in microphone and headset jack also make it easy to chat with friends while you play. Choose between white and black colors to match your style.`,
  },
  {
    slug: "fifa-23-157",
    name: "FIFA 23",
    coverImage: fifa,
    currentPrice: 585,
    previousPrice: 628,
    category: "Gaming",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: false,
    shots: [fifa, shot1, shot2],
    overview:
      "Experience FIFA 23 and bring The World's Game to the pitch, with HyperMotion2 Technology.",
  },
  {
    slug: "harman-kardon-luna-652",
    name: "Kardon Luna",
    coverImage: harman,
    currentPrice: 489,
    previousPrice: 552,
    category: "Speakers",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [harman, shot1, shot2],
    overview: `Introducing the Harman/Kardon Luna – the ultimate way to enjoy and appreciate your favorite tunes. Packing HARMAN KARDON SUPERIOR SOUND in a stylish and quality design, the Harman/Kardon Luna is the ideal speaker for your home or on-the-go. With advanced two-way drivers, you can hear every detail of your favorite music with crystal clear and balanced audio. `,
  },
  {
    slug: "samsung-type-c-akg-earphones-112",
    name: "Samsung Type-C AKG Earphones",
    coverImage: ear,
    currentPrice: 342,
    previousPrice: 411,
    category: "Headphones",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [ear, shot1, shot2],
    overview: `The Samsung TypeC AKG Earphones offer undistorted studio-quality audio, convenient control features, and compatibility with a wide range of Samsung phones.`,
  },
  {
    slug: "anker-life-2-neo-54",
    name: "Anker Life 2 Neo",
    coverImage: head,
    currentPrice: 123,
    previousPrice: 236,
    category: "Headphones",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: false,
    shots: [head, shot1, shot2],
    overview: `Anker Soundcore Life 2 Neo is a Wireless Bluetooth Over-Ear Headphones with a USB-C Fast Charging gives you 60-Hour Playtime and 40mm Driver, also Bass-up and AUX Input – Bluetooth Headphones Comes in a nice Black Color`,
  },
  {
    slug: "apple-watch-series-9-45mm-616",
    name: "Apple Watch Series 9 45MM",
    coverImage: applwwatch1,
    currentPrice: 495,
    previousPrice: 689,
    category: "Smart Watches",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: true,
    shots: [applwwatch1, shot1, shot2],
    overview: `The Apple Watch Series 9 45MM is a powerful smartwatch designed to impress Apple fans. It boasts a sleek design, Retina LTPO OLED display, 64GB of storage, dual loud speakers, and various features like GPS, Wi-Fi, and Bluetooth 5.3.`,
  },
  {
    slug: "amazfit-pop-3r-860",
    name: "Amazfit Pop 3R",
    coverImage: watch2,
    currentPrice: 207,
    previousPrice: 118,
    category: "Smart Watches",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    onSale: false,
    shots: [watch2, shot1, shot2],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
  },
];

export const productCharacterData = [
  {
    title: `Display Resolutions`,
    text: `Retina XDR Display 2532 x 1170 pixels, 19.5:9 ratio, 457 PPI 60Hz`,
  },
  {
    title: `Sound`,
    text: `Custom Tempest Engine 3D Audio, Dolby Atmos & DTS:X (Blu-ray video & UHD Blu-ray video)`,
  },
  {
    title: `Memory`,
    text: `16 GB/256-bit GDDR6 SDRAM 512 MB DDR4 RAM (for background tasks)`,
  },
  {
    title: `Connectivity`,
    text: `Wi-Fi IEEE 802.11ax; Bluetooth 5.1; Gigabit Ethernet; 2× USB 3.2 Gen 2×1; 1× USB 2.0; 1× USB-C with USB 3.2 Gen 2×1; 1× HDMI 2.1`,
  },
];
