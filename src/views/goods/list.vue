<template>
  <div class="app-container">


    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.goodsSn" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品编号"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">导出
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-upload2"
                 @click="importGoodspanel=true">导入
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="宣传画廊">
              <img v-for="pic in props.row.gallery" :key="pic" :src="pic" class="gallery">
            </el-form-item>
            <el-form-item label="商品介绍">
              <span>{{ props.row.brief }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="关键字">
              <span>{{ props.row.keywords }}</span>
            </el-form-item>
            <el-form-item label="类目ID">
              <span>{{ props.row.categoryId }}</span>
            </el-form-item>
            <el-form-item label="品牌商ID">
              <span>{{ props.row.brandId }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品编号" prop="goodsSn"/>

      <el-table-column align="center" min-width="100" label="名称" prop="name"/>

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" property="iconUrl" label="分享图">
        <template slot-scope="scope">
          <img :src="scope.row.shareUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" prop="detail">
        <template slot-scope="scope">
          <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
            <div class="imgBox" v-html="goodsDetail"/>
          </el-dialog>
          <el-button type="primary" size="mini" @click="showDetail(scope.row.detail)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="专柜价格" prop="counterPrice"/>

      <el-table-column align="center" label="当前价格" prop="retailPrice"/>

      <el-table-column align="center" label="是否新品" prop="isNew">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isNew ? 'success' : 'error' ">{{ scope.row.isNew ? '新品' : '非新品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否热品" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{ scope.row.isHot ? '热品' : '非热品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否在售" prop="isOnSale">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isOnSale ? 'success' : 'error' ">{{ scope.row.isOnSale ? '在售' : '未售' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!--    导入商品-->
    <el-dialog
      title="导入商品"
      :visible.sync="importGoodspanel"
      width="600px"
    >
        <span style="margin-bottom: 10px;display: block">
          商品链接
        </span>
      <el-select v-model="linkGoods.type" placeholder="请选择" style="margin-bottom: 10px;width: 100px">
        <el-option label="天猫"  value="1"></el-option>
        <el-option label="淘宝" disabled value="2"></el-option>
      </el-select>
      <div class="linkbox" v-for="(item,index) in linkGoods.url" :key="index">
        <el-input v-model="linkGoods.url[index]"></el-input>
        <el-button size="mini" @click="addlinkbtn" style="margin-left: 10px" type="primary"
                   icon="el-icon-plus"></el-button>
        <el-button v-if="index>0?true:false" size="mini" @click="deletelinkbtn(index)" type="primary"
                   icon="el-icon-minus"></el-button>
      </div>

      <!--      <div>-->


      <!--        <div class="linkbox"  v-for="(item,index) in linkGoods.url">-->
      <!--          {{item}}-->
      <!--          <el-input v-model="item.url" class="input-with-select"></el-input>-->


      <!--          <el-button size="mini" @click="addlinkbtn" style="margin-left: 10px" type="primary"-->
      <!--                     icon="el-icon-plus"></el-button>-->
      <!--          <el-button v-if="index>0?true:false" size="mini" @click="deletelinkbtn(index)" type="primary"-->
      <!--                     icon="el-icon-minus"></el-button>-->
      <!--        </div>-->

      <!--      </div>-->

      <span slot="footer" class="dialog-footer">
    <el-button @click="importGoodspanel = false">取 消</el-button>
    <el-button type="primary" @click="addlinksavebtn">确 定</el-button>
  </span>
    </el-dialog>


    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100"/>
    </el-tooltip>

  </div>
</template>

<style>
  .linkbox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px
  }

  .imgBox img {
    width: 100%;
  }

  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  .gallery {
    width: 80px;
    margin-right: 10px;
  }
</style>

<script>
  import {listGoods, deleteGoods, geturl} from '@/api/goods'
  import BackToTop from '@/components/BackToTop'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'GoodsList',
    components: {BackToTop, Pagination},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          goodsSn: undefined,
          name: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        goodsDetail: '',
        detailDialogVisible: false,
        downloadLoading: false,
        importGoodspanel: false,//商品导入面板
        linkGoods: {
          type: '',
          url: ['']
        },//商品链接
      }
    },
    created() {
      this.getList()
    },
    methods: {
      addlinksavebtn() {
        //保存商品链接
        console.log(this.linkGoods)
        geturl(this.linkGoods).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },


      addlinkbtn() {
        //添加商品链接文本框
        // let linkobj = {
        //   url: "1",
        //
        // }
        this.linkGoods.url.push('')

      }
      ,
      deletelinkbtn(i) {
        //移除商品链接文本框
        this.linkGoods.url.splice(i, 1)
      }
      ,
      getList() {
        this.listLoading = true
        listGoods(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      }
      ,
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
      ,
      handleCreate() {
        this.$router.push({path: '/goods/create'})
      }
      ,
      handleUpdate(row) {
        this.$router.push({path: '/goods/edit', query: {id: row.id}})
      }
      ,
      showDetail(detail) {
        console.log(detail)
        this.goodsDetail = detail
        this.detailDialogVisible = true
      }
      ,
      handleDelete(row) {
        deleteGoods(row).then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
      }
      ,
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['商品ID', '商品编号', '名称', '专柜价格', '当前价格', '是否新品', '是否热品', '是否在售', '首页主图', '宣传图片列表', '商品介绍', '详细介绍', '商品图片', '商品单位', '关键字', '类目ID', '品牌商ID']
          const filterVal = ['id', 'goodsSn', 'name', 'counterPrice', 'retailPrice', 'isNew', 'isHot', 'isOnSale', 'listPicUrl', 'gallery', 'brief', 'detail', 'picUrl', 'goodsUnit', 'keywords', 'categoryId', 'brandId']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
          this.downloadLoading = false
        })
      }
    }
  }
</script>
