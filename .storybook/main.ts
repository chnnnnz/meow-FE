// import type { StorybookConfig } from '@storybook/nextjs'
// import path from 'path'

// const config: StorybookConfig = {
//   stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
//   staticDirs: ['../public'],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     '@storybook/addon-interactions',
//     '@storybook/addon-mdx-gfm',
//     "storybook-addon-apollo-client",
//   ],
//   framework: {
//     name: '@storybook/nextjs',
//     options: {},
//   },
//   docs: {
//     autodocs: 'tag',
//   },
//   webpackFinal: async (config) => {
//     const imageRule = config.module?.rules?.find((rule) => {
//       const test = (rule as { test: RegExp }).test

//       if (!test) {
//         return false
//       }

//       return test.test('.svg')
//     }) as { [key: string]: any }

//     imageRule.exclude = /\.svg$/

//     config.module?.rules?.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     })

//     if (config.resolve) {
//       config.resolve.alias = {
//         ...config.resolve.alias,
//         fonts: path.resolve(__dirname, '../public/fonts'),
//       }
//     }

//     return config
//   },
// }
// export default config
