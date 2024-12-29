"use client"; // 指定此组件为客户端组件

import { useState, useEffect, useRef } from "react"; // 导入React的状态管理和生命周期钩子
import { motion } from "framer-motion"; // 导入Framer Motion用于动画效果
import { cn } from "@/lib/utils"; // 导入自定义的类名合并工具

// 定义MaskContainer组件，接收children、revealText、size、revealSize和className作为props
export const MaskContainer = ({
  children,
  revealText,
  size = 10, // 默认mask大小为10
  revealSize = 600, // 默认鼠标悬停时mask大小为600
  className,
}: {
  children?: string | React.ReactNode; // children可以是字符串或React节点
  revealText?: string | React.ReactNode; // revealText可以是字符串或React节点
  size?: number; // mask的初始大小
  revealSize?: number; // mask悬停时的大小
  className?: string; // 自定义的CSS类名
}) => {
  const [isHovered, setIsHovered] = useState(false); // 状态：是否悬停
  const [mousePosition, setMousePosition] = useState<any>({ x: 0, y: 0 }); // 状态：鼠标位置
  const containerRef = useRef<any>(null); // 引用：容器的DOM节点

  const updateMousePosition = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('text-red-500')) {
      const rect = target.getBoundingClientRect(); // 获取红色字体的边界框
      const x = e.clientX - rect.left + rect.width / 2; // 计算mask位置
      const y = e.clientY - rect.top + rect.height / 2; // 计算mask位置
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    // 监听document而不是window，以获得更好的性能
    document.addEventListener("mousemove", updateMousePosition);
    
    // 添加mouseover/mouseout事件监听
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  let maskSize = isHovered ? revealSize : size; // 根据是否悬停决定mask的大小

  return (
    <motion.div
      ref={containerRef} // 绑定引用到此div
      className={cn("relative", className)} // 合并默认和自定义的CSS类
    >
      <motion.div
        className="w-full h-full flex items-center justify-center text-6xl absolute bg-gray-800 bg-grid-black/[0.1] text-black [mask-image:url(/mask.svg)] [mask-size:40px] [mask-repeat:no-repeat]" // 修改背景颜色和透明度
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`, // 动态设置mask的位置，使其跟随鼠标
          maskSize: `${maskSize}px`, // 动态设置mask的大小
        }}
        transition={{
          type: "tween", // 改用tween以获得更流畅的跟踪效果
          duration: 0.15,
          ease: "linear"
        }}
        style={{
          pointerEvents: "none", // 确保这层不会捕获鼠标事件
          opacity: 0.8, // 调整透明度
        }}
      >
        <div className="absolute inset-0 bg-white h-full w-full z-0 opacity-50" /> {/* 半透明的黑色背景层 */}
        <div
          className="max-w-4xl mx-auto text-center text-black text-4xl font-bold relative z-20" // 设置内容的样式
        >
          {children} {/* 渲染传入的子内容 */}
        </div>
      </motion.div>

      <div 
        className="w-full h-full flex items-center justify-center text-black"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {revealText} {/* 渲染传入的揭示文本内容 */}
      </div>
    </motion.div>
  );
};
