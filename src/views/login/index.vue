<template>
  <div class="login"> 
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.current}" v-for="item in menuTab" 
        :key="item.id" @click="toggleMenu(item)">{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" size="medium" class="login-form">
        
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input id="password" type="password" maxlength="20" minlength="6" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-if="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" maxlength="20" minlength="6" v-model="ruleForm.passwords" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" :disabled="codeButtonStatus" @click="getSms()">{{ codeButtonText }}</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" 
          class="login-btn block" :disabled="loginButtonStatus">{{ model === 'login' ? '登录' : '注册' }}</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import { GetSms, Register, Login } from '@/api/login';
import { stripscript, validateEmail, validatePass, validataVCode } from '@/utils/validate.js';
export default {
  name: 'login',
  data() {
    var validateUsername = (rule, value, callback) => {

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
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;

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
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;

      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password ) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {

      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;

      if (value === "") {
          return callback(new Error('请输入验证码'));
      }else if(!validataVCode(value)) {
        return callback(new Error('验证码格式有误'))
      }else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: '登录', current: true, type: 'login' },
        { txt: '注册', current: false, type: 'register' },
      ],
      model: 'login',
      loginButtonStatus: true,
      codeButtonStatus: false,
      codeButtonText: '获取验证码',
      timer: null,
      ruleForm: {
        username: '',
        password: '',
        code: '',
        passwords: ''
      },
      rules: {
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
      }
    }
  },
  created() {

  },
  mounted() {
    
  },
  methods: {
    // 切换登录和注册模块
    toggleMenu(data) {
      this.menuTab.forEach( elem => {
        elem.current = false
      })
      data.current = true
      this.model = data.type
      // 重置表单
      this.$refs.loginForm.resetFields();
      this.clearcountDown();
    },
    submitForm(formName) {
      // 模拟注册成功
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if(this.model === 'login') {
                // 登录
                  let requestData = {
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,
                    code: this.ruleForm.code,
                    module: 'login',
                  }
                  Login(requestData).then(response => {
                    console.log('登录成功');
                    // 跳转到首页
                    this.$router.push({path: '/console'})
                  }).catch( error => {

                  })
                
            }else if(this.model === 'register') {
              // 注册
                let requestData = {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  code: this.ruleForm.code,
                  module: 'register'
                }
                // 注册接口
                Register(requestData).then(response => {
                  let data = response.data;
                  this.$message({
                    message: data.message,
                    type: 'success'
                  });
                  this.toggleMenu(this.menuTab[0]);
                  this.clearcountDown();
                    // console.log(response);
                }).catch(error => {
                  // 失败时执行的代码：
                })
            }
          }else {
              console.log('error submit!!');
              return false;
          }          
        });   
    },

    getSms() {
      if(this.ruleForm.username === "") {
        return this.$message.error('邮箱不能为空！！');
      }
      if(!validateEmail(this.ruleForm.username)) {
        return this.$message.error('邮箱格式有误，请重新输入');
      }

      this.codeButtonStatus = true;
      this.codeButtonText = '发送中';

      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      }
      // 请求的接口 获取验证码
      setTimeout( () =>{
        GetSms( requestData ).then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: 'success'
          })
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          // 调用定时器，倒计时
          this.countDown(60);
        }).catch(error => {
          console.log(error);
        })
      },3000)
    },

    // 倒计时
    countDown(number) {
      if(this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        number--;
        this.codeButtonText = `倒计时${number}s`;
        if(number === 0) {
          clearInterval(this.timer);
          this.codeButtonStatus = false;
          this.codeButtonText = '重新获取';
        }
        
        // console.log(number);
      }, 1000);
    },

    // 清除倒计时
    clearcountDown() {
      this.codeButtonStatus = false,
      this.codeButtonText = '获取验证码',
      clearInterval(this.timer)
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