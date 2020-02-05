<template>
  <div class="login"> 
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.current}" v-for="item in menuTab" 
        :key="item.id" @click="toggleMenu(item)">{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-form">
        
        <el-form-item prop="username" class="item-from">
          <label for="">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="">密码</label>
          <el-input type="password" maxlength="20" minlength="6" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-if="model === 'register'">
          <label for="">重复密码</label>
          <el-input type="password" maxlength="20" minlength="6" v-model="ruleForm.passwords" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, isRef, onMounted } from '@vue/composition-api'
import { stripscript, validateEmail, validatePass, validataVCode } from '@/utils/validate.js'
export default {
  name: 'login',
  setup(props, ctx) {
    var validateUsername = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(!validateEmail(value)) {
        callback(new Error('用户名格式有误'));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      
      // console.log(stripscript(value));
      ruleForm.password = stripscript(value);
      value = ruleForm.password;

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePass(value)) {
        callback(new Error('密码为6至20位的数字+字母'));
      } else {
        callback();
      }
    };

    var validatePasswords = (rule, value, callback) => {
      
      // console.log(stripscript(value));
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;

      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== ruleForm.password ) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {

      ruleForm.code = stripscript(value);
      value = ruleForm.code;

      if (value === "") {
          return callback(new Error('请输入验证码'));
      }else if(!validataVCode(value)) {
        return callback(new Error('验证码格式有误'))
      }else {
        callback();
      }
    };
    // 这里面放置data数据、生命周期、自定义函数
    const menuTab = reactive([
        { txt: '登录', current: true, type: 'login' },
        { txt: '注册', current: false, type: 'register' },
    ]) 
    const model = ref('login')
    const ruleForm = reactive({
        username: '',
        password: '',
        code: '',
        passwords: ''
    })
    const rules = reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      })
        
    
    
    onMounted( () => {

    })

    const toggleMenu = (data => {
      menuTab.forEach( elem => {
        elem.current = false
      })
      data.current = true
      model.value = data.type
    }) 
    
    const submitForm = (formName => {
      ctx.refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }) 

    return {
      menuTab,
      model,
      ruleForm,
      rules,
      toggleMenu,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    background-color: #344a5f;
    height: 100vh;
  }
  .login-wrap {
    width: 330px;
    margin: auto;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0,0,0,0.1)
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      color: #fff;
      font-size: 14px;
      display: block;
      margin-bottom: 3px;
    }
    .item-from {
      margin-bottom: 13px;
    }
    .block {
      width: 100%;
      display: block;
    }
    .login-btn {
      margin-top: 29px;
    }
  }
</style>