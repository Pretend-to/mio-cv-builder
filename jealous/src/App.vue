<template>
  <header>
    <div id="head-info">
      <div id="title-bar">
        <div>王瀚熙-前端方向</div>
        <svg t="1705396895103" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4219" width="18" height="18" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z"
            fill="#666666" p-id="4220"></path>
          <path
            d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z"
            fill="#666666" p-id="4221"></path>
        </svg>
      </div>
      <div v-if="isCached" id="cache-status">
        <img class="cached" src="@/assets/icons/cached.svg" style="" alt="cached">
        <div>草稿保存成功</div>
      </div>
      <div v-else id="cache-status">
        <img class="caching" src="@/assets/icons/caching.svg" alt="caching">
        <div>草稿正在保存</div>
      </div>
    </div>
    <div id="tail-info">
      <div id="options">
        <el-button>切换模板</el-button>
      </div>
      <div id="final-options">
        <div>
          <el-button>导出图片</el-button>
          <el-button type="primary">导出pdf</el-button>
        </div>
      </div>
    </div>
  </header>
  <div id="info">
    <div class="big-block" id="baseinfo">
      <div class="blocks-title">个人信息</div>
      <div class="blocks">
        <div v-for="(value, key) in baseInfo" :key="key" class="block">
          <div v-if="key === 'avatar'" class="block" :id="key">
            <el-avatar :size="70" shape="square" :src="value" @error="errorHandler">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <div class="avatar-options"
              style="display: flex;flex-direction: column;justify-content: center; font-size: 10px; margin-left: 8px;">
              <a href="#">编辑</a>
              <a href="#">删除</a>
            </div>
          </div>
          <div v-else class="block" :id="key">
            <div class="key">{{ makeTitle(key) }}</div>
            <input type="text" :placeholder="makeTip(key)" :value="value">
          </div>            
        </div>
      </div>
    </div>
    <div class="big-block" id="selfStrengh">
      <div class="blocks-title">个人优势</div>
      <div class="blocks" >
        <div style="border: 1px solid #ccc;flex-grow: 1;">
          <Toolbar
          style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 300px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </div>
    </div>
    <div class="big-block" id="perfessionalSkills">
      <div class="blocks-title">专业技能</div>
      <div class="blocks" >
        <div style="border: 1px solid #ccc; flex-grow: 1;">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRefs"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 300px; overflow-y: hidden;"
            v-model="valueHtmls"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreateds"
          />
        </div>
      </div>
    </div>
    <div class="big-block" id="schoolinfo">
      <div class="blocks-title">教育经历</div>
      <div v-for="(item, index) in allSchoolInfo" :key="index" class="blocks" style="border: 1px solid #ccc;">
        <div class="schoolHead" style="width: 100%; display: flex;;">
          <div class="block" style=" flex-basis: 80%; flex-grow: 7">
            <div class="head-title">{{ item.baseInfo.schoolName? item.baseInfo.schoolName : '学校名称未填写' }}</div>
            <div class="head-info" style="display: flex; ;">
              <div>{{ item.baseInfo.schoolLevel? item.baseInfo.schoolLevel : '学历' }}</div>
              <div style="border-left: 1px solid #ccc; border-right: 1px solid #ccc;">{{ item.baseInfo.studySubject? item.baseInfo.studySubject : '专业' }}</div>
              <div>{{ item.baseInfo.studyDate? item.baseInfo.studyDate : '在校时间' }}</div>
            </div>
          </div>
          <div class="block" style=" flex-basis: 20%; flex-grow: 1;">
            <div class="head-button" id="showMoreSchoolInfo" @click="item.display = !item.display">
              <svg t="1705501794483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4206" width="14" height="14"><path d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z" p-id="4207"></path></svg>
            </div>
          </div>                        
        </div>
        <div v-if="item.display" class="schoolBody" >
          <div v-for="(value, key) in item.baseInfo" :key="key" class="block">
            <div class="key">{{ makeTitle(key) }}</div>
            <input type="text" :placeholder="makeTip(key)" :value="value">
          </div>




        </div>
      </div>
      <button @click="addSchool">+ 添加新的教育经历</button>
      </div>
    </div>

  <div id="preview">
    <img :src="message" alt="Preview">
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
 
export default {
  data() {
    const baseInfo = {
      name: '',
      avatar: '',
      expectedJob: '',
      sex: '',
      birthday: '',
      email: '',
      phoneNumber: '',
      expectedCity: '',
      wechatId: '',
      expectedSalary: '',
      politicalStatus: '',
    }

    const chineseInfo = {
      name: '姓名',
      avatar: '头像',
      expectedJob: '期望职业',
      sex: '性别',
      birthday: '出生日期',
      email: '邮箱',
      phoneNumber: '手机号',
      expectedCity: '期望城市',
      wechatId: '微信号',
      expectedSalary: '期望薪资',
      politicalStatus: '政治面貌',
      schoolName: '学校名称',
      schoolLevel: '学历',
      studyDate: '入学时间',
      studySubject: '专业',
      mainProject: '在校经历'
    }

    // const schoolInfo = {
    //     schoolName:"",
    //     schoolLevel:"",
    //     studyDate:"",
    //     studySubject:"",
    //     mainProject:"",
    //     display: false
    // }

    const schoolInfo = {
        baseInfo:{
          schoolName:"河北科技大学",
          schoolLevel:"本科",
          studyDate:"2022-2026",
          studySubject:"人工智能",
        },
        mainExp:"xxx",
        display: true
    }

    const allSchoolInfo = []
    
    const allEditor = []

    const editorRef = shallowRef()
    const editorRefs = shallowRef()
    const valueHtml = '<p>hello</p>'
    const valueHtmls = '<p>hello</p>'
    const toolbarConfig = {}

    toolbarConfig.excludeKeys = [
      'group-image',
      'insertVideo',
      'fullScreen',// 排除菜单组，写菜单组 key 的值即可
      'header1',
      'header2',
      'header3',
      'through',
      'insertTable'
    ]

    const editorConfig = { placeholder: '请输入内容...' }

    const handleCreated = (editor) => {
      editorRef.value = editor
    }

    const handleCreateds = (editor) => {
      editorRefs.value = editor
    }
   
    return {
      message: '/preview.jpg',
      baseInfo: baseInfo,
      chineseInfo: chineseInfo,
      labelPosition: 'top',
      isCached: false,
      editorRef,
      editorRefs,
      valueHtml,
      valueHtmls,
      mode: 'simple',
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleCreateds,
      allSchoolInfo,
      schoolInfo,
      allEditor,
    };
  },
  methods: {
    errorHandler(e) {
      console.log(e);
    },
    makeTip(key) {
      return "请输入" + this.chineseInfo[key];
    },
    makeTitle(key) {
      return this.chineseInfo[key];
    },
    addSchool() {
      if(this.allSchoolInfo.length >= 4) {
        alert("最多只能添加4条学校信息")
        return
      }
      this.allSchoolInfo.push(this.schoolInfo)
    }
  },
  watch: {
    isCached(val) {
      this.$store.commit('setIsCached', val);
    },
    message(val) {
      this.$store.commit('setMessage', val);
    },
  },
  components:{
    Editor,
    Toolbar
  },
  mounted() {
    setTimeout(() => {
         this.valueHtml = '<p>模拟 Ajax 异步设置内容</p>'
       }, 1500)
  },
  beforeUnmount() {
    const editor = this.editorRef.value
    const editors = this.editorRefs.value

    if (editor == null && editors == null) return
    else {
      editor.destroy();
      editors.destroy()
    }
  }
}
</script>

<style>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

#head-info {
  position: fixed;
  height: 50px;
  width: calc(50% - 24px);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-left: 24px;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 255, 255);
  z-index: 999;

}

#tail-info {
  position: fixed;
  height: 50px;
  display: flex;
  padding: 8px 12px 0px 12px;
  right: 0px;
  width: calc(50% - 24px);
  background-color: rgb(245, 247, 250);
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  justify-content: space-between;
}

#tail-info button {
  margin-top: 4px;
}

#title-bar {
  display: flex;
  font-size: 14px;
  font-weight: bold;
}

#cache-status {
  margin-top: 8px;
  display: flex;
  font-size: 10px;
  color: rgb(128, 128, 128);
}

#title-bar svg {
  margin-left: 8px;
}

#title-bar svg:hover path {
  fill: blue;
}


#cache-status img {
  margin-right: 6px;
}

#cache-status img.caching {
  animation: rotate 2s linear infinite;
}

#app {
  display: flex;
}

#info {
  padding-top: 88px;
  width: calc(50% - 32px);
  min-height: 100vh;
  padding-left: 32px;
}

.blocks {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-right: 48px;
  justify-content: space-between;
}

.block {
  /* border: 1px solid #ccc; */
  flex-basis: 48%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.block#avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.block .key {
  font-size: 14px;
  color: rgb(128, 128, 128);
  margin-bottom: 8px;
}

.block input {
  border: none;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  background-color: rgb(248, 249, 250);
  outline-color: rgba(64, 158, 255, 0.637);
  outline-width: 0.5px;
  height: 20px;
}

.blocks-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.big-block {
  margin-bottom: 24px;
  /* border: 1px solid #ccc; */
}

#preview {
  position: fixed;
  top: 0px;
  right: 0px;
  height: 100vh;
  overflow-y: hidden;
  width: 50%;
  display: flex;
  justify-content: center;
  background-color: rgb(242, 245, 250);
}

#preview img {
  margin-top: 72px;
  margin-bottom: 24px;
}
.head-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 4px;
}


.head-info {
  display: flex;
  margin-bottom: 8px;
}

.head-info div {
  margin-right: 8px;
  font-size: 14px;
  padding: 0px 4px;
  color: rgb(128, 128, 128);
}

#schoolinfo .blocks{
  flex-direction: column;
}

.schoolHead {
  padding-top: 8px;
  flex-basis: 64px;
}

.schoolHead .block {
  height: 60px;
  border: none;
  padding: 8px;
}

.schoolBody {
  display: flex;
  margin-top: 16px;
  width: 100%;
  height: 500px;
  flex-wrap: wrap;
  align-content: flex-start;
}

.schoolBody .block {
  flex-basis: 40%;
  flex-grow: 1;
  padding: 0px 8px;
}

.block .head-button {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 8px;
  transition: transform 0.3s ease-in-out;
}


.block .head-button:hover path{
  fill: rgb(0, 200, 255);
}


</style>