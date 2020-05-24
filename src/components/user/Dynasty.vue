<template>
  <div class="dynasty">
    <!-- 古诗词列表区 -->
    <el-table :data="poems" border stripe>
       <el-table-column type="index"  width="20" height="150"></el-table-column>
      <el-table-column label="帝国崛起"  width="200" height="150">
　　<template slot-scope="scope">
　　　　<img :src="imgurl+scope.row.img" width="200" height="150" class="head_pic"/>
　　</template>
</el-table-column>
      <el-table-column label="朝代" prop="dyname" width="200" height="150"></el-table-column>
      <el-table-column label="开始年份" prop="start" width="200" height="150"></el-table-column>
      <el-table-column label="作者" prop="end" width="200" height="150"></el-table-column>
      <el-table-column label="简介" prop="intro" width="400" height="150"></el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[4,6,8]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //获取用户列表的参数对象
      imgurl:"http://qajy096t3.bkt.clouddn.com/",
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize:4
      },
      poems: [],
      total: 0
    };
  },
  created() {
    this.getPoemList();
  },
  methods: {
    async getPoemList() {
      const { data: res } = await this.$http.get("dynasty/dynastyList", {
        params: this.queryInfo
      });
      if (res.meta.status != 200) {
        return this.$message.error("获取古诗词信息失败");
      }
      this.poems = res.data.poems;
      this.total = res.data.total;
      console.log(res);
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize=newSize;
      this.getPoemList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum=newPage;
      this.getPoemList();
    }

  }
};
</script>
<style lang="less" scoped>
.el-table {
  font-size: 12px;
}
.el-pagination{
  margin-top: 15px;
}
.dynasty{
  padding:10px;
}
</style>