/* eslint-env node */

module.exports = {
  extends: ['@commitlint/config-conventional'],

  // Add your own rules. See http://marionebl.github.io/commitlint
  rules: {
    'header-max-length': [2, 'always', 50],
    'body-max-length': [2, 'always', 72],
    'scope-empty': [2, 'never'],
  },
}
