"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";

const projects = [
  {
    title: "CC的博客",
    link: "https://cc-ty.net.cn/cc",
    thumbnail: "/images/cc-blog.png",
  },
  {
    title: "汤圆的博客",
    link: "https://cc-ty.net.cn/ty",
    thumbnail: "/images/ty-blog.png",
  },
  {
    title: "小目标追踪器",
    link: "https://gt.cc-ty.net.cn",
      thumbnail: "/images/goal-tracker.png", // 支持GIF
  },
  {
    title: "洪流二语习得",
    link: "https://lf.cc-ty.net.cn",
      thumbnail: "/images/ling-flow.gif", // 支持GIF
  },
];

export default function Home() {
  return <HeroParallax products={projects} />;
}