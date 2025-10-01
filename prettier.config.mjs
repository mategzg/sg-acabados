/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tailwindConfig: './tailwind.config.ts',
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config

