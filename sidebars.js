/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: '操作系统相关',
      collapsed: false,
      items: [
        'os-info/centos/centos',
        'os-info/centos/ubuntu',
        'os-info/docker/docker',
      ],
    },
    {
      type: 'category',
      label: '应用程序运维相关',
      collapsed: false,
      items: [
        'app-info/git/git',
        'app-info/nginx/nginx',
        {
          type: 'category',
          label: 'java系列',
          collapsed: false,
          items: [
            'app-info/java/java',
            'app-info/java/ruoyi',
          ],
        },
        'app-info/maven/maven',
        'app-info/mysql/mysql',
      ],
    },

    {
      type: 'category',
      label: 'IDE配置相关',
      collapsed: false,
      items: [
        'ide-info/webstorm/webstorm',
        'ide-info/docusaurus/docusaurus',
      ],
    },
  ],
};
