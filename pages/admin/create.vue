<template>
    <el-form 
        :model="controls" 
        :rules="rules" 
        ref="form"
        @submit.native.prevent="onSubmit"
    >
        <h1 class="mb">Создать новый пост</h1>
        <el-form-item label="Введите название поста" prop="title">
            <el-input 
                v-model="controls.title" 
            />
        </el-form-item>
        <el-form-item label="Текст в формате .md или .html" prop="text">
            <el-input 
                type="textarea"
                v-model="controls.text" 
                resize="none"
                :rows="10"
            />
        </el-form-item>

        <el-button
            class="mb"
            type="success"
            playn
            @click="previewDialog = true"
        >
            Предпросмотр
        </el-button>

        <el-form-item>
            <el-button 
                type="primary"
                round
                native-type="submit"
                :loading="loading"
            >
                Создать пост
            </el-button>
        </el-form-item>
        
        <el-dialog
            title="Предпросмотр"
            :visible.sync="previewDialog"
        >
            <div :key="controls.text">
                <vue-markdown>{{controls.text}}</vue-markdown>
            </div>
        </el-dialog>

        <el-upload
            class="mb" 
            drag
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleImageChange"
            :auto-upload="false"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
            <div class="el-upload__tip" slot="tip">Файлы с расширением jpg/png/webp</div>
        </el-upload>
    </el-form>
</template> 

<script>
    export default {
        head: {
            title: `Создать пост | ${process.env.appName}`
        },
        layout: 'admin',
        middleware: ['admin-guard'],
        header() {
            return {
                title: ''
            }
        },
        data() {
            return {
                image: null,
                previewDialog: false,
                loading: false,
                controls: {
                    text: '',
                    title: ''
                },
                rules: {
                    text: [{
                            required: true,
                            message: 'Текст не должен быть пустым',
                            trigger: 'blur'
                        }
                    ],
                    title: [{
                            required: true,
                            message: 'Название поста не может быть пустым',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        }, 
        watch: {
            controls(value) {
            }
        },
        methods: {
            onSubmit() {
                // console.log('onSubmit')
                this.$refs.form.validate(async valid => {
                    if (valid && this.image) {
                        this.loading = true

                        const formData = { 
                            text: this.controls.text,
                            title: this.controls.title,
                            image: this.image
                        }

                        try {
                            await this.$store.dispatch('posts/createPost', formData)

                            // Обнуляю данные
                            this.controls.text = ''
                            this.controls.title = ''
                            this.$refs.upload.clearFiles()
                            this.image = null
                            this.$message.success('Пост добавлен')
                        } catch (error) {
                        
                        } finally {
                            this.loading = false
                        }
                        
                    } else {
                        this.$message.warning('Форма не валидна')
                    }
                }) 
            },
            handleImageChange(file, fileList) {
                this.image = file.raw
                // console.log(this.image)
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        max-width: 600px;
    }
</style>