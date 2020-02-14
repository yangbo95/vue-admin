<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="信息分类：">
        <el-select v-model="form.categoryId" >
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.category_name"
            :value="item.category_name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="缩列图：">
        
      </el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker v-model="form.dateTime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitEdit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill
export default {
  name: 'infoDetail',
  components: {
    quillEditor
  },
  data() {
    return {
      category: this.$store.state.info.category,
      form: {
        categoryId: this.$route.query.category,
        title: this.$route.query.title,
        dateTime: this.$route.query.date,
        content: this.$route.query.title,
        id: this.$route.query.id
      }
    }
  },
  methods: {
    submitEdit() {
      const ResetFormEdit = {
        categoryId: this.form.categoryId,
        title: this.form.title,
        dateTime: this.form.dateTime,
        content: this.form.content,
        id: this.form.id
      };
      // console.log(ResetFormEdit);
      this.$router.push({
        name: 'infoIndex',
      })
      this.$store.commit('infodetail/SET_EDITOR',ResetFormEdit)
    }
  }
}
</script>