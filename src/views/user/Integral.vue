<template>
  <div class="app-container">
    <div class="Box">
      <div class="title">
        <p>积分抵现</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>抵现规则</span>
            <el-input style="width: 200px">
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
            <el-radio v-model="radio" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">

            <el-radio v-model="radio" label="1">依据客户类型</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px">
            <el-radio v-model="radio" label="1">全部客户单词消费最多可用</el-radio>
            <el-input style="width: 200px">
              <template slot="append">积分</template>
            </el-input>
          </div>
        </el-col>
      </el-row>






    </div>

    <div class="Box" style="margin-top: 30px">
      <div class="title">
        <p>积分清零</p>
      </div>



      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox">
            <span>清零规则</span>
            <el-radio v-model="radio" label="1">不限制</el-radio>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="InpBox" style="margin-left: 105px;margin-bottom: 5px">
            <el-radio v-model="radio" label="1">每自然年最后一天清除全部积分</el-radio>
          </div>
        </el-col>
      </el-row>
    </div>




    <p>
      <el-button  type="primary">保存</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Integral",
    data() {
      return {
        radio: 1,
      }
    }
  }
</script>

<style scoped>
  .app-container{
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
