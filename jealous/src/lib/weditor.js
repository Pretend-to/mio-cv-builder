import { shallowRef } from 'vue'

export default class Weditor {
  constructor() {
    this.value = '6';
    this.editorRef = shallowRef();
  }
}