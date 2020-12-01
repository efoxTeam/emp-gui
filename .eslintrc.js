module.exports = {
  plugins: [],
  rules: {},
  overrides: [
    {
      files: ["src/**/*"],
      rules: {
        'react/prop-types': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/ban-types': 0,
        'react-hooks/rules-of-hooks': 0,
        'react/display-name': 0,
      }, 
      plugins: ['react-hooks'],
      extends: ['@efox/eslint-config-react-prittier-ts'],
    }
  ],
}
