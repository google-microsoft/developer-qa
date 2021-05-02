---
id: ruoyifontend

title: ruoyi-vue前端常见问题

sidebar_label: ruoyi-vue前端常见问题

slug: /app-info/ruoyifontend

---

## ruoyi-vue纯前端问题

## 1. ruoyiclient-vue实现图片预览和点击这么放大

```html
把这里imgUrl改成自己的字段即可

<el-table-column label='图片url' align='center'>
  <template slot-scope='scope'>
    <el-image
      style='width: 80px; height: 80px'
      :src='scope.row.imgUrl'
      :preview-src-list='[scope.row.imgUrl]'
    ></el-image>
  </template>
</el-table-column>
```

## 2. 实现树形选择

(1) 写入html

```html

<el-form-item label='父级ID' prop='parentId'>
  <treeselect v-model='form.parentId' :options='configurationmanagement_navigationOptions'
              :normalizer='normalizer' placeholder='请选择父级ID'
  />
</el-form-item>


```

(2). 导入包

```javascript
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: 'Configurationmanagement_navigation',
  components: {
    Treeselect
  },
}
```
(3). 添加字段configurationmanagement_navigationOptions,注意,自行动态改变

```javascript
import Treeselect from '@riophae/vue-treeselect'

export default {
  name: 'Configurationmanagement_navigation',
  components: {
    Treeselect
  },
  data() {
    return {
      // 导航配置树选项
      configurationmanagement_navigationOptions: [],
    }
  },
}
```
## 3. 上传图片实现

### 第一种方法,拿框架自带的ImageUpload:
js上:
```javascript

import ImageUpload from '@/components/ImageUpload/index.vue'
export default {
  name: 'Configurationmanagement_navigation',
  components: {
    ImageUpload
  },
}

```
html上

```html

<ImageUpload />

```
注意:如果要把上传结果的url以form单元提交到数据库就要加v-model 如下:
```vue

<ImageUpload v-model="form.navIcon" />
```

即可

### 第二种方法:自定义组件
参考: https://element.eleme.cn/#/zh-CN/component/upload
