<template>

  <div class="app-container">

    <el-dialog
      title="选择可配送区域"
      :visible.sync="addFreightpanel"
      width="60%"
    >

      <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'name'}" @addBtn='add'
                     @removeBtn='remove' :mode='mode' height='540px'>
      </tree-transfer>


      <span slot="footer" class="dialog-footer">
    <el-button @click="addFreightpanel = false">取 消</el-button>
    <el-button type="primary" @click="determineCity">确 定</el-button>
  </span>
    </el-dialog>


    <el-card class="box-card">
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
          <el-checkbox-group @change="checkChange" v-model="addFreightData.transportModes">
            <el-checkbox label="快递" name="type">
              <span>快递</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox label="EMS" name="type">
              <span>EMS</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox label="平邮" name="type">
              <span>平邮</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox label="空运" name="type">
              <span>空运</span>
              <i class="el-icon-edit-outline"></i>
            </el-checkbox>
            <el-checkbox label="海运" name="type">
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
      <!--      class="areaBlock"-->
      <div v-if="areaBlockShow">
        <div v-for="(item,index) in addFreightData.transportModes" style="width: 90%">
          <div class="areaBlock_box" v-if="item">
            <div class="divbox" v-if="addFreightData.transportModes"><p
              style="margin: 0;display: flex;justify-content: space-between;padding-left: 5px;padding-right: 5px">
              <span>设置可配送区域和运费</span>
              <span>{{addFreightData.transportModeList[index][0].title}}</span>
            </p>
            </div>
            <el-table border width="100%" :data="addFreightData.transportModeList[index]">
              <el-table-column label="可能配送区域">
                <template slot-scope="scope">

                  <span>默认配送所有地区
                    <i class="el-icon-edit" style="margin-left: 5px" title="编辑运送区域"
                       @click="addFreightBtn(scope.row)"></i>
                    <i v-if="scope.$index==0?false:true" @click="remFreightBtn(scope.row,index,scope.$index)"
                       class="el-icon-delete" style="margin-left: 5px" title="删除运送区域"></i>
                  </span>
                  <p>{{scope.row.deliveryAddress}}</p>
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
            <div class="divbox"><p
              style="margin: 0;padding-left: 5px;">
              <i class="el-icon-edit"></i>
              <span @click="addarea(index)">设置可配送区域和运费</span>

            </p>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/logistics/freight">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </router-link>

      <el-button type="primary" @click="testData">确 定</el-button>

    </el-card>


  </div>


</template>

<script>
  import {regionData} from 'element-china-area-data'
  import treeTransfer from 'el-tree-transfer'
  import {listRegion,createtemplate} from '@/api/region'

  export default {
    name: "addFreightpanel",
    components: {treeTransfer},
    data() {
      return {
        AAA: regionData,
        title: ['可选省、市、区', '已选省、市、区'],
        mode: "transfer", // transfer addressList
        fromData: [
          {
            id: "1",
            pid: 0,
            label: "上海市",
            children: [
              {
                id: "1-1",
                pid: "1",
                label: "市辖区",
                children: [
                  {
                    id: "1-1-1",
                    pid: "1",
                    label: "宝山区"
                  },
                ]
              },
              {
                id: "1-2",
                pid: "1",
                label: "二级 1-2",
                children: [
                  {
                    id: "1-2-1",
                    pid: "1-2",
                    children: [],
                    label: "二级 1-2-1"
                  },
                  {
                    id: "1-2-2",
                    pid: "1-2",
                    children: [],
                    label: "二级 1-2-2"
                  }
                ]
              }
            ]
          },
        ],//可选省、市、区
        toData: [],//已选省、市、区


        CityData: '',//用户选择配送区域时，记录下当前选择的数据
        addFreightpanel: false,
        addFreightData: {
          name: '',//运费模板名称
          transportModes: [],//运送方式
          priceMode: '',//计价方式
          freightCalculate: '',//运费计算方式
          transportModeList: [
            [{
              title: '快递',
              deliveryAddress: '',//运送到
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
        Arr:[]
      }
    },
    methods: {
      determineCity() {
        //确定保存选择的配送区域
        this.addFreightpanel = false
        let name = ''
        this.toData.forEach((item, index) => {
          // 省
          if (index === 0) {
            name = `${item.name}[`
          } else {
            name = `${name}、${item.name}[`
          }

          item.children.forEach((jtem, J) => {
            // 市
            if (J === 0) {
              name = `${name}${jtem.name}(`
            } else {
              name = `${name}、${jtem.name}(`
            }
            jtem.children.forEach((ztem, z) => {
              // 辖区
              if (z === 0) {
                name = `${name}${ztem.name}`
              } else {
                name = `${name}、${ztem.name}`
              }

            })
            name = `${name})`
          })
          name = `${name}]]`
        })
        console.log(name)
        this.CityData.deliveryAddress = name

      },
      remFreightBtn(data, index, i) {
        //移除可配送区域按钮
        let indexNum = this.addFreightData.transportModeList[index].indexOf(data);//获取当前要移除的数据在数据数组中的索引
        this.addFreightData.transportModeList[index].splice(indexNum, 1)
      },
      addFreightBtn(data) {
        //编辑可配送区域按钮
        this.addFreightpanel = true
        this.toData = []
        this.CityData = data
        console.log(data)
      },
      City() {
        //获取省市信息
        listRegion().then(res => {
          this.fromData = res.data.data.list
        })
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
        this.toData = toData
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      },

      addtransport() {
        //编辑运送区域
      },
      addarea(i) {
        //设置可配送区域和运费添加按钮
        console.log(i)
        let a = {
          deliveryAddress: [],//运送到
          firstPiece: null,//首件
          freight: '',// 运费
          continuate: null,// 续件
          continuateFreight: ''//续件运费
        }
        this.addFreightData.transportModeList[i].push(a)
      },
      chackradio() {
        //运费计算方式选中按钮
        if (this.addFreightData.freightCalculate === '买家承担运费' && this.addFreightData.transportModes.length !== 0) {
          this.areaBlockShow = true
        } else {
          this.areaBlockShow = false
        }
      },
      checkChange(e) {
        //运送方式选择

        if (this.addFreightData.freightCalculate === '买家承担运费' && this.addFreightData.transportModes.length !== 0) {
          this.areaBlockShow = true
        } else {
          this.areaBlockShow = false
        }
      },
      testData() {
        console.log(this.addFreightData)
        createtemplate(this.addFreightData).then(res=>{
          console.log(res)
          this.$notify.success({
            title: '成功',
            message: '确认发货成功'
          })
          this.$router.push('/logistics/freight')
        }).catch(err=>{
          console.log(err)
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
      },

    },
    created() {
      this.addFreightData=this.$route.query.data


      console.log( this.addFreightData)
      this.addFreightData.transportModeList.forEach(item=>{
        this.Arr.push([item])
      })
      this.addFreightData.transportModeList=this.Arr
      console.log(this.Arr)
      console.log( this.addFreightData)
    },
    components: {treeTransfer} // 注册
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
