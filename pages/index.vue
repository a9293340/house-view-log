<script lang="ts" setup>
const editorData = ref('<p>Content of the editor.</p>');
const isShow = ref(false);
const imgPath = ref('');

const getEditData = () => console.log(editorData.value);

const onChange = async (event: any) => {
  const files = event.target.files;
  const formData = new FormData();
  formData.append('file', files[0]);
  imgPath.value = (
    await useFetch('/api/upload', {
      method: 'post',
      body: formData,
    })
  ).data.value?.path[0] as string;

  console.log(imgPath.value);
};

onMounted(async () => {
  isShow.value = true;
  // const response = await $fetch("/upl/users/");
  const local = await $fetch('/api/test');
  // console.log(response);
  console.log(local);
});
</script>

<template>
  <div>
    <h1>File Upload</h1>
    <form>
      <label for="file">File: </label>
      <input type="file" name="file" @change="onChange" />
    </form>
    <img :src="imgPath" alt="" />
  </div>
  <div>
    <div class="flex flex-row">
      <el-button>Default</el-button>
      <el-button type="primary" @click="getEditData">get Edit Data</el-button>
      <el-button type="success">add Count</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div class="flex flex-row">
      I'm using an Iconify Icon!
      <Icon icon="ic-baseline-search" class="w-36 h-36" />
    </div>
    <form>
      <label for="locale-select">{{ $t('language') }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="en">en</option>
        <option value="zh">zh</option>
      </select>
    </form>
    <Tinymce v-model="editorData" v-if="isShow"></Tinymce>
    <pre v-html="editorData"></pre>
  </div>
</template>

<style lang="scss"></style>
