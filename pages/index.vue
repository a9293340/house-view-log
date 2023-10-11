<script lang="ts" setup>
import TinycmeEditor from '@/components/Tinymce/index.vue';

const editorData = ref('<p>Content of the editor.</p>');
const isShow = ref(false);

const showEdit = () => (isShow.value = !isShow.value);
const getEditData = () => console.log(editorData.value);

onMounted(async () => {
  const response = await $fetch('/upl/users/');
  console.log(response);

  isShow.value = true;
});
</script>

<template>
  <div>
    <div class="flex flex-row">
      <el-button @click="showEdit">Default</el-button>
      <el-button type="primary" @click="getEditData">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div class="flex flex-row">
      I'm using an Iconify Icon! <Icon icon="ic-baseline-search" class="w-36 h-36" />
    </div>
    <form>
      <label for="locale-select">{{ $t('language') }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="en">en</option>
        <option value="zh">zh</option>
      </select>
    </form>
    <tinycme-editor v-model="editorData" v-if="isShow"></tinycme-editor>
    <pre v-html="editorData"></pre>
  </div>
</template>

<style lang="scss"></style>
