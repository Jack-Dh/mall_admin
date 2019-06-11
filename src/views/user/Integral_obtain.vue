<template>
    <div class="app-container">
      <div class="Box" style="margin-top: 30px">
        <div class="title">
          <p>签到送积分</p>
        </div>

        <el-row :gutter="20">
          <el-col :span="6" style="text-align: right">
              <span>签到奖励</span>
          </el-col>

          <el-col :span="12">
            <div class="InpBox">
              <span>每天签到奖励</span>
              <el-input style="width: 100px"></el-input>
              <span>积分</span>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="16" :offset="6">
            <div class="InpBox">
              <span>每连续</span>
              <el-input style="width: 100px"></el-input>
              <span>天签到，奖励</span>
              <el-input style="width: 100px"></el-input>
              <span>积分</span>
            </div>
          </el-col>
        </el-row>

<!--      广告位设置-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16" :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <span>连续签到，每天递增奖励</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--              <span>积分，最多奖励</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--              <span>天后不再递增</span>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="20">-->
<!--          <el-col :span="6" style="text-align: right">-->
<!--            <span>广告位设置</span>-->
<!--          </el-col>-->

<!--          <el-col :span="12">-->
<!--            <div class="InpBox">-->
<!--              <span>标题</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="24">-->
<!--          <el-col  :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                :on-remove="handleRemove"-->
<!--                multiple-->
<!--                :limit="3"-->
<!--                :file-list="fileList">-->
<!--                <span>图片</span>-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <span>建议640 x 320像素</span>-->
<!--              </el-upload>-->

<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16" :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <span>链接</span>-->
<!--              <el-radio v-model="radio" label='1'>系统链接</el-radio>-->
<!--              <el-radio v-model="radio" label='1'>自定义链接</el-radio>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->


<!--        <el-row :gutter="20">-->
<!--          <el-col :span="8" :offset="6">-->
<!--            <div class="InpBox" style="margin-left: 20px">-->
<!--              <el-input></el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
      <p>
        <el-button  type="primary">保存</el-button>
      </p>
    </div>



</template>

<script>
    export default {
        name: "Integral_obtain",
      data(){
          return{
            radio:1,
          }
      }
    }
</script>

<style scoped>
 .app-container{
   color: #909399;
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
