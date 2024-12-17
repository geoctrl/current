import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindBaseFontSize from "tailwindcss-base-font-size";
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["serif"],
      mono: [
        "Hack",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    colors: {
      current: "currentColor",
      grey: {
        10: "#ffffff",
        25: "#fafafa",
        50: "#f4f5f6",
        75: "#efeff1",
        100: "#e9eaec",
        150: "#dbdce0",
        200: "#cccfd3",
        250: "#bec1c7",
        300: "#afb4ba",
        350: "#a1a6ae",
        400: "#9298a1",
        450: "#848b95",
        500: "#757d88",
        550: "#6a717b",
        600: "#5f656e",
        650: "#545961",
        700: "#494e55",
        750: "#3d4248",
        800: "#32363b",
        850: "#272a2e",
        900: "#1c1e21",
        925: "#151719",
        950: "#0e0f11",
        975: "#070808",
        990: "#000000",
      },
      primary: {
        10: "#ebf6ff",
        25: "#cce9ff",
        50: "#aedcff",
        75: "#8fceff",
        100: "#70c1ff",
        200: "#54b1f7",
        300: "#38a0f0",
        400: "#1c90e8",
        500: "#007fe0",
        600: "#0071c7",
        700: "#0062ad",
        800: "#005494",
        900: "#00457a",
        925: "#003a66",
        950: "#002e52",
        975: "#00233d",
        990: "#001729",
      },
      puce: {
        10: "#FAF0F2",
        25: "#F5E1E5",
        50: "#F0D2D7",
        75: "#EAC2CA",
        100: "#E5B3BC",
        200: "#DDA4AE",
        300: "#D695A0",
        400: "#CE8592",
        500: "#C67685",
        600: "#BE6777",
        700: "#B75869",
        800: "#AF485B",
        900: "#A7394D",
      },
      almond: {
        10: "#FAF5F0",
        25: "#F6EEE4",
        50: "#F3E7D9",
        75: "#EFDFCD",
        100: "#EBD8C1",
        200: "#DFC9AE",
        300: "#D3BA9C",
        400: "#C7AB89",
        500: "#BC9C77",
        600: "#B08C64",
        700: "#A47D51",
        800: "#986E3F",
        900: "#8C5F2C",
      },
      zomp: {
        10: "#F2F7F6",
        25: "#E6EFED",
        50: "#D9E8E5",
        75: "#CDE0DC",
        100: "#C0D8D3",
        200: "#B2CDC7",
        300: "#A4C2BC",
        400: "#95B6B0",
        500: "#87ABA4",
        600: "#79A098",
        700: "#6B958D",
        800: "#5C8981",
        900: "#4E7E75",
      },
      "tropical-indigo": {
        10: "#F3F1F8",
        25: "#E7E4F1",
        50: "#DCD6EB",
        75: "#D0C9E4",
        100: "#C4BBDD",
        200: "#B9AED6",
        300: "#ADA1CF",
        400: "#A294C7",
        500: "#9687C0",
        600: "#8B79B9",
        700: "#7F6CB2",
        800: "#745FAA",
        900: "#6852A3",
      },
    },

    borderRadius: {
      sm: ".6rem",
      md: "1.2rem",
      lg: "2rem",
      xl: "1.6rem",
      "2xl": "2.4rem",
      "3xl": "3.2rem",
      "4xl": "4rem",
      full: "99999px",
    },

    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontSize: "1.6rem",
            "code:before": {
              content: '""',
            },
            "code:after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    tailwindBaseFontSize({ baseFontSize: 10 }),
    tailwindcssTypography,
    plugin(function ({ addUtilities }) {
      addUtilities({
        // form size
        ".form-height-sm": {
          height: "2.8rem",
        },
        ".form-height-md": {
          height: "3.6rem",
        },
        ".form-height-lg": {
          height: "4.4rem",
        },
        ".form-width-sm": {
          width: "2.8rem",
        },
        ".form-width-md": {
          width: "3.6rem",
        },
        ".form-width-lg": {
          width: "4.4rem",
        },
        ".form-size-sm": {
          width: "2.8rem",
          height: "2.8rem",
        },
        ".form-size-md": {
          width: "3.6rem",
          height: "3.6rem",
        },
        ".form-size-lg": {
          width: "4.4rem",
          height: "4.4rem",
        },

        // app bg
        ".app-bg": {
          "@apply bg-grey-10 dark:bg-grey-900": {},
        },

        // app border
        ".app-border": {
          "border-color": `var(--app-border)`,
          "border-style": "solid",
        },

        ".app-container": {},
        ".app-container-padding": {},

        // typography
        ".typo-title-1": {
          "@apply text-4xl leading-snug": {},
        },

        ".typo-title-2": {
          "@apply text-3xl leading-snug": {},
        },

        ".typo-title-3": {
          "@apply text-2xl leading-snug": {},
        },

        ".typo-title-4": {
          "@apply text-xl leading-snug": {},
        },

        ".typo-title-5": {
          "@apply text-lg leading-snug": {},
        },

        ".typo-lead": {
          "@apply text-lg font-light text-grey-600 leading-snug": {},
        },

        ".typo-subdue": {
          "@apply text-grey-990/50 dark:text-grey-10/50": {},
        },

        ".typo-label": {},

        // ".typo-callout": {},
        // ".typo-subhead": {},
        // ".typo-footnote": {},
        // ".typo-caption": {},
        // ".typo-caption-sm": {},
        // ".typo-label": {
        //   "@apply mb-1 text-sm font-medium text-grey-500 dark:text-grey-500":
        //     {},
        // },

        // app-layout

        ".app-layout-container-no-padding": {
          "@apply lg:mx-auto lg:max-w-[960px]": {},
        },

        ".app-layout-padding": {
          "@apply px-4 sm:px-8": {},
        },

        // gradients
        ".gradient-1": {
          backgroundColor: "#F4D03F",
          backgroundImage: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
        },
      });
    }),
  ],
  safelist: [{ pattern: /mr-/ }, { pattern: /h-/ }, { pattern: /min-h-/ }],
} satisfies Config;
