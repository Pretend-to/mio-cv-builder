<template>
  <header>
    <div id="head-info">
      <div id="title-bar">
        <div>{{ baseInfo_d.name + '-' + baseInfo_d.expectedJob }}</div>
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
          <el-button @click="getPic">导出图片</el-button>
          <el-button type="primary" @click="getPdf">导出pdf</el-button>
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
            <el-avatar :size="70" shape="square" :src="baseInfo_d.avatar" @error="errorHandler">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <div class="avatar-options"
              style="display: flex;flex-direction: column;justify-content: center; font-size: 10px; margin-left: 8px;">
              <a href="#" @click.stop.prevent="showupload = !showupload">编辑</a>
              <a href="#" @click.stop.prevent="userAvatar = ''" >删除</a>
            </div>
          </div>
          <div v-else class="block" :id="key">
            <div class="key">{{ makeTitle(key) }}</div>
            <input type="text" :placeholder="makeTip(key)" v-model="baseInfo_d[key]" @blur="updatepage">
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
            :editor="strengthEditorRef"
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
            :editor="skillsEditorRef"
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
            <div class="head-title">{{ allSchoolInfo_d[index].baseInfo.schoolName? allSchoolInfo_d[index].baseInfo.schoolName : '学校名称未填写' }}</div>
            <div class="head-info" style="display: flex; ;">
              <div>{{ allSchoolInfo_d[index].baseInfo.schoolLevel? allSchoolInfo_d[index].baseInfo.schoolLevel : '学历' }}</div>
              <div style="border-left: 1px solid #ccc; border-right: 1px solid #ccc;">{{ allSchoolInfo_d[index].baseInfo.studySubject? allSchoolInfo_d[index].baseInfo.studySubject : '专业' }}</div>
              <div>{{ allSchoolInfo_d[index].baseInfo.studyDate? item.baseInfo.studyDate : '在校时间' }}</div>
            </div>
          </div>
          <div class="block" id="head-buttons" style="flex-basis: 20%; flex-grow: 1;">
            <div class="head-button" id="showMoreSchoolInfo" @click="item.display = !item.display">
              <svg t="1705501794483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4206" width="14" height="14"><path d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z" p-id="4207"></path></svg>
            </div>
            <div class="head-button" id="delSchoolInfo" @click="delSchool(index)">
              <svg t="1705666389060" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="14" height="14"><path d="M515.413333 168.675556a128.284444 128.284444 0 0 0-129.137777 125.724444H223.004444a34.133333 34.133333 0 0 0 0 67.982222h37.546667v367.217778c0 67.982222 47.502222 125.724444 105.244445 125.724444h295.822222c56.888889 0 105.244444-56.888889 105.244444-125.724444v-369.777778h34.133334a34.133333 34.133333 0 0 0 0-67.982222h-153.031112a135.964444 135.964444 0 0 0-132.551111-122.311111z m-67.982222 125.724444a69.688889 69.688889 0 0 1 67.982222-64.568889 67.413333 67.413333 0 0 1 67.982223 64.568889z m-81.635555 499.768889c-20.48 0-44.088889-28.444444-44.088889-64.568889v-369.777778h380.586666v366.364445c0 37.262222-23.608889 64.568889-44.088889 64.568889l-292.408888 3.413333z" fill="#999999" p-id="4219"></path><path d="M409.884444 709.12a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.28 33.28 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-27.022222 33.848889v190.293333a31.288889 31.288889 0 0 0 27.022222 35.271111z m98.702223 0a31.288889 31.288889 0 0 0 28.444444-34.133333V483.555556a33.28 33.28 0 0 0-28.444444-33.848889 31.004444 31.004444 0 0 0-28.444445 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444445 35.271111z m102.115555 0a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.564444 33.564444 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-28.444444 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444444 35.271111z" fill="#999999" p-id="4220"></path></svg>
            </div>
          </div>                        
        </div>
        <div v-if="item.display" class="schoolBody" >
          <div v-for="(value, key) in item.baseInfo" :key="key" class="block">
            <div class="key">{{ makeTitle(key) }}</div>
            <input type="text" :placeholder="makeTip(key)"  v-model="allSchoolInfo_d[index].baseInfo[key]" @blur="updatepage">
          </div>
          <div class="block" id="schoolMainExp" >
            <div class="key">在校经历</div>
            <el-input
               v-model="allSchoolInfo_d[index].mainExp"
               :rows="10"
               type="textarea"
               placeholder="比如在学校参加的活动，社团，获奖经历等"
               :autosize="{ minRows: 8, maxRows: 12 }"
               @input="updatepage"
             />
          </div>
        </div>
      </div>
        <el-button
          type=""
          text
          @click="addSchool"
          style="margin-top: 16px;"
          :disabled="allSchoolInfo.length === 4"
        >+ 添加学校</el-button>
    </div>
    <div class="big-block" id="schoolinfo">
      <div class="blocks-title">项目经历</div>
      <div v-for="(item, index) in allProjectInfo" :key="index" class="blocks" style="border: 1px solid #ccc;">
        <div class="schoolHead" style="width: 100%; display: flex;;">
          <div class="block" style=" flex-basis: 80%; flex-grow: 7">
            <div class="head-title">{{ allProjectInfo_d[index].baseInfo.projectName? allProjectInfo_d[index].baseInfo.projectName : '未填写项目名称' }}</div>
            <div class="head-info" style="display: flex; ;">
              <div>{{ allProjectInfo_d[index].baseInfo.projectCharacter? allProjectInfo_d[index].baseInfo.projectCharacter : '项目角色' }}</div>
              <div style="border-left: 1px solid #ccc; ">{{ allProjectInfo_d[index].baseInfo.projectDate? allProjectInfo_d[index].baseInfo.projectDate : '项目时间' }}</div>
            </div>
          </div>
          <div class="block" id="head-buttons" style=" flex-basis: 20%; flex-grow: 1;">
            <div class="head-button" id="showMoreProjectInfo" @click="item.display = !item.display">
              <svg t="1705501794483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4206" width="14" height="14"><path d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z" p-id="4207"></path></svg>
            </div>
            <div class="head-button" id="delProjectInfo" @click="delProject(index)">
              <svg t="1705666389060" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4218" width="14" height="14"><path d="M515.413333 168.675556a128.284444 128.284444 0 0 0-129.137777 125.724444H223.004444a34.133333 34.133333 0 0 0 0 67.982222h37.546667v367.217778c0 67.982222 47.502222 125.724444 105.244445 125.724444h295.822222c56.888889 0 105.244444-56.888889 105.244444-125.724444v-369.777778h34.133334a34.133333 34.133333 0 0 0 0-67.982222h-153.031112a135.964444 135.964444 0 0 0-132.551111-122.311111z m-67.982222 125.724444a69.688889 69.688889 0 0 1 67.982222-64.568889 67.413333 67.413333 0 0 1 67.982223 64.568889z m-81.635555 499.768889c-20.48 0-44.088889-28.444444-44.088889-64.568889v-369.777778h380.586666v366.364445c0 37.262222-23.608889 64.568889-44.088889 64.568889l-292.408888 3.413333z" fill="#999999" p-id="4219"></path><path d="M409.884444 709.12a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.28 33.28 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-27.022222 33.848889v190.293333a31.288889 31.288889 0 0 0 27.022222 35.271111z m98.702223 0a31.288889 31.288889 0 0 0 28.444444-34.133333V483.555556a33.28 33.28 0 0 0-28.444444-33.848889 31.004444 31.004444 0 0 0-28.444445 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444445 35.271111z m102.115555 0a31.288889 31.288889 0 0 0 28.444445-34.133333V483.555556a33.564444 33.564444 0 0 0-28.444445-33.848889 31.004444 31.004444 0 0 0-28.444444 33.848889v190.293333c1.137778 21.617778 11.377778 35.271111 28.444444 35.271111z" fill="#999999" p-id="4220"></path></svg>
            </div>
          </div>                        
        </div>
        <div v-if="item.display" class="schoolBody" >
          <div v-for="(value, key) in item.baseInfo" :key="key" class="block">
            <div class="key">{{ makeTitle(key) }}</div>
            <input type="text" :placeholder="makeTip(key)" v-model="allProjectInfo_d[index].baseInfo[key]" @blur="updatepage">
          </div>
          <div class="block" id="schoolMainExp" >
            <div class="key">项目描述</div>
            <el-input
               v-model="allProjectInfo_d[index].mainExp"
               :rows="10"
               type="textarea"
               placeholder="比如你在项目开发中的主要任务是什么？重难点是什么？如何解决？取得了什么效果或成就？"
               :autosize="{ minRows: 8, maxRows: 12 }"
               @input="updatepage"
             />
          </div>
        </div>
      </div>
        <el-button
          type=""
          text
          @click="addProject"
          style="margin-top: 16px;"
          :disabled="allProjectInfo.length === 2"
        >+ 添加项目</el-button>
    </div>
  </div>
  <div id="preview">
    <el-image :src="previewPic" alt="Preview" style="aspect-ratio:210/297">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
  </div>

  <div v-show="showupload" id="upload-view">
    <div id="cooper">
      <img v-if="cropper == null" :src='baseInfo.avatar' style="width: 100%; height:100%">
      
    </div>
    <div class="btns">
      <div id="upload">
        <div class="btn-text" > 
          选择图像
        </div>
        <input :disabled="cropper !== null" type="file" id="file" accept="image/*" @change="handleImageUpload">
      </div>
      <div @click="saveEditedImage" id="savepic">
        <div class="btn-text"> 
          保存图像
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import Cropper from 'cropperjs';
import { ElMessage } from 'element-plus'
import  MarkdownIt  from 'markdown-it'

 
export default {
  data() {
    
    const unEditedAvatar = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    
    const baseInfo = {
      name: '',
      avatar: unEditedAvatar ,
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

    const baseInfo_d = baseInfo

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
      studyDate: '在校时间',
      studySubject: '专业',
      projectCharacter: '项目角色',
      projectDate: '项目时间',
      projectName: '项目名称',
    }

    const allSchoolInfo = []
    
    const allProjectInfo = []

    const allEditor = []

    const cropperTemplate = `
    <cropper-canvas background>
  <cropper-image></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection x="60" y="60" width="200" height="200" aspectRatio="1/1" >
    <cropper-grid role="grid" bordered covered></cropper-grid>
    <cropper-crosshair theme-color="rgba(238, 238, 238, 0.5)" centered></cropper-crosshair>
    <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize"></cropper-handle>
    <cropper-handle action="nw-resize"></cropper-handle>
    <cropper-handle action="se-resize"></cropper-handle>
    <cropper-handle action="sw-resize"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
    `

    const strengthEditorRef = shallowRef()
    const skillsEditorRef = shallowRef()
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
      strengthEditorRef.value = editor
    }

    const handleCreateds = (editor) => {
      skillsEditorRef.value = editor
    }

   
    return {
      baseInfo: baseInfo,
      chineseInfo: chineseInfo,
      labelPosition: 'top',
      isCached: false,
      strengthEditorRef,
      skillsEditorRef,
      valueHtml:'',
      valueHtmls:'',
      mode: 'simple',
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleCreateds,
      allSchoolInfo,
      allEditor,
      allProjectInfo,
      showupload: false,
      unEditedAvatar,
      cropper: null,
      cropperTemplate,
      baseInfo_d,
      allProjectInfo_d:[],
      allSchoolInfo_d:[],
      timer:0,
      previewPic:'',
      uuid:'',
      preloaded: false,
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
      const schoolInfo = {
        baseInfo:{
          schoolName:"",
          schoolLevel:"",
          studyDate:"",
          studySubject:"",
        },
        mainExp:"",
        display: true
      }
      this.allSchoolInfo.push(schoolInfo)
      this.allSchoolInfo_d.push(schoolInfo)
    },
    addProject() {
      if(this.allProjectInfo.length >= 2) {
        alert("最多只能添加2条项目信息")
        return
      }
      const projectInfo = {
        baseInfo:{
          projectName:"",
          projectCharacter:"",
          projectDate:"",
        },
        projectDis:"",
        display: true
      }
      this.allProjectInfo.push(projectInfo)
      this.allProjectInfo_d.push(projectInfo)
    },
    delProject(index){
      this.allProjectlInfo.splice(index, 1)
      this.allProjectInfo_d.splice(index, 1)
    },
    delSchool(index){
      this.allSchoolInfo.splice(index, 1)
      this.allSchoolInfo_d.splice(index, 1)
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result;
        this.unEditedAvatar = base64Data;
        this.makeCropper(this.unEditedAvatar);
        console.log("图片已上传");
      };

      reader.readAsDataURL(file);
    },
    async saveEditedImage(){
      this.showupload = false;
      const selectionPic = this.cropper.getCropperSelection()
      const canvas = await selectionPic.$toCanvas()
      this.baseInfo.avatar =  canvas.toDataURL()
      this.baseInfo_d.avatar =  canvas.toDataURL()
      this.cropper = null
    },
    makeCropper(src) {
      const image = new Image();
      image.src = src;
      image.alt = '用户上传图像';

      if (this.cropper == null) {
          this.cropper = new Cropper(image, {
          container: '#cooper',
          template: this.cropperTemplate,
        });
      } else { 
        this.cropper.element=image;
      }
      console.log(this.cropper.element.src);
    },
    debounce(fn,wait){
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        fn();
        this.timer = null;
      }, wait);
    },
    async preupload() {
      const md = new MarkdownIt();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      ElMessage('开始尝试获取更新')
      const allInfo = {
        uuid: this.uuid,
        baseinfo: this.baseInfo_d,
        selfstrengh: this.valueHtml,
        perfessionalskill: this.valueHtmls,
        schoolinfo: [],
        projectinfo: []
      };

      this.allSchoolInfo_d.forEach(schoolInfo => {
        const singleinfo = {
          baseInfo:schoolInfo.baseInfo,
          mainExp:md.render(schoolInfo.mainExp)
        }
        allInfo.schoolinfo.push(singleinfo)
      })

      this.allProjectInfo_d.forEach(projectInfo => {
        const singleinfo = {
          baseInfo:projectInfo.baseInfo,
          mainExp:md.render(projectInfo.mainExp)
        }
        allInfo.projectinfo.push(singleinfo)
      })

      this.toCache(allInfo)

      const raw = JSON.stringify(allInfo);
      const requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        headers: myHeaders
      };

      await fetch("/upload", requestOptions)
        .then(response => response.text())
        .then(result => {
          if (this.uuid == '' || result == this.uuid) {
            ElMessage({
              message: '更新信息成功',
              type: 'success',
            })
            this.uuid = result;
            const key = Math.floor(Math.random() * 1000000)
            this.previewPic = "/result/" + this.uuid + '?key=' + key;
          } else {
            ElMessage({
              message: '更新信息发生未知错误',
              type: 'warning',
            })
            console.log(this.uuid)
            console.log(result)
          }
        })
        .catch(error => {
          ElMessage.error('upload 请求发生错误')
          console.log('error', error);
        })
    },
    updatepage(){
      this.isCached = false
      if(this.preloaded){
      this.debounce(this.preupload,2000)
      }
    },
    toCache(info){
      localStorage.setItem("info", JSON.stringify(info));
      this.isCached = true
    },
    getCache() {
      const storedData = JSON.parse(localStorage.getItem('info'));
    return storedData;
    },
    getPic(){
      window.open(this.previewPic)
    },
    getPdf(){
      window.open("/resultpdf/" + this.uuid)
    }
  },
  watch: {
    'baseInfo_d.avatar'() {
      this.updatepage()
    },
    valueHtml() {
      this.updatepage()
    },
    valueHtmls() {
      this.updatepage()
    }
  },
  components:{
    Editor,
    Toolbar,
  },
  beforeUnmount() {
    const editor = this.editorRef.value
    const editors = this.editorRefs.value

    if (editor == null && editors == null) return
    else {
      editor.destroy();
      editors.destroy()
    }
  },
  mounted() {
    setTimeout(() => {
      this.preloaded = true
      this.isCached = true
    }, 1000)
    const acchedinfo = this.getCache()
    if (acchedinfo) {
      this.baseInfo_d = acchedinfo.baseinfo
      this.valueHtml = acchedinfo.selfstrengh
      this.valueHtmls = acchedinfo.perfessionalskill
      this.allSchoolInfo_d = acchedinfo.schoolinfo
      this.allProjectInfo_d = acchedinfo.projectinfo
      
      ElMessage({
              message: '缓存恢复成功',
              type: 'success',
            })
      
      if(acchedinfo.uuid !== ''){
        this.uuid = acchedinfo.uuid
        this.previewPic = "/result/" + acchedinfo.uuid + ''
        console.log(this.previewPic)
      }
    }
  },
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
  font-size: 14px;
  padding: 0px 8px;
  color: rgb(128, 128, 128);
}

#projectinfo .blocks{
  flex-direction: column;
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
  height: auto;
  padding-bottom: 16px;
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

#schoolMainExp {
  flex-basis: 100%;
  height: auto;
}

.block#head-buttons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  margin-top: 16px;
}

.head-button {
  flex-basis: 20%;
  max-width: 10%;
}

#upload-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 5%;
  border: 1px solid black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

#upload-view #cooper{
  margin:36px 40px;
  height:320px;
  width:320px;
  background-color: #ccc;
}

#upload-view .btns {
  position: relative;
  bottom: 18px;
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#upload-view .btns > div {
  width: 128px;
  height: 32px;
  border: none;
  border-radius: 4px;
  border: #ccc 1px solid;
  color: rgb(0, 0, 0);
  font-size: 14px;
  cursor: pointer;
  position: relative;
}

#upload input{
  position:absolute;
  width: 100%;
  height: 100%;
  opacity: 0%;
  cursor: pointer;
}

.btn-text{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-2px);
  cursor: pointer;
}

#upload-view .btns > div:hover {
  border: rgb(198,226,255) 1px solid;
  color: rgb(64,158,255);
   background-color: rgb(236,245,255);
}

#cooper > * {
  width: 100%;
  height: 100%;
}

</style>