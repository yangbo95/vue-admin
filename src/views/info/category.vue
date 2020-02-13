<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category" v-for="firstItem in category" :key="firstItem.id">
            <!-- 一级分类 -->
            <h4>
              <svg-icon iconClass="add" className="add"></svg-icon>
              {{firstItem.category_name}}-{{firstItem.id}}
              <div class="button-wrap">
                <el-button type="danger" size="mini" round @click="edirCategory({firstItem:firstItem,type:'category_first_edit'})">编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button size="mini" round @click="deleteCategory(firstItem.id)">删除</el-button>
              </div>
            </h4>
              <!-- 二级分类 -->
            <ul v-if="firstItem.children">
              <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                {{childrenItem.category_name}}
                <div class="button-wrap">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round >删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类标签</h4>

          <el-form label-width="120px" :model="form" class="form-wrap" ref="categoryForm">
            <el-form-item label="一级分类名称：" v-if="category_first">
              <el-input v-model="form.categoryName" style="width:300px" 
                :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="category_second">
              <el-input v-model="form.secCategoryName" style="width:300px" 
                :disabled="category_second_disabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :loading="submitloading" 
                :disabled="submit_btn_disabled">确定</el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addFirstCategory, getCategory, DeleteCategory } from '@/api/info';
export default {
  name: 'infoCategory', 
  data() {
    return {
      button_type: '',
      form: {
          categoryName: '',
          secCategoryName: '',
      },
      category_first: true,
      category_second: true,
      submitloading: false,
      category_first_disabled: true,
      category_second_disabled: true,
      submit_btn_disabled: true,
      category: this.$store.state.info.category,
      current: {
        id: '',
        category_name: '',
      },
    }
  },
  methods: {
    addCategory() {

    },
    submit() {
      console.log(this.button_type);
      if(this.button_type === 'category_first_add') {
        this.addCategoryFirst();
      }else if(this.button_type === 'category_first_edit') {
        this.editCategoryFirst();
      }
    },

    addCategoryFirst() {
      if(!this.form.categoryName) {
        this.$message({
          type: 'error',
          message: '分类名称不能为空'
        });
        return false;
      } 
      this.submitloading = true;
      // js操作添加一级分类
      // this.category.category_name = this.form.categoryName;
      // this.category.id = Math.round(Math.random()*10000);
      let objt = {
        id: Math.round(Math.random()*10000),
        category_name: this.form.categoryName,
      }
      this.category.push(objt);
      this.submitloading = false;
      this.form.categoryName = '';

      // addFirstCategory({ categoryName: this.form.categoryName })
      // .then( response => {
      //   let data = response.data.data;
      //   if( data.resCode === 0 ) {
      //     this.$message({
      //       message:data.message,
      //       type: success
      //     });
      //     this.category.push(data);
      //     this.submitloading = false;
      //     this.$refs.categoryForm.resetFields();
      //   }
      // }).catch( error => {
      //   this.submitloading = false;
      //   this.$refs.categoryForm.resetFields();
      // })
    },
  // 编辑一级分类
    editCategoryFirst() {
      // console.log(this.current.id);
      let newArr = this.category.filter( el => {
        return el.id === this.current.id
      });
      this.current.category_name = this.form.categoryName;
      newArr[0].category_name = this.current.category_name;
    },

    addFirst(params) {
      this.category_first = true;
      this.category_first_disabled = false;
      this.category_second = false;
      this.submit_btn_disabled= false;
      this.button_type = params.type;
      console.log(this.button_type);
    },
    getCategoryall() {
      getCategory().then(response => {
        let data = response.data.data
        this.category = data.data;
        // console.log(data);
      }).catch(error => {

      }) 
    },
    deleteCategory(categoryId) {
      this.confirm({
        content: '此操作将永久删除当前文件, 是否继续?',
        fn: this.confirmdelete,
        id: categoryId,
      });
      // DeleteCategory({ categoryId: categoryId }).then(response => {
      //   console.log(response);
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    confirmdelete(value) {
      // js操作删除分类
      this.category = this.category.filter(el => el.id !== value);

      //接口删除分类
      // DeleteCategory({ categoryId: value }).then(response => {
      //       console.log(response);
      //     }).catch(error => {
      //       console.log(error)
      //     })
    },
    // 一级分类-编辑
    edirCategory(params) {
      this.category_second = false;
      this.category_first_disabled = false;
      this.submit_btn_disabled = false;
      this.form.categoryName = params.firstItem.category_name;
      this.button_type = params.type;
      this.current.id = params.firstItem.id;
      
      // console.log(this.current);
    }

  },
  mounted() {
    // 调用接口获取一级分类
    this.getCategoryall()
  }
}
</script>

<style lang="scss" scoped>
  .category {
    line-height: 44px;
    position: relative;
    cursor: pointer;
    &:first-child:before {
      top: 20px
    }
    &:last-child:before {
      bottom: 21px
    }
    &:before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
      }
    h4 {
      line-height: 44px;
      padding-left: 40px;
      position: relative;
      
    }
    svg {
      position: absolute;
      left: 11px;
      top: 11px;
      background-color: #fff;
    }
    li {
      list-style: none;
      padding-left: 40px;
      font-size: 14px;
      position: relative;
      margin-left: 20px;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 22px;
        width: 32px;
        border-bottom: 1px dotted #000;
      }
    }
    li,h4 {
      &:hover {
        background-color: #f3f3f3;
        .button-wrap {
          display: block;
        }
      }
    }
  }
  .button-wrap {
    position: absolute;
    right: 11px;  
    top: 0;
    font-size: 12px;
    z-index: 2;
    display: none;
  }
  .menu-title {
    background-color: #f3f3f3;
    line-height: 44px;
    padding-left: 22px;
  }
  .form-wrap {
    padding-top: 26px;
  }
  .line {
    margin-left: -30px;
    margin-right: -30px;
    border-bottom: 1px solid #e9e9e9;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>