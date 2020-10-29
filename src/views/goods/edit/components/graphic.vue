<template>
    <el-card shadow="always" class="mt20">
        <div slot="header" class="clearfix">
            <span>图文描述</span>
        </div>
        <el-row class="card__container">
            <el-form-item label="商品图片" prop="fileList">
                <el-upload action="/api/file/upload" list-type="picture-card" :on-success="fileSuccess" :on-remove="fileRemove" :file-list="value.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情" prop="description">
                <tinymce :width="800" :height="300" v-model="value.description"></tinymce>
            </el-form-item>
        </el-row>
    </el-card>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api.js';
import Tinymce from '@/components/tinymce';
export default {
    components: {Tinymce},
    props: {
        value: Object
    },
    data () {
        return {
        }
    },
    created() {
    },
    methods: {
        // 图片移除
        fileRemove(file, fileList) {
            let pictureUrls = '';
            for(var i=0; i<fileList.length; i++) {
                pictureUrls += fileList[i].url;
                if(i != fileList.length -1) {
                    pictureUrls += ',';
                }
            }
            this.value.pictureUrls = pictureUrls;
        },
        // 图片上传成功
        fileSuccess(response, file, fileList) {
            console.log('response', response);
            if(response.code === 200) {
                this.value.fileList.push(file);
                if(this.value.pictureUrls) {
                    this.value.pictureUrls += ',' + response.data;
                } else {
                    this.value.pictureUrls = response.data;
                }
            } else {
                Util.messageError(response.message);
            }
        },
    }
}
</script>

<style lang="less">
</style>