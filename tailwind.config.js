/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#2C4251",
        "primary-light": "#406177",
        "accent": "#ED474A"
      },
      borderColor: {
        "accent": "#ED474A",
        "primary": "#2C4251",
      },
      boxShadow: {
        "white-2xl": "0 25px 50px -12px rgba(255, 255, 255, 0.2);"
      }
    }

  },
  variants: {
    // borderColor: ['active']
    borderWidth: ['focus', 'active', 'hover'],

  },
  plugins: []
}
