<template>
  <div id="app-container">
    <div v-for="item in dom">
      <div v-html="item"></div>
    </div>


    <el-button @click="addFreightpanel=true">新增运费模板</el-button>


    <el-dialog
      title="新建运费模板"
      :visible.sync="addFreightpanel"
      width="70%"
    >
      <el-form :model="addFreightData" label-width="120px">
        <el-form-item
          label="模板名称"
          prop="name"
          :rules="[
            { required: true, message: '必须填写', trigger: 'blur' }
           ]"
        >
          <el-input v-model="addFreightData.name"></el-input>
        </el-form-item>

        <el-form-item label="运费计算方式">
          <el-radio-group v-model="addFreightData.freightCalculate">
            <el-radio @change="chackradio" label="卖家承担运费"></el-radio>
            <el-radio @change="chackradio" label="买家承担运费"></el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="运送方式">
          <el-checkbox-group v-model="addFreightData.transportMode">
            <el-checkbox @change="checkChange(1)" label="快递" name="type">
              <span>快递</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox @change="checkChange(2)" label="EMS" name="type">
              <span>EMS</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox @change="checkChange(3)" label="平邮" name="type">
              <span>平邮</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox @change="checkChange(4)" label="空运" name="type">
              <span>空运</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox @change="checkChange(5)" label="海运" name="type">
              <span>海运</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="计价方式">
          <el-radio-group v-model="addFreightData.priceMode">
            <el-radio label="按件数"></el-radio>
            <el-radio label="按重量"></el-radio>
            <el-radio label="按体积"></el-radio>
          </el-radio-group>
        </el-form-item>


      </el-form>

      <!-- 设置配送区域及运费-->
      <div class="areaBlock" v-if="areaBlockShow">
        <span>设置可配送区域和运费</span>
        <div class="areaBlock_box" >
          <div><p style="margin: 0">
            设置可配送区域和运费</p>
          </div>
          <el-table border width="100%" :data="addFreightData.transportModeList">
            <el-table-column label="可能配送区域">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="首件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.firstPiece"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.freight"/>
              </template>
            </el-table-column>
            <el-table-column label="续件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuate"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuateFreight"/>
              </template>
            </el-table-column>
          </el-table>


        </div>
        <div class="areaBlock_box" >
          <div><p style="margin: 0">
            设置可配送区域和运费</p>
          </div>
          <el-table border width="100%" :data="addFreightData.transportModeList">
            <el-table-column label="可能配送区域">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="首件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.firstPiece"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.freight"/>
              </template>
            </el-table-column>
            <el-table-column label="续件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuate"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuateFreight"/>
              </template>
            </el-table-column>
          </el-table>


        </div>
        <div class="areaBlock_box" >
          <div><p style="margin: 0">
            设置可配送区域和运费</p>
          </div>
          <el-table border width="100%" :data="addFreightData.transportModeList">
            <el-table-column label="可能配送区域">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="首件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.firstPiece"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.freight"/>
              </template>
            </el-table-column>
            <el-table-column label="续件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuate"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuateFreight"/>
              </template>
            </el-table-column>
          </el-table>


        </div>
        <div class="areaBlock_box" >
          <div><p style="margin: 0">
            设置可配送区域和运费</p>
          </div>
          <el-table border width="100%" :data="addFreightData.transportModeList">
            <el-table-column label="可能配送区域">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="首件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.firstPiece"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.freight"/>
              </template>
            </el-table-column>
            <el-table-column label="续件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuate"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuateFreight"/>
              </template>
            </el-table-column>
          </el-table>


        </div>
        <div class="areaBlock_box" >
          <div><p style="margin: 0">
            设置可配送区域和运费</p>
          </div>
          <el-table border width="100%" :data="addFreightData.transportModeList">
            <el-table-column label="可能配送区域">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.deliveryAddress">所有地区</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="首件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.firstPiece"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.freight"/>
              </template>
            </el-table-column>
            <el-table-column label="续件（个）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuate"/>
              </template>
            </el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.continuateFreight"/>
              </template>
            </el-table-column>
          </el-table>


        </div>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="testData">确 定</el-button>
  </span>
    </el-dialog>

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
          transportModeList:[
            {
              deliveryAddress:true,//运送到
              firstPiece:null,//首件
              freight:'',// 运费
              continuate:null,// 续件
              continuateFreight:''//续件运费
            }
          ]//可配送区域数据
        },//新建模板数据信息
        areaBlockShow:false,//设置可配送区域显示隐藏


      }
    },
    methods: {
      chackradio(){
        //运费计算方式选中按钮
        if (this.addFreightData.freightCalculate==='买家承担运费'&& this.addFreightData.transportMode.length!==0){
            this.areaBlockShow=true
        } else {
          this.areaBlockShow=false
        }
      },
     checkChange(e){
       //运送方式选择
       console.log(e)
       if (this.addFreightData.freightCalculate==='买家承担运费'&& this.addFreightData.transportMode.length!==0){
         this.areaBlockShow=true
       } else {
         this.areaBlockShow=false
       }
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
    border: 1px solid #ececec
  }

  .areaBlock_box div {
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
