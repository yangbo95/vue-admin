<template>
  <div>
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="label-wrap category">
            <label for="">分类：</label>
            <div class="main-content">
              <el-select v-model="categoryvalue" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.category_name">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>

        <el-col :span="7">
          <div class="label-wrap date">
            <label for="">日期：&nbsp;&nbsp;</label>
            <div class="main-content">
              <el-date-picker
                v-model="datevalue"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']" style="width:100%">
              </el-date-picker>
            </div>
          </div>
        </el-col>

        <el-col :span="3">
          <div class="label-wrap keyword">
            <label for="">关键字：&nbsp;&nbsp; </label>
            <div class="main-content">
              <el-select v-model="search_key" style="width:100%">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>

        
        <el-col :span="3">
          <el-input v-model="search_keyword" placeholder="请输入内容" style="width:100%"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width:100%">搜索</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="danger" class="pull-right" 
          style="width:40%" @click="dialogInfo=true">新增</el-button>
        </el-col>
      </el-row>

      <div class="autospace"></div>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" width="800"></el-table-column>
        <el-table-column prop="category" label="类型" width="130"></el-table-column>
        <el-table-column prop="date" label="日期" width="237"></el-table-column>
        <el-table-column prop="user" label="管理员" width="115"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            <el-button size="small" type="success" @click="dialogInfo = true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="autospace"></div>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="deleteAll">全部删除</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
            class="pull-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </el-col>
      </el-row>

     <!-- 弹窗信息 -->
      <infodailog :category="category" :dialogInfo.sync="dialogInfo"></infodailog>
    
  </div>
</template>

<script>
import { getCategory } from '@/api/info';
import infodailog from './dialog/info'
export default {
  name: 'infoIndex',
  components: {
    infodailog,
    
  },
  data() {
    return {
      dialogInfo: false,
      categoryvalue: '',
      datevalue: '',
      search_key: 'ID',
      search_keyword: '',
      category: this.$store.state.info.category,
      searchOptions: [
        { label: '标题', value: 'title'},
        { label: 'ID', value: 'id'},
      ],
      tableData: [
        {
          title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
          category: '国际信息',
          date: '2019-09-10 19:31:31',
          user: '管理员',
        }, 
        {
          title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
          category: '国际信息',
          date: '2019-09-10 19:31:31',
          user: '管理员',
        }, 
        {
          title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
          category: '国际信息',
          date: '2019-09-10 19:31:31',
          user: '管理员',
        }, 
        {
          title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
          category: '国际信息',
          date: '2019-09-10 19:31:31',
          user: '管理员',
        }, 
      ]
    }
    
  },
  methods:{
    handleSizeChange(val) {
        
    },
    handleCurrentChange(val) {

    },
    deleteItem() {
      this.confirm({
        content: '此操作将永久删除当前文件, 是否继续?',
      });
    },
    deleteAll() {
      this.confirm({
        content: '此操作将永久删除全部文件, 是否继续?',
      });
    },
    GetCategory() {
      getCategory().then( response => {
        let data = response.data.data;

      }).catch( error => {

      })
    }
  },

  mounted() {
    this.GetCategory();
    // console.log(this.dialogInfo)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/config.scss';

  .label-wrap {
    &.category { @include labelwrap(left,60,40); }
    &.date {
      @include labelwrap(center,93,40); }
    &.keyword { @include labelwrap(right,100,40); }
  }
  .autospace {
    height: 30px;
  }
</style>
  
