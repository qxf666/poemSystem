<template>
  <div class="welcome">
    <!-- 古诗词列表区 -->
    <el-table :data="poems" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="诗歌" prop="name"></el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="朝代" prop="dyname"></el-table-column>
      <el-table-column label="诗歌" prop="context"></el-table-column>
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
      const { data: res } = await this.$http.get("poem/poemList", {
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
.welcome{
  padding: 20px;
}
</style>