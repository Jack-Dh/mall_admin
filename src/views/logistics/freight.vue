<template>
  <div id="app-container">


    <div style="background-color: #f7f7f7">
      <div class="addFreight">
        <router-link to="/logistics/addFreightpanel">
          <el-button>新增运费模板</el-button>
        </router-link>
      </div>


      <div style="margin:0 1% 2% 1%;border: 1px solid #ececec;width: 98%;line-height: 40px;"
           v-for="item in createtemplatelist">
        <div class="title">
          <span>{{item.name}}</span>
          <div style="margin-right: 5px">
            <span>最后编辑时间：{{item.updateTime}}</span>
            <i class="el-icon-delete" title="删除" @click="deleteFreight(item.id)"></i>
            <i class="el-icon-edit-outline" title="修改" @click="updataFreight(item)"></i>
          </div>


        </div>
        <el-table border :data="item.transportModeList" stripe style="width: 100%">
          <el-table-column label="运送方式" prop="title"></el-table-column>
          <el-table-column label="运送到">
            <template slot-scope="scope">
              <span>{{scope.row.deliveryAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="首件(个)">
            <template slot-scope="scope">
              <span>{{scope.row.firstPiece}}</span>
            </template>

          </el-table-column>
          <el-table-column label="运费(元)">
            <template slot-scope="scope">
              <span>{{scope.row.freight}}</span>
            </template>
          </el-table-column>
          <el-table-column label="续件(个)">
            <template slot-scope="scope">
              <span>{{scope.row.continuate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="续件运费(元)">
            <template slot-scope="scope">
              <span>{{scope.row.continuateFreight}}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>


  </div>
</template>

<script>
  import {createtemplatelist, deletetemplate} from '@/api/region'

  export default {
    name: "freight",
    data() {
      return {
        dom: [],//运费模板信息
        addFreightpanel: false,//运费模板面板
        addFreightData: {
          name: '',//运费模板名称
          transportMode: [],//运送方式
          priceMode: '',//计价方式
          freightCalculate: '',//运费计算方式
          transportModeList: [
            [{
              title: '快递',
              deliveryAddress: true,//运送到
              firstPiece: null,//首件
              freight: '',// 运费
              continuate: null,// 续件
              continuateFreight: ''//续件运费
            }], [{
              title: 'EMS',
              deliveryAddress: true,//运送到
              firstPiece: null,//首件
              freight: '',// 运费
              continuate: null,// 续件
              continuateFreight: ''//续件运费
            }], [{
              title: '平邮',
              deliveryAddress: true,//运送到
              firstPiece: null,//首件
              freight: '',// 运费
              continuate: null,// 续件
              continuateFreight: ''//续件运费
            }], [{
              title: '空运',
              deliveryAddress: true,//运送到
              firstPiece: null,//首件
              freight: '',// 运费
              continuate: null,// 续件
              continuateFreight: ''//续件运费
            }], [{
              title: '海运',
              deliveryAddress: true,//运送到
              firstPiece: null,//首件
              freight: '',// 运费
              continuate: null,// 续件
              continuateFreight: ''//续件运费
            }]
          ]//可配送区域数据
        },//新建模板数据信息
        areaBlockShow: false,//设置可配送区域显示隐藏
        createtemplatelist: [],//运费模板信息

      }
    },
    methods: {
      updataFreight(data) {
        //修改运费模板
        let updata = JSON.stringify(data)
        this.$router.push({path: '/logistics/updataFreight', query: {data: data}})
      },
      deleteFreight(id) {
        //删除运费模板
        let ids = {ids: [id]}
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletetemplate(ids).then(res => {
            this.$notify({
              title: '提示',
              message: res.data.errmsg,
              type: 'success'
            });
            this.createtemplateQuery()
          }).catch(err => {
            console.log(err)
          })

        })


      },
      createtemplateQuery() {
        createtemplatelist().then(res => {
          console.log(res)
          this.createtemplatelist = res.data.data.list
        }).catch(err => {
          console.log(err)
        })
      },
      addarea(i) {
        //设置可配送区域和运费添加按钮
        console.log(i)
        let a = {
          deliveryAddress: true,//运送到
          firstPiece: null,//首件
          freight: '',// 运费
          continuate: null,// 续件
          continuateFreight: ''//续件运费
        }
        this.addFreightData.transportModeList[i].push(a)
      },
      chackradio() {
        //运费计算方式选中按钮
        if (this.addFreightData.freightCalculate === '买家承担运费' && this.addFreightData.transportMode.length !== 0) {
          this.areaBlockShow = true
        } else {
          this.areaBlockShow = false
        }
      },
      checkChange(e) {
        //运送方式选择
        console.log(this.addFreightData.transportMode)
        if (this.addFreightData.freightCalculate === '买家承担运费' && this.addFreightData.transportMode.length !== 0) {
          this.areaBlockShow = true
        } else {
          this.areaBlockShow = false
        }
        // let checkList = this.addFreightData.transportMode
        // checkList.forEach((item, index) => {
        //   this.addFreightData.transportModeList[index].title = item
        // })


      },
      testData() {
        console.log(this.addFreightData)
      },
      add() {
        let domData = `
        <div style="margin: 10px;border: 1px solid #ececec;width: 100%;line-height: 40px;">
           <div class="title" style="display: flex;justify-content: space-between;align-items: center;background-color: #f5f5f5;padding-left: 10px;margin: 0">
                <span>积分抵现</span>
            </div>
        <table width="100%" style="border-collapse: collapse;margin: 0 auto;text-align: center;">
        <thead>
        <tr>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">运送方式</th>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">运送到</th>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">首件（个）</th>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">运费（元）</th>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">续件（个）</th>
        <th style="border: 1px solid #cad9ea;color: #666;height: 30px;">运费（元）</th>
        </tr>
        </thead>
        </table>
</div>`
        this.dom.push(domData)
        console.log(this.dom)


      }
    },
    created() {
      this.createtemplateQuery()
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding-left: 10px;
    margin: 0;
    font-size: 15px;
  }

  .addFreight {
    width: 100%;
    border-bottom: 1px solid #cfcfcf;
    padding: 1%;
    background-color: #ffffff;
    margin-bottom: 1%;

  }

  .areaBlock {
    display: flex;
    justify-content: space-around
  }

  .areaBlock_box {
    width: 70%;
    border: 1px solid #ececec;
    margin-bottom: 20px;
  }

  .areaBlock_box .divbox {
    background-color: #f5f5f5;
    line-height: 50px
  }

  .Box {
    /*dashed*/
    border: 1px solid #ececec;
    width: 90%;
    line-height: 50px;

  }


  .Box .title {
    background-color: #f5f5f5;
    padding-left: 10px;
  }


  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }

  table td, table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }

  table thead th {
    background-color: #CCE8EB;
    width: 100px;
  }

  table tr:nth-child(odd) {
    background: #fff;
  }

  table tr:nth-child(even) {
    background: #F5FAFA;
  }

</style>
