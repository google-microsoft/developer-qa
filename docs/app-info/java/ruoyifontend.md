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
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
  methods: {
    /** 转换导航配置数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.navName,
        children: node.children
      }
    },
  }
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

```html

<ImageUpload v-model='form.navIcon' />

```

即可

### 第二种方法:自定义组件

参考: https://element.eleme.cn/#/zh-CN/component/upload

## 4.表单验证

### (1)在vue的data中 添加rules

要点:

(1)rules的key是跟要验证的表单一样.

(2) 调用

```javascript
this.$refs["form"].validate //进行验证
```

如下:

```javascript
export default {
  name: "User",
  data() {
    return {
      // 表单校验
      rules: {
        userName: [
          {required: true, message: "用户名称不能为空", trigger: "blur"}
        ],
        nickName: [
          {required: true, message: "用户昵称不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "用户密码不能为空", trigger: "blur"}
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /** 提交按钮 */
    submitForm: function() {
      //调用验证代码
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
  }
};

```

### (2)把rules绑定到form表单中.

```html

<el-dialog :title='title' :visible.sync='open' width='600px' append-to-body>
  <el-form ref='form' :model='form' :rules='rules' label-width='80px'>
    <el-row>
      <el-col :span='12'>
        <el-form-item label='用户昵称' prop='nickName'>
          <el-input v-model='form.nickName' placeholder='请输入用户昵称' />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <el-form-item label='手机号码' prop='phonenumber'>
          <el-input v-model='form.phonenumber' placeholder='请输入手机号码' maxlength='11' />
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model='form.email' placeholder='请输入邮箱' maxlength='50' />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <el-form-item v-if='form.userId == undefined' label='用户名称' prop='userName'>
          <el-input v-model='form.userName' placeholder='请输入用户名称' />
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item v-if='form.userId == undefined' label='用户密码' prop='password'>
          <el-input v-model='form.password' placeholder='请输入用户密码' type='password' />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <el-form-item label='用户性别'>
          <el-select v-model='form.sex' placeholder='请选择'>
            <el-option
              v-for='dict in sexOptions'
              :key='dict.dictValue'
              :label='dict.dictLabel'
              :value='dict.dictValue'
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label='状态'>
          <el-radio-group v-model='form.status'>
            <el-radio
              v-for='dict in statusOptions'
              :key='dict.dictValue'
              :label='dict.dictValue'
            >{{dict.dictLabel}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <el-form-item label='角色'>
          <el-select v-model='form.roleIds' multiple placeholder='请选择'>
            <el-option
              v-for='item in roleOptions'
              :key='item.roleId'
              :label='item.roleName'
              :value='item.roleId'
              :disabled='item.status == 1'
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <el-form-item label='备注'>
          <el-input v-model='form.remark' type='textarea' placeholder='请输入内容'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div slot='footer' class='dialog-footer'>
    <el-button type='primary' @click='submitForm'>确 定</el-button>
    <el-button @click='cancel'>取 消</el-button>
  </div>
</el-dialog>
```

## 5.表单

### (1). 传统select下拉

```html

<el-select v-model='form.okStatus' placeholder='请选择游戏状态'>
  <el-option
    v-for='dict in okStatusOptions'
    :key='dict.dictValue'
    :label='dict.dictLabel'
    :value='dict.dictValue'
  ></el-option>
</el-select>
```

### (2).单选框

```html

<el-form-item label='状态'>
  <el-radio-group v-model='form.okStatus'>
    <el-radio
      v-for='dict in okStatusOptions'
      :key='dict.dictValue'
      :value='dict.dictValue'
      :label='dict.dictValue'
    >{{ dict.dictLabel }}
    </el-radio>
  </el-radio-group>
</el-form-item>
```

### (3). 数字输入框

```html

<el-form-item label='显示排序' prop='orderNum'>
  <el-input-number v-model='form.orderNum' controls-position='right' :min='0' />
</el-form-item>
```

### (4).switch选择

```html

<el-table-column align='center' label='状态' width='100'>
  <template slot-scope='scope'>
    <el-switch
      v-model='scope.row.status'
      active-value='0'
      inactive-value='1'
      @change='handleStatusChange(scope.row)'
    ></el-switch>
  </template>
</el-table-column>

```

handleStatusChange实现

```javascript
    // 角色状态修改
function handleStatusChange(row) {
  let text = row.status === '0' ? '启用' : '停用'
  this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(function() {
    return changeRoleStatus(row.roleId, row.status)
  }).then(() => {
    this.msgSuccess(text + '成功')
  }).catch(function() {
    row.status = row.status === '0' ? '1' : '0'
  })
}
```

### (5).多选框

```html

<el-form-item label='发布平台' prop='platform'>
  <el-checkbox-group v-model='form.platform'>
    <el-checkbox v-for='dict in platformOptions'
                 :key='dict.dictValue'
                 :label='dict.dictValue'
    >{{ dict.dictLabel }}
    </el-checkbox>
  </el-checkbox-group>
</el-form-item>
```

注意:
[1] form.platform一定要给初始化为数组,不然会报错. 如下:

```javascript
 // 表单参数
form: {
  platform:[]
}
还有

// 表单重置
reset()
{
  this.form = {
    platform: [],
  }
  this.resetForm('form')
}
```

[2] el-checkbox比较特殊,  :label="dict.dictValue"就是提交的值

### (6).添加富文本框

导入js

```javascript
import Editor from '@/components/Editor'

export default {
  name: 'Notice',
  components: {
    Editor
  },
}
```

添加html

```html

<editor v-model='form.content' :min-height='192' />

```

### (6).日期范围

html:

```html

<el-form-item label='日期范围' prop='field101'>
  <el-date-picker type='daterange' v-model='formData.timeRange' format='yyyy-MM-dd'
                  value-format='yyyy-MM-dd' :style="{width: '100%'}" start-placeholder='开始日期' end-placeholder='结束日期'
                  range-separator='至' clearable></el-date-picker>
</el-form-item>
```

js

```javascript

export default {
  data() {
    return {
      formData: {
        timeRange: [],
      },
      rules: {
        timeRange: [{
          required: true,
          message: '日期范围不能为空',
          trigger: 'change'
        }],
      },
    }
  },
  methods: {
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.formData.timeRange = [];
      this.handleQuery();
    },
    getList() {
      let [beginTime, endTime] = this.formData.timeRange;
      if (beginTime && endTime) {
        this.queryParams.createdAt = beginTime;
        this.queryParams.updatedAt = endTime;
      }
      list_record(this.queryParams).then(response => {
      });
    }
  }
}

```

### (7). 日期和带时分秒的日期

```html

<el-form-item label='开始时间' prop='startTime'>
  <el-date-picker clearable size='small'
                  v-model='queryParams.startTime'
                  type='date'
                  value-format='yyyy-MM-dd'
                  placeholder='选择开始时间'>
  </el-date-picker>
</el-form-item>

<el-form-item label='开始时间' prop='startTime'>
  <el-date-picker clearable size='small'
                  v-model='queryParams.startTime'
                  type='datetime'
                  value-format='yyyy-MM-dd HH:mm:ss'
                  placeholder='选择开始时间'>
  </el-date-picker>
</el-form-item>

```

## 6. 动态表单的使用,实现tab动态组件

[1] 导入组件到components
[2] 通过component渲染组件

```vue

<template>
  <div id='agent_manager' class='app-container'>
    <el-tabs v-model='currentTabComponent'>
      <el-tab-pane v-for='v in tagInfo' :label='v.label' :name='v.name'></el-tab-pane>
    </el-tabs>
    <component v-bind:is='currentTabComponent'></component>
  </div>
</template>

<script>
import checkAwait from './checkAwait'
import checkSuccess from './checkSuccess'
import checkError from './checkError'

export default {
  name: 'agent_manager',
  data() {
    return {
      tagInfo: [
        {label: '待审核列表', name: 'checkAwait'},
        {label: '审核通过', name: 'checkSuccess'},
        {label: '审核失败', name: 'checkError'}
      ],
      currentTabComponent: 'checkAwait'
    }
  },
  components: {
    checkAwait,
    checkSuccess,
    checkError
  },
}
</script>

```
