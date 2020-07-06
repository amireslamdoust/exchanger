module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'no-useless-escape': 'off',
    // 'no-script-url': 'off',
    // 'jsx-a11y/control-has-associated-label': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off',
    // 'jsx-a11y/no-static-element-interactions': 'off',
    // 'jsx-a11y/no-noninteractive-element-interactions': 'off',
    // 'jsx-a11y/anchor-has-content': 'off',
    // 'jsx-a11y/href-no-hash': 'off',
    // 'jsx-a11y/label-has-associated-control': 'off',
    // 'jsx-a11y/anchor-is-valid': 'off',
    // 'no-template-curly-in-string': 'off',
    // 'react/button-has-type': 'off',
    // 'react/prop-types': 0,
    // 'react/prefer-stateless-function': 0,
    // 'react/jsx-one-expression-per-line': 0,
    // 'react/jsx-props-no-spreading': 'warn',
    // 'linebreak-style': 0,
    // radix: 'off',
    // 'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    // 'react/jsx-wrap-multilines': 0,
    // 'react/no-danger': 0,
    // 'react/forbid-prop-types': 0,
    // 'no-use-before-define': 0,
    // 'no-param-reassign': 0,
    // 'import/no-unresolved': 0,
    // 'no-console': 0,
    // 'spaced-comment': 0,
    // 'import/prefer-default-export': 0,
    // 'consistent-return': 'warn',
  },
}
