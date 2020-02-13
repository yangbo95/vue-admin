<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogInfo_to" @close="close" @open="openDialog" width="580px">
        <el-form :model="form" ref="addInfo">
          
          <el-form-item label="类型:" :label-width="formLabelWidth">
            <el-select v-model="form.category">
              <el-option v-for="item in infocategory.item" 
                :key="item.id" 
                :label="item.category_name" 
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="概况:" :label-width="formLabelWidth">
            <el-input v-model="form.content" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="danger" :loading="submitLoading" @click="ADDinfo">确 定</el-button>
        </div>
          </el-dialog>
        </div>
</template>

<script>
import { addInfo } from '@/api/info';
export default {
  name: 'infodailog',
  props: ['dialogInfo', 'category'],
  data() {
    return {
      dialogInfo_to: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      submitLoading: false,
      form: {
        infocategory: [],
        title: '',
        content: ''
      },
      formLabelWidth: '70px',
      infocategory: {
        item: '',
      },
    }
  },
  methods: {
    close() {
      this.dialogInfo_to = false;
      this.resetForm();
      this.$emit("update:dialogInfo", false);
    },
    openDialog() {
      this.infocategory.item = this.category;
    },
    resetForm() {
      this.form.category = '';
      this.form.title = '';
      this.form.content = '';
    },
    ADDinfo() {
      let requestData = {
        category: this.form.category,
        title: this.form.title,
        content: this.form.content
      }
      if(!requestData.category) {
        this.$message({
          message: '分类不能为空',
          type: 'error'
        })
      }
      this.submitLoading = true;
      addInfo(requestData).then(response => {
        let data = response.data
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.submitLoading = false;
        this.$refs.addInfo.resetFields();
        this.resetForm();
        console.log(response.data);
      }).catch(error => {
        this.submitLoading = false;
      })
    }
  },
  watch: {
    dialogInfo(newVal,oldVal) {  
      this.dialogInfo_to = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>