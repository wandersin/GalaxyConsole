<template>
  <div id="script-detail-body">
    <el-descriptions class="margin-top" :column="4" border>
      <el-descriptions-item :span="4">
        <template slot="label" style="width: 20rem;">
          <i class="el-icon-key"></i>
          脚本id
        </template>
        {{ scriptDetail.scriptId }}
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template slot="label" style="width: 50%;">
          <i class="el-icon-tickets"></i>
          脚本名称
        </template>
        {{ scriptDetail.scriptName }}
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template slot="label">
          <i class="el-icon-download"></i>
          下载链接
        </template>
        <el-link :href="scriptDetail.ossUrl" target="_blank">{{ scriptDetail.ossUrl }}</el-link>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-edit"></i>
          创建日期
        </template>
        {{ this.$moment(scriptDetail.createdTime).format('YYYY-MM-DD hh:mm:ss') }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-edit-outline"></i>
          更新日期
        </template>
        {{ this.$moment(scriptDetail.updatedTime).format('YYYY-MM-DD hh:mm:ss') }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-monitor"></i>
          执行机列表
        </template>
        <!-- 树形选择器 -->
        <el-tree :data="hostList"
                 :props="hostProps"
                 show-checkbox
                 ref="tree"
                 style="width: 30rem; margin-right: -100rem;"
                 @check-change="getHost">
          <el-row class="host-tree-item" slot-scope="{ node, data }">
            <el-col :span="12">
              <div>{{ node.label }}</div>
            </el-col>
            <el-col v-if="data.hostFlag" :span="10" :offset="2">
              <el-select v-if="data.hostFlag" size="mini" v-model="data.user" placeholder="执行用户" @change="getHost">
                <el-option v-for="user in data.userList"
                           :key="user.name"
                           :label="user.name"
                           :value="user.name">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tree>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          <i class="el-icon-cpu"></i>
          脚本详情
        </template>
        <el-input type="textarea" :rows="15" placeholder="请稍后" v-model="scriptContent" readonly/>
      </el-descriptions-item>
      <el-descriptions-item :span="4">
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          参数列表
        </template>
        <el-row style="position: relative">
          <el-col :span="6">
            <el-row v-for="(item, index) in parameterArr" :key="item" class="parameter-box">
              <el-col :span="20">
                <el-input placeholder="请输入参数值" v-model="body.parameters[item]" @input="refreshJson" clearable>
                  <template slot="prepend" style="width: 3rem;">{{ item }}</template>
                </el-input>
              </el-col>
              <el-col :span="3" :offset="1" class="parameter-button-box">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteParameter(item, index)" circle plain></el-button>
              </el-col>
            </el-row>
            <el-row class="parameter-box">
              <!-- 添加参数所需内容 -->
              <el-row v-if="addParameterFlag" class="add-parameter-row">
                <el-col :span="8">
                  <el-input placeholder="参数名" v-model="newParameter.fullName" size="mini" clearable/>
                </el-col>
                <el-col :span="8" :offset="1">
                  <el-input placeholder="缩写" v-model="newParameter.abbreviation" size="mini" clearable/>
                </el-col>
                <el-col :span="5" :offset="2" class="add-parameter-row">
                  <el-button type="success" size="mini" icon="el-icon-check" @click="saveParameter" circle plain></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-close" @click="cancel" circle plain></el-button>
                </el-col>
              </el-row>
              <!-- 添加参数 -->
              <el-button v-if="!addParameterFlag" type="success" size="mini" icon="el-icon-plus" @click="addParameter" circle plain></el-button>
            </el-row>
            <div id="operate-box">
              <el-button plain>执行脚本</el-button>
            </div>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-input type="textarea" :rows="13" v-model="parameterRaw" readonly/>
          </el-col>
        </el-row>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "ScriptDetail",
  data() {
    return {
      scriptContent: '',
      // 参数列表
      body: {
        hostInfo: [],
        parameters: {}
      },
      // 执行脚本请求参数
      parameterRaw: '',
      parameterArr: [],
      // 执行机列表
      hostList: [
        {
          label: 'Alpha',
          hostFlag: false,

          children: [
            {
              label: '192.168.3.2',
              user: '',
              hostFlag: true,
              userList: [
                {
                  name: 'pi'
                }
              ]
            },
            {
              label: '192.168.3.20',
              user: '',
              hostFlag: true,
              userList: [
                {
                  name: 'root'
                },
                {
                  name: 'wangyunshu'
                }
              ]
            }
          ]
        },
        {
          label: 'Gamma',
          hostFlag: false,
        }
      ],
      hostProps: {},
      // 添加参数模式
      addParameterFlag: false,
      newParameter: {
        parameterId: '',
        fullName: '',
        abbreviation: '',
        belongTo: this.scriptDetail.scriptId
      }
    }
  },
  methods: {
    // 获取脚本内容
    getScriptContent() {
      this.$commonUtils.get(`${this.$rock_baseUrl}/script/content/${this.scriptDetail.scriptId}`, data => {
        this.scriptContent = data;
      })
    },
    // 刷新json格式
    refreshJson() {
      this.parameterRaw = JSON.stringify(this.body, null, 4);
      this.parameterArr = Object.keys(this.body.parameters);
    },
    // 删除参数
    deleteParameter(name, index) {
      console.log(`scriptId: ${this.scriptDetail.scriptId}, parameterName: ${name}, index: ${index}`);
      this.scriptDetail.parameterList.forEach(param => {
        if (param.fullName === name) {
          this.$commonUtils.delete(`${this.$rock_baseUrl}/parameter/delete/${param.parameterId}`, null, () => {
            this.parameterArr.splice(index, 1);
            this.$delete(this.body.parameters, name);
            this.refreshJson();
          })
        }
      })
    },
    // 开始添加参数
    addParameter() {
      this.addParameterFlag = true;
    },
    // 添加参数完成
    saveParameter() {
      this.$commonUtils.post(`${this.$rock_baseUrl}/parameter/add`, this.newParameter, () => {
        this.addParameterFlag = false;
        this.$set(this.body.parameters, this.newParameter.fullName, '');
        this.refreshJson();
        this.newParameter.fullName = '';
        this.newParameter.abbreviation = '';
      });
    },
    // 取消添加参数
    cancel() {
      this.addParameterFlag = false;
    },
    // 获取选中的主机列表
    getHost() {
      this.body.hostInfo.length = 0;
      this.refreshJson();
      this.$refs.tree.getCheckedNodes().forEach(item => {
        if (item.hostFlag) {
          let host = {};
          host.ip = item.label;
          host.user = item.user;
          this.body.hostInfo.unshift(host);
          this.refreshJson();
        }
      })
    }
  },
  created() {
    this.scriptDetail.parameterList.forEach(param => {
      this.$set(this.body.parameters, param.fullName, '');
      this.refreshJson();
    });
    this.getScriptContent();
    this.refreshJson();
  },
  props: {
    scriptDetail: Object,
  }
}
</script>

<style scoped>
#script-detail-body {
  width: 100%;
}

#script-download-url {
  color: #606266;
  font-weight: bolder;
}

>>> .el-descriptions-row>th {
  width: 15%;
}

>>> .el-input-group__prepend {
  width: 30%;
  overflow: hidden;
}

.parameter-box {
  margin: .5rem 0;
}

#operate-box {
  position: absolute;
  bottom: 0;
  left: 0;
}

.parameter-button-box {
  margin-top: 6px;
}

.host-tree-item {
  height: 40px;
  line-height: 40px;
  width: 100%;
}

>>> .el-tree-node__content {
  height: 40px;
  line-height: 40px;
}

>>> .el-descriptions-item__content {
  vertical-align: top;
}
</style>
