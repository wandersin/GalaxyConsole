<template>
  <el-row id="random-password-row">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="所用字符" span="2">
        <el-checkbox-group v-model="rule.seed">
          <el-checkbox label="abcdefghijklmnopqrstuvwxyz">a-z</el-checkbox>
          <el-checkbox label="ABCDEFGHIJKLMNOPQRSTUVWXYZ">A-Z</el-checkbox>
          <el-checkbox label="0123456789">0-9</el-checkbox>
          <el-checkbox label="!@#$%">!@#$%</el-checkbox>
        </el-checkbox-group>
      </el-descriptions-item>
      <el-descriptions-item label="排除字符" span="2">
        <el-input v-model="rule.exclude"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="密码长度">
        <el-select v-model="rule.length" placeholder="请选择密码长度">
          <el-option value="6" label="6"/>
          <el-option value="8" label="8"/>
          <el-option value="16" label="16"/>
          <el-option value="32" label="32"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="密码数量">
        <el-select v-model="rule.num" placeholder="请选择生成数量">
          <el-option value="5" label="5"/>
          <el-option value="10" label="10"/>
          <el-option value="20" label="20"/>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item span="2">
        <el-button type="primary" @click="generate" :disabled="rule.seed.length === 0">生成密码</el-button>
      </el-descriptions-item>
      <el-descriptions-item v-if="result.length !== 0" label="生成结果" span="2">
        <div v-for="item in result" :key="item">
          <el-button id="copy-btn" icon="el-icon-document-copy" size="mini" plain @click="copyPassword(item)"></el-button>
          <span>{{ item }}</span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-row>
</template>

<script>
export default {
  name: "RandomPassword",
  components: {
  },
  data() {
    return {
      rule: {
        seed: [
            "abcdefghijklmnopqrstuvwxyz",
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "0123456789"
        ],
        excludeFlag: false,
        exclude: '',
        length: 16,
        num: 5,
      },
      result: []
    }
  },
  methods: {
    // 生成所有密码
    generate() {
      this.result.length = 0;
      console.log(this.seedStr);
      for (let i = 0; i < this.rule.num; i++) {
        this.result.push(this.generateOne());
      }
    },
    // 生成一个密码
    generateOne() {
      let passwd = '';
      for (let i = 0; i < this.rule.length; i++) {
        let c;
        do {
          c = this.randomChar();
        } while (this.rule.exclude.indexOf(c) > -1)
        passwd = `${passwd}${c}`;
      }
      return passwd;
    },
    // 生成一个随机字符
    randomChar() {
      let index = Math.floor(Math.random() * this.seedStr.length);
      return this.seedStr.charAt(index);
    },
    async copyPassword(text) {
      await navigator.clipboard.writeText(text);
      this.$message.success("复制成功");
    }
  },
  computed: {
    seedStr() {
      let tmp = '';
      this.rule.seed.forEach(str => tmp=`${tmp}${str}`);
      return tmp;
    }
  }
}
</script>

<style scoped>
#random-password-row {
  padding: 1rem 15%;
}

#copy-btn {
  margin: .25rem 1rem;
}
</style>