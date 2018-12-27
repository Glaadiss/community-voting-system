module.exports = {
  extends: ['airbnb', 'react-app'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': false,
    'arrow-parens': false,
  },
  env: {
    browser: true,
    node: true,
  },
};