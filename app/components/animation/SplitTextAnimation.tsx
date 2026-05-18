import React, {
  useRef,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  useMemo,
} from "react";
import {
  motion,
  useInView,
  useAnimation,
  Variants,
  Transition,
} from "motion/react";

interface BaseWordProps {
  children: React.ReactNode;
  variants: Variants;
  customDelay: number;
  type: "spring" | "tween";
  // Added tweenDuration to the base word props
  tweenDuration: number;
}

interface ScrollWordProps extends BaseWordProps {
  controls: ReturnType<typeof useAnimation>;
  animateProp?: undefined;
}

interface HeroWordProps extends BaseWordProps {
  controls?: undefined;
  animateProp: "visible";
}

type WordProps = ScrollWordProps | HeroWordProps;

interface StaggerProps {
  children: React.ReactNode;
  delayPerWord?: number;
  initialDelay?: number;
  type?: "spring" | "tween";
  // Property provided by the user
  tweenDuration?: number;
  // Animation direction
  direction?: "top" | "bottom" | "left" | "right" | "none";
}

const Word = (props: WordProps) => {
  const {
    children,
    variants,
    controls,
    customDelay,
    type,
    animateProp,
    tweenDuration,
  } = props;

  const transitionConfig: Transition =
    type === "tween"
      ? {
          type: type,
          duration: tweenDuration,
          delay: customDelay,
          ease: [0.42, 0, 0.58, 1],
        }
      : {
          type: type,
          stiffness: 100,
          damping: 8,
          delay: customDelay,
        };

  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      animate={animateProp || controls}
      variants={variants}
      transition={transitionConfig}
    >
      <span className="inline-block">{children}</span>
      &nbsp;
    </motion.span>
  );
};

const createAnimatedWords = (
  children: React.ReactNode,
  initialDelay: number,
  delayPerWord: number,
  type: "spring" | "tween",
  controlsOrAnimate: ReturnType<typeof useAnimation> | "visible",
  tweenDuration: number,
  direction: "top" | "bottom" | "left" | "right" | "none",
): React.ReactNode => {
  const wordIndexRef = { current: 0 };

  // Create variants based on direction
  const getVariants = (): Variants => {
    switch (direction) {
      case "top":
        return {
          hidden: { y: "-20%", opacity: 0 },
          visible: { y: "0%", opacity: 1 },
        };
      case "bottom":
        return {
          hidden: { y: "20%", opacity: 0 },
          visible: { y: "0%", opacity: 1 },
        };
      case "left":
        return {
          hidden: { x: "-20%", opacity: 0 },
          visible: { x: "0%", opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: "20%", opacity: 0 },
          visible: { x: "0%", opacity: 1 },
        };
      case "none":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      default:
        return {
          hidden: { y: "-20%", opacity: 0 },
          visible: { y: "0%", opacity: 1 },
        };
    }
  };

  const wordVariants = getVariants();

  const isHeroMode = controlsOrAnimate === "visible";

  const mapFn = (children: React.ReactNode): React.ReactNode => {
    return Children.map(children, (child) => {
      if (typeof child === "string") {
        const words = child.split(/\s+/).filter((word) => word.length > 0);

        return words.map((word) => {
          const customDelay =
            initialDelay + wordIndexRef.current * delayPerWord;
          wordIndexRef.current += 1;

          const key = `${word}-${wordIndexRef.current}`;
          const wordProps = {
            variants: wordVariants,
            customDelay: customDelay,
            type: type,
            children: word,
            tweenDuration: tweenDuration, // Passed to the Word component
          };

          if (isHeroMode) {
            return <Word key={key} {...wordProps} animateProp="visible" />;
          } else {
            return (
              <Word key={key} {...wordProps} controls={controlsOrAnimate} />
            );
          }
        });
      }

      if (isValidElement(child)) {
        const element = child as React.ReactElement<{
          children?: React.ReactNode;
        }>;
        if (element.props && element.props.children) {
          return cloneElement(element, {
            ...(element.props as Record<string, unknown>),
            children: mapFn(element.props.children),
          });
        }
      }
      return child;
    });
  };
  return mapFn(children);
};

export const HeroSplitTextStagger = ({
  children,
  delayPerWord = 0.04,
  initialDelay = 0.3,
  type = "spring",
  tweenDuration, // Destructured from StaggerProps
  direction = "top", // Default to top
}: StaggerProps) => {
  const animatedChildren = useMemo(
    () =>
      createAnimatedWords(
        children,
        initialDelay,
        delayPerWord,
        type,
        "visible",
        tweenDuration || 1, // Passed to createAnimatedWords
        direction,
      ),
    [children, initialDelay, delayPerWord, type, tweenDuration, direction],
  );

  return <>{animatedChildren}</>;
};

export const ScrollTriggeredSplitText = ({
  children,
  delayPerWord = 0.08,
  initialDelay = 0.3,
  type = "tween",
  tweenDuration = 1.0,
  direction = "top", // Default to top
}: StaggerProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const animatedChildren = useMemo(
    () =>
      createAnimatedWords(
        children,
        initialDelay,
        delayPerWord,
        type,
        controls,
        tweenDuration,
        direction,
      ),
    [
      children,
      initialDelay,
      delayPerWord,
      type,
      controls,
      tweenDuration,
      direction,
    ],
  );

  return (
    <span ref={containerRef} className="inline">
      {animatedChildren}
    </span>
  );
};
