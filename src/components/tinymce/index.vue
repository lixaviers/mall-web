<template>
    <div class="tinymce__container">
        <textarea :id="tinymceId" />
        <div class="tinymce__btn__container">
            <el-upload action="/api/file/upload" :on-success="handleSuccess" :show-file-list="false">
                <el-button type="primary"><i class="el-icon-upload"></i>上传图片</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
    import '../../../public/tinymce4.7.5/langs/zh_CN'
    const plugins = [
    `advlist anchor autolink autosave code codesample colorpicker colorpicker
    contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime
    legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace
    spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount`
    ];
    const toolbar = [
    `bold italic underline strikethrough alignleft aligncenter
    alignright outdent indent  blockquote undo redo removeformat`,
    `hr bullist numlist link image charmap	 preview anchor pagebreak
    fullscreen insertdatetime media table forecolor backcolor`
    ];
export default {
    name: 'tinymce',
    props: {
        id: {
            type: String
        },
        value: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        menubar: {
            default: 'file edit insert view format table'
        },
        height: {
            type: Number,
            required: false,
            default: 360
        },
        width: {
            type: Number,
            required: false,
            default: 720
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id || 'vue-tinymce-' + +new Date()
        }
    },
    watch: {
        value(val) {
        if (!this.hasChange && this.hasInit) {
            this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        }
        }
    },
    mounted() {
        this.initTinymce()
    },
    activated() {
        this.initTinymce()
    },
    deactivated() {
        this.destroyTinymce()
    },
    methods: {
        handleSuccess(response) {
            console.log(response.data);
            window.tinymce.get(this.tinymceId).insertContent(`<img src="${response.data}" >`);
        },
        initTinymce() {
            const _this = this
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                width: this.width,
                height: this.height,
                language: 'zh_CN',
                body_class: 'panel-body ',
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: false,
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                default_link_target: '_blank',
                link_title: false,
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value)
                    }
                    _this.hasInit = true
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true
                        this.$emit('input', editor.getContent())
                    })
                }
            })
        },
        destroyTinymce() {
            if (window.tinymce.get(this.tinymceId)) {
                window.tinymce.get(this.tinymceId).destroy()
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value)
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent()
        }
    },
    destroyed() {
        this.destroyTinymce()
    }
}
</script>

<style>
    .tinymce__container {
        position: relative;
    }
    div.mce-fullscreen {
        z-index: 9999;
    }
    .tinymce__btn__container {
        position: absolute;
        left: 400px;
        top: 2px;
    }
</style>