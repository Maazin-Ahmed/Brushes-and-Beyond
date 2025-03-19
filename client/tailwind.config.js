/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          light: "hsl(var(--color-primary-light))",
          dark: "hsl(var(--color-primary-dark))",
          foreground: "hsl(var(--color-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          light: "hsl(var(--color-secondary-light))",
          dark: "hsl(var(--color-secondary-dark))",
          foreground: "hsl(var(--color-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          light: "hsl(var(--color-accent-light))",
          dark: "hsl(var(--color-accent-dark))",
          foreground: "hsl(var(--color-foreground))",
        },
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        success: "hsl(var(--color-success))",
        warning: "hsl(var(--color-warning))",
        error: "hsl(var(--color-error))",
        info: "hsl(var(--color-info))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      zIndex: {
        0: "var(--z-0)",
        10: "var(--z-10)",
        20: "var(--z-20)",
        30: "var(--z-30)",
        40: "var(--z-40)",
        50: "var(--z-50)",
        auto: "var(--z-auto)",
      },
      spacing: {
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        20: "var(--spacing-20)",
      },
      animation: {
        "fade-in": "fadeIn var(--transition-normal) ease-in-out",
        "slide-up": "slideUp var(--transition-normal) ease-in-out",
        "slide-down": "slideDown var(--transition-normal) ease-in-out",
        "slide-left": "slideLeft var(--transition-normal) ease-in-out",
        "slide-right": "slideRight var(--transition-normal) ease-in-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

