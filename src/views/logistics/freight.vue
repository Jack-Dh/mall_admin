<template>
  <div id="app-container">
    <div v-for="item in dom">
      <div v-html="item"></div>
    </div>

  <router-link to="/logistics/addFreightpanel">
    <el-button >新增运费模板</el-button>
  </router-link>



<!--    <el-dialog-->
<!--      title="新建运费模板"-->
<!--      :visible.sync="addFreightpanel"-->
<!--      width="70%"-->
<!--    >-->
<!--      <el-form :model="addFreightData" label-width="120px">-->
<!--        <el-form-item-->
<!--          label="模板名称"-->
<!--          prop="name"-->
<!--          :rules="[-->
<!--            { required: true, message: '必须填写', trigger: 'blur' }-->
<!--           ]"-->
<!--        >-->
<!--          <el-input v-model="addFreightData.name"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="运费计算方式">-->
<!--          <el-radio-group v-model="addFreightData.freightCalculate">-->
<!--            <el-radio @change="chackradio" label="卖家承担运费"></el-radio>-->
<!--            <el-radio @change="chackradio" label="买家承担运费"></el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->


<!--        <el-form-item label="运送方式">-->
<!--          <el-checkbox-group @change="checkChange" v-model="addFreightData.transportMode">-->
<!--            <el-checkbox  label="快递" name="type">-->
<!--              <span>快递</span>-->
<!--              <i class="el-icon-edit-outline"></i>-->
<!--            </el-checkbox>-->
<!--            <el-checkbox  label="EMS" name="type">-->
<!--              <span>EMS</span>-->
<!--              <i class="el-icon-edit-outline"></i>-->
<!--            </el-checkbox>-->
<!--            <el-checkbox  label="平邮" name="type">-->
<!--              <span>平邮</span>-->
<!--              <i class="el-icon-edit-outline"></i>-->
<!--            </el-checkbox>-->
<!--            <el-checkbox  label="空运" name="type">-->
<!--              <span>空运</span>-->
<!--              <i class="el-icon-edit-outline"></i>-->
<!--            </el-checkbox>-->
<!--            <el-checkbox  label="海运" name="type">-->
<!--              <span>海运</span>-->
<!--              <i class="el-icon-edit-outline"></i>-->
<!--            </el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="计价方式">-->
<!--          <el-radio-group v-model="addFreightData.priceMode">-->
<!--            <el-radio label="按件数"></el-radio>-->
<!--            <el-radio label="按重量"></el-radio>-->
<!--            <el-radio label="按体积"></el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->

<!--      </el-form>-->

<!--      &lt;!&ndash; 设置配送区域及运费&ndash;&gt;-->
<!--&lt;!&ndash;      class="areaBlock"&ndash;&gt;-->
<!--      <div  v-if="areaBlockShow">-->
<!--&lt;!&ndash;        <span>设置可配送区域和运费</span>&ndash;&gt;-->
<!--        <div  v-for="(item,index) in addFreightData.transportMode" style="width: 90%">-->
<!--        <div class="areaBlock_box" v-if="item">-->
<!--          <div class="divbox" v-if="addFreightData.transportMode"><p-->
<!--            style="margin: 0;display: flex;justify-content: space-between;padding-left: 5px;padding-right: 5px">-->
<!--            <span>设置可配送区域和运费</span>-->
<!--            <span>{{addFreightData.transportModeList[index][0].title}}</span>-->
<!--          </p>-->
<!--          </div>-->
<!--          <el-table border width="100%" :data="addFreightData.transportModeList[index]">-->
<!--            <el-table-column label="可能配送区域">-->
<!--              <template slot-scope="scope">-->
<!--                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="首件（个）">-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.firstPiece"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="运费（元）">-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.freight"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="续件（个）">-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.continuate"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="运费（元）">-->
<!--              <template slot-scope="scope">-->
<!--                <el-input v-model="scope.row.continuateFreight"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--          <div class="divbox" ><p-->
<!--            style="margin: 0;padding-left: 5px;">-->
<!--            <span @click="addarea(index)">设置可配送区域和运费</span>-->

<!--          </p>-->
<!--          </div>-->
<!--        </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="testData">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->

  </div>
</template>

<script>
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


      }
    },
    methods: {
      addarea(i){
        //设置可配送区域和运费添加按钮
        console.log(i)
        let a={
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
    }
  }
</script>

<style scoped>
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
