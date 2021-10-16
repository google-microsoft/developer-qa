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
  url: 'https://google-microsoft.github.io', // Your website URL
  baseUrl: '/developer-qa/',
  projectName: 'developer-qa',
  organizationName: 'google-microsoft',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    prism: {
      additionalLanguages: ['powershell', 'java', 'php', 'rust'],
    },
    navbar: {
      title: '技术常见解决方案',
      logo: {
        alt: 'My Facebook Project Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: '系统相关',
          position: 'left',
          items: [
            {to: 'docs/os-info/centos', label: 'Centos'},
            {to: 'docs/os-info/ubuntu', label: 'ubuntu'},
            {to: 'docs/os-info/docker', label: 'docker'},
          ],
        },
        {
          label: '应用运维相关',
          position: 'left',
          items: [
            {to: 'docs/app-info/git', label: 'Git', position: 'left'},
            {to: 'docs/app-info/nginx', label: 'nginx', position: 'left'},
            {to: 'docs/app-info/java', label: 'Java', position: 'left'},
            {to: 'docs/app-info/ruoyi', label: 'ruoyi', position: 'left'},
            {to: 'docs/app-info/maven', label: 'Maven', position: 'left'},
            {to: 'docs/app-info/mysql', label: 'Mysql', position: 'left'},
          ],
        },

        {
          label: 'IDE相关',
          position: 'left',
          items: [
            {to: 'docs/ide-info/webstorm', label: 'Webstorm', position: 'left'},
            {to: 'docs/ide-info/docusaurus', label: 'docusaurus', position: 'left'},
          ],
        },
        // {to: 'docs', label: 'Docs', position: 'right'},

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
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
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
