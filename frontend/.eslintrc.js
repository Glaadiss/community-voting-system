module.exports = {
  extends: ['airbnb', 'react-app'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': false,
    'arrow-parens': 0,
    'no-undef': 'error',
    'object-curly-newline': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
  },
  env: {
    browser: true,
    node: true,
  },
};
