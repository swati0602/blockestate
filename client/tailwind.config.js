/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./PageComponents/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    // Disable Preflight (CSS reset) so existing template styles are NOT affected
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "card-dark": "#0d0d1a",
        "card-surface": "#13131f",
        "card-border": "rgba(255,255,255,0.08)",
        "accent-green": "#00d084",
        "accent-blue": "#4f46e5",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        "glow-green":
          "0 0 30px rgba(0, 208, 132, 0.25), 0 20px 60px rgba(0, 0, 0, 0.55)",
        "glow-blue":
          "0 0 30px rgba(79, 70, 229, 0.3), 0 20px 60px rgba(0, 0, 0, 0.55)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "16px",
      },
    },
  },
  plugins: [],
};
