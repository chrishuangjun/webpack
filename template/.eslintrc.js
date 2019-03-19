// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  {{#if_eq lintConfig "standard"}}
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  {{/if_eq}}
  {{#if_eq lintConfig "airbnb"}}
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  {{/if_eq}}
  {{#if_eq lintConfig "none"}}
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  {{#if_eq lintConfig "airbnb"}}
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  {{/if_eq}}
  // add your custom rules here
  rules: {
    {{#if_eq lintConfig "standard"}}
    // allow async-await
    'generator-star-spacing': 'off',
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    {{/if_eq}}
    'no-throw-literal': 0,   // 允许用字面量{}抛出异常
    'arrow-parens': 0,
    'semi': [2, 'always'],  // 语句强制分号结尾
    'indent': [2, 4, {      // 缩进风格
        'SwitchCase': 1
    }],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'one-var': 0,
    'no-undef': 0,
    'no-control-regex': 'off',
    'no-useless-escape': 'off'
  }
}
