"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MaskContainer } from "./svg-mask-effect";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 2);
  const secondRow = products.slice(2, 4);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[150vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 w-full text-center mt-20 mb-40">
        <h1 className="text-5xl md:text-7xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500 mb-10">
          CC和汤圆的小栈
        </h1>
        <div className="h-40">
          <MaskContainer
            revealText={
              <p className="max-w-2xl text-base md:text-xl text-gray-300">
                欢迎来到CC和汤圆的小栈！这里有我们的博客，以及制作的一些小应用。
                目前已经收录的有：CC的博客、汤圆的博客、洪流二语习得、小目标追踪器。
              </p>
            }
          >
            <p className="max-w-2xl text-base md:text-xl">
              欢迎来到CC和汤圆的小栈！这里有我们的博客，以及制作的一些小应用。
              目前已经收录的有：CC的博客、汤圆的博客、洪流二语习得、小目标追踪器。
            </p>
          </MaskContainer>
        </div>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row justify-center space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row justify-center space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <div className="fixed inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        transition: { duration: 0.3 }
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
        target="_blank"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-lg brightness-90 group-hover/product:brightness-100 transition-all duration-300"
          alt={product.title}
          unoptimized={product.thumbnail.endsWith('.gif')}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-gradient-to-b from-transparent to-purple-900/90 pointer-events-none transition-opacity duration-300 rounded-lg" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-2xl font-bold transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};