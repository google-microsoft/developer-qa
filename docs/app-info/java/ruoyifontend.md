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
  methods:{
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

```vue

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