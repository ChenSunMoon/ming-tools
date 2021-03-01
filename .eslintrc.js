module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent':'off',
    'no-undef': 'off',
    'camelcase': 'off',
    'eol-last':'off',
    'space-before-function-paren':'off',
    'space-before-blocks':'off',
    'comma-dangle':'off',
    'key-spacing':'off',
    'arrow-spacing':'off',
    'object-curly-spacing':'off',
    'comma-spacing':'off',
    'semi':'off',
    'single':'off'
  }
}
