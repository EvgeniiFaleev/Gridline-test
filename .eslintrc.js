module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/prefer-stateless-function":'off',
    'import/prefer-default-export': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-underscore-dangle": "off",
    "react/button-has-type" : "off",
    "consistent-return": 'off'
  }
};
