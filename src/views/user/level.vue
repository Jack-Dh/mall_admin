<template>
  <div class="app-container">
    <p>等级规则</p>
    <table class="tableBox">
      <tr>
        <th class="title">成长依据</th>
        <th class="radio">
          <el-radio v-model="levelListData.growValue" label='1'>累计消费</el-radio>
        </th>
        <th class="note">默认成长值等于该会员的累计消费值，且成长值伴随着消费的增加而增加</th>
      </tr>
      <tr class="trbox">
        <th></th>
        <th class="radio">
          <el-radio v-model="levelListData.growValue" label='2'>累计积分</el-radio>
        </th>
        <th class="note">默认成长值等于该会员的累计积分值，且成长值伴随着充值金额的增加而增加</th>
      </tr>
    </table>

    <table class="tableBox">

      <tr>
        <th class="title">等级有限期</th>
        <th class="radio">
          <el-radio v-model="levelListData.levelTime" label='1'>永久有效</el-radio>
        </th>
        <th class="note"></th>
      </tr>
      <tr>
        <th class="title"></th>
        <th class="radio">
          <el-radio v-model="levelListData.levelTime" label='2'>每个自然年扣除成长值</el-radio>
        </th>
        <th class="note">成长值扣除后将根据剩余成长值重新计算等级</th>
      </tr>
    </table>

    <div class="levelListDataBox">
      <p>等级列表</p>
      <el-table
        :data="levelListData.levelList"
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        stripe
        style="width: 100%">
        <el-table-column
          prop="levelNumber"
          label="等级编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="levelName"
          label="等级名称"
          width="230">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.levelName"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="成长值范围"
        >
          <template slot-scope="scope">
            <el-input size="mini" class="growthInput" type="number" v-model="scope.row.startQuantity"></el-input>
            -
            <el-input size="mini" class="growthInput" type="number" v-model="scope.row.endQuantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="折扣率"
          width="230">
          <template slot-scope="scope">
            <el-input size="mini" type="number" v-model="scope.row.discountRate">
              <template slot="append">%</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="成长值扣除数量"
          width="180">
          <template slot-scope="scope">
            <el-input size="mini" type="number" v-model="scope.row.deductionQuantity"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <p>
        <el-button type="success" size="mini" :disabled="buttonShow" @click="addlevelBtn">添加等级</el-button>
      </p>

    </div>

    <p>
      <el-button type="primary"   @click="addlevelSave">保存</el-button>
    </p>

  </div>
</template>

<script>
  import { gradesave } from '@/api/user'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "level",
    comments:{
      Pagination
    },
    data() {
      return {
        radio: '1',
        buttonShow: false,//添加等级按钮
        levelListData: {
          growValue:'1',//成长值依据(1:代表累计消费，2：代表累计积分)
          levelTime:'1',//等级有效期(1:代表永久有效，2：代表每个自然年扣除成长值)
          //等级列表
          levelList:[
          {
            levelNumber: 1,//等级编号
            levelName: '基础会员',//等级名称
            /**
             * 成长值范围
             * */
            startQuantity: 0,
            endQuantity: 500,
            discountRate: null,//折扣率
            deductionQuantity: null,//成长值扣除数量
          }]
        },
      }
    },
    methods: {
      addlevelSave(){
        //保存会员等级会员规则
        let data=this.levelListData
        gradesave(data).then(res=>{
          console.log(res)
        }).catch(err=>{
           console.log(err)
        })
      },
      addlevelBtn() {
        //添加会员等级
        let list = this.levelListData.levelList[this.levelListData.levelList.length - 1].endQuantity
        let data = {
          levelNumber:this.levelListData.levelList[this.levelListData.levelList.length - 1].levelNumber+1 ,//等级编号
          levelName: '基础会员',//等级名称
          startQuantity: list + 1,
          endQuantity: list + 500,
          discountRate: null,//折扣率
          deductionQuantity: null,//成长值扣除数量
        }
        this.levelListData.levelList.push(data)
        if (this.levelListData.levelList.length >= 5) {
          this.buttonShow = true
        }
      }
    }, created() {
      if (this.levelListData.levelList.length >= 5) {
        this.buttonShow = true
      }
    }
  }
</script>

<style scoped>
  .app-container{
    color: #909399;
  }
  .tableBox {
    border: 1px dashed #ececec;
    width: 100%;
    line-height: 50px;
  }
.levelListDataBox{
  border: 1px dashed #ececec;
  width: 100%;
  border-top: none;
}
  .note {
    text-align: left;
    color: #b2b2b2;
    font-weight: 300;
    font-size: 12px;
  }

  .title {
    text-align: left;
    font-weight: 300;
    width: 33%
  }

  .radio {
    text-align: left;
    width: 33%
  }

  .trbox {
    border-bottom: 1px solid red;
  }

  .growthInput {
    width: 45%;
  }
</style>
