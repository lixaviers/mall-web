<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="分类名称" prop="className"
        :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]"
      >
        <el-input v-model="dataForm.className" placeholder="分类名称" maxlength="50" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Util from '@/libs/util';
import Api from '@/libs/api';
    export default {
        data () {
            return {
                visible: false,
                dataForm: {
                    id: '',
                    parentId: '',
                    className: '',
                }
            }
        },
        methods: {
            init(id, parentId) {
                this.dataForm.id = id;
                this.dataForm.parentId = parentId;
                this.visible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();

                    if (!this.dataForm.id) {
                        // 新增
                    } else {
                        // 修改
                        Api.goodsClassGet(id).then((res) => {
                            this.dataForm = res.data;
                        });
                    }
                })
            },
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        Api.goodsClassAddOrUpdate(this.dataForm).then((res) => {
                            if (!this.dataForm.id) {
                                Util.messageSuccess('新增成功');
                            } else {
                                Util.messageSuccess('修改成功');
                            }
                            this.visible = false;
                            this.$emit('refreshDataList');
                        });
                    }
                })
            }
        }
    }
</script>