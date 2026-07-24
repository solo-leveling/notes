export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-strong": "var(--primary-strong)",
        surface: "var(--surface)",
        card: "var(--card)",
        muted: "var(--muted)",
        border: "var(--border)",
        bg: "var(--bg)",
      },
      boxShadow: {
        soft: "var(--shadow)",
      },
    },
  },
};
