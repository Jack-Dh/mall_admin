<template>
  <div class="app-container">
    <!--    积分抵现-->
    <div class="Box">
      <div class="title" style="display: flex;justify-content: space-between;align-items: center">
        <span>积分抵现</span>
        <el-switch
          v-model="IntegralData.useStatusObject.status"
          active-text="启用"
          inactive-text="未启用">
        </el-switch>
      </div>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>抵现规则</span>
            <el-input style="width: 200px" type="number" v-model="IntegralData.cashRuleObject.cashRule">
              <template slot="append">积分</template>
            </el-input>
            <span>=1.00</span>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>使用限制</span>
            <el-radio @change="radioChange" v-model="IntegralData.useRuleObject.useRule" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px">
            <el-radio @change="radioChange" v-model="IntegralData.useRuleObject.useRule" label="3">全部客户单次消费最多可用
            </el-radio>
            <el-input style="width: 200px" type="number" :disabled="integralInpShow"
                      v-model="IntegralData.maxNumberObject.maxNumber">
              <template slot="append">积分</template>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 15px">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">
            <el-radio @change="radioChange" v-model="IntegralData.useRuleObject.useRule" label="2">依据客户类型</el-radio>
          </div>
        </el-col>
      </el-row>

      <div style="text-align: center;padding-left: 30%;margin-top: 10px" v-if="userTypeList">
        <el-table
          border
          stripe
          style="width: 50%"
          :data="IntegralData.userTypeList"
        >
          <el-table-column
            label="等级名称"
            prop="gradeName"
          ></el-table-column>
          <el-table-column
            label="单次消费最多可用"
          >
            <template slot-scope="scope">
<!--              <el-form :model="scope.row" ref="numberValidateForm" label-width="100px"-->
<!--                       class="demo-ruleForm">-->
<!--                <el-form-item-->
<!--                  prop="userMaxNumber"-->
<!--                  :rules="[-->
<!--      { required: true, message: '必须填写'},-->
<!--      { type: 'number', message: '只允许输入正整数'}-->
<!--    ]"-->
<!--                >-->
<!--                  <el-input type="number" v-model.number="scope.row.userMaxNumber" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->

<!--              </el-form>-->
                            <el-input v-model="scope.row.userMaxNumber" type="number">
                              <template slot="append">积分</template>
                            </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>


    </div>
    <!--    积分清零-->
    <div class="Box" style="margin-top: 30px">
      <div class="title" style="display: flex;justify-content: space-between;align-items: center">
        <span>积分清零</span>
        <el-switch
          v-model="IntegralData.clearStatusObject.status"
          active-text="启用"
          inactive-text="未启用">
        </el-switch>
      </div>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>清零规则</span>
            <el-radio v-model="IntegralData.clearRuleObject.clearRule" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">
            <el-radio v-model="IntegralData.clearRuleObject.clearRule" label="2">每自然年最后一天清除全部积分</el-radio>
          </div>
        </el-col>
      </el-row>
    </div>
    <p>
      <el-button type="primary" @click="marketsaveBtn">保存</el-button>
    </p>
  </div>
</template>


<script>
  import {marketlist} from '@/api/user'
  import {marketsave} from '@/api/user'

  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "Integral",
    data() {
      return {
        radio: 1,
        stateS: true,
        IntegralData: {
          cashRuleObject: {cashRule: null},//抵现规则
          useRuleObject: {useRule: '1'},//1：代表不限制，2：依据客户类型，3：全部客户单次消费最多可用
          maxNumberObject: {maxNumber: null},//全部客户单次消费最多可用多少积分
          useStatusObject: {status: true},//积分抵现状态
          clearStatusObject: {status: true},//积分清零状态
          clearRuleObject: {clearRule: '1'},////清零规则(1：代表不限制，2：每自然年最后一天清除全部积分)
        },
        userTypeList: false,//依据客户类型
        integralInpShow: true,
      }
    },
    methods: {
      radioChange(e) {
        //使用限制切换
        this.IntegralData.useRuleObject.useRule = e
        if (e === '3') {
          this.userTypeList = false
          this.integralInpShow = false
        } else if (e === '2') {
          this.userTypeList = true
          this.integralInpShow = true
        } else {
          this.integralInpShow = true
          this.userTypeList = false
          this.IntegralData.maxNumberObject.maxNumber = null
        }

      },
      marketsaveBtn() {
        //保存积分策略信息
        console.log(this.IntegralData.useRuleObject.useRule)
        if (this.IntegralData.useRuleObject.useRule!=='2'){
          this.IntegralData.userTypeList=[]
        }
        marketsave(this.IntegralData).then(res => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          });
          this.IntegralList(this.IntegralData)
          console.log()
        }).catch(err => {
          console.log(err)
        })
      },
      IntegralList() {
        //积分策略信息获取
        marketlist().then(res => {
          console.log(res)
          this.IntegralData = res.data.data
        })
      }
    },
    created() {
      this.IntegralList()
    }
  }
</script>

<style scoped>
  .app-container {
    color: #909399;
  }

  .InpBox {
    display: flex;
    align-items: center;
  }

  .InpBox span {
    margin-left: 20px;
    margin-right: 20px;
  }

  .Box {
    /*dashed*/
    border: 1px solid #ececec;
    width: 100%;
    line-height: 50px;
    padding-bottom: 20px;
  }

  .Box .title {
    background-color: #f5f5f5;

    padding-left: 10px;
  }

  .Box .title p {
    margin-top: 0px;
  }
</style>
