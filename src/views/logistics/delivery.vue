<template>
  <div class="app-container deliveryBox" :style="contentStyleObj" ref="divs">
    发货管理
    <el-card class="box-card">
      <el-table>
        <div>ff</div>
        <el-table-column label="订单编号"></el-table-column>
        <el-table-column label="实收款"></el-table-column>
        <el-table-column label="订单来源"></el-table-column>
        <el-table-column label="客户"></el-table-column>
        <el-table-column label="配送及支付方式"></el-table-column>
        <el-table-column label="配送信息及备注"></el-table-column>

      </el-table>

    </el-card>


      <div class="bottom">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

  </div>
</template>

<script>
  export default {
    name: "delivery",
    data() {
      return {
        height: 500,
        contentStyleObj: {
          height: '500px'
        }
      }
    },


    methods: {
      getHeight() {
        this.contentStyleObj.height = window.innerHeight - 90 + 'px';
      }
    },
    created() {
      window.addEventListener('resize', this.getHeight);
      this.getHeight()
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    }
  }
</script>

<style scoped>
  .deliveryBox {

  }

  .bottom {
    position: absolute;
    bottom: 0;
    right:0;
    display: flex;
    justify-content: right;
    height: 50px;
  }
</style>
