export const blurFadeIn = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export const slideInFromLeft = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const slideInFromRight = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export const clipPathRevealFromRight = {
  initial: {
    clipPath: "inset(0 100% 0 0)",
  },
  animate: {
    clipPath: "inset(0 0 0 0)",
  },
};
