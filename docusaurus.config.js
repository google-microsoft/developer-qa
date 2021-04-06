/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '程序员常见问题解答',
  tagline: '',
  onBrokenLinks: 'throw',

  url: 'https://google-microsoft.github.io/developer-QA/', // Your website URL
  baseUrl: '/',
  projectName: 'developer-QA',
  organizationName: 'google-microsoft',

  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: '技术常见解决方案',
      logo: {
        alt: 'My Facebook Project Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {to: 'docs/centos/centos', label: 'Centos', position: 'left'},
        {to: 'docs/git/git', label: 'Git', position: 'left'},
        {to: 'docs/java/java', label: 'Java', position: 'left'},
        {to: 'docs/maven/maven', label: 'Maven', position: 'left'},
        {to: 'docs/mysql/mysql', label: 'Mysql', position: 'left'},
        {to: 'docs/webstorm/webstorm', label: 'Webstorm', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'right'},
        // Please keep GitHub link to the right for consistency.
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
