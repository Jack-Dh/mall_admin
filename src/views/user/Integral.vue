<template>
  <div class="app-container">
    <!--    积分抵现-->
    <div class="Box">
      <div class="title" style="display: flex;justify-content: space-between;align-items: center">
        <span>积分抵现</span>
        <el-switch
          v-model="IntegralData.useStatus"
          active-text="启用"
          inactive-text="未启用">
        </el-switch>
      </div>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>抵现规则</span>
            <el-input style="width: 200px" type="number" v-model="IntegralData.cashRule">
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
            <el-radio v-model="IntegralData.useRule" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">

            <el-radio v-model="IntegralData.useRule" label="2">依据客户类型</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px">
            <el-radio v-model="IntegralData.useRule" label="3">全部客户单次消费最多可用</el-radio>
            <el-input style="width: 200px" type="number">
              <template slot="append" v-model="IntegralData.maxNumber">积分</template>
            </el-input>
          </div>
        </el-col>
      </el-row>


    </div>
    <!--    积分清零-->
    <div class="Box" style="margin-top: 30px">
      <div class="title" style="display: flex;justify-content: space-between;align-items: center">
        <span>积分清零</span>
        <el-switch
          v-model="IntegralData.clearStatus"
          active-text="启用"
          inactive-text="未启用">
        </el-switch>
      </div>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>清零规则</span>
            <el-radio v-model="IntegralData.clearRule" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">
            <el-radio v-model="IntegralData.clearRule" label="2">每自然年最后一天清除全部积分</el-radio>
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
          cashRule: null,//抵现规则
          useRule: '1',//1：代表不限制，2：依据客户类型，3：全部客户单次消费最多可用
          maxNumber: null,//全部客户单次消费最多可用多少积分
          useStatus: true,//积分抵现状态

          clearStatus: true,//积分清零状态
          clearRule: '1',//清零规则(1：代表不限制，2：每自然年最后一天清除全部积分)
        }
      }
    },
    methods: {
      marketsaveBtn() {
        //保存积分策略信息
        marketsave(this.IntegralData).then(res => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          });
          this.IntegralList()
        }).catch(err => {
          console.log(err)
        })
      },
      IntegralList() {
        //积分策略信息获取
        marketlist().then(res => {
          console.log(res)
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
