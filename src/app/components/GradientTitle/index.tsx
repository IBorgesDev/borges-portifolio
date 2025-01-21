import React from "react";
import { motion } from "framer-motion";

interface GradientTitleProps {
  mainTitle?: boolean;
  children?: React.ReactNode;
}

export default function GradientTitle({
  mainTitle,
  children,
}: GradientTitleProps) {
  const className = "font-bold text-center text-3xl lg:text-6xl py-2";

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        opacity: {
          duration: 0.5,
          delay: i * 0.05,
        },
        y: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: i * 0.05,
        },
      },
    }),
  };

  const TitleTag = mainTitle ? "h1" : "h2";

  function processChildren(node: React.ReactNode): React.ReactNodeArray {
    if (typeof node === "string") {
      return node.split("");
    } else if (React.isValidElement(node)) {
      if (node.type === "br") {
        return [<br key={Math.random()} />];
      } else {
        return processChildren(node.props.children);
      }
    } else if (Array.isArray(node)) {
      return node.flatMap(processChildren);
    } else {
      return [];
    }
  }

  const lettersAndElements = processChildren(children);

  return (
    <TitleTag className={className}>
      {lettersAndElements.map((item, index) => {
        if (typeof item === "string") {
          return (
            <motion.span
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={letterAnimation}
              className="py-1"
              style={{
                display: "inline-block",
                backgroundImage:
                  "linear-gradient(to bottom, #FFFFFF, #a8a8ac)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {item === " " ? "\u00A0" : item}
            </motion.span>
          );
        } else {
          return item;
        }
      })}
    </TitleTag>
  );
}
