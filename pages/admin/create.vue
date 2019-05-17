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
                v-model.trim="controls.title" 
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
    </el-form>
</template> 

<script>
    export default {
        layout: 'admin',
        middleware: ['admin-guard'],
        header() {
            return {
                title: ''
            }
        },
        data() {
            return {
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
                console.log(value)
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true

                        const formData = { 
                            text: this.controls.text,
                            title: this.controls.title
                        }

                        try {
                            await this.$store.dispatch('posts/createPost', FormData)
                            this.controls.text = ''
                            this.controls.title = ''
                            this.$message.success('Пост добавлен')
                        } catch (error) {
                        
                        } finally {
                            this.loading = false
                        }
                        
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        max-width: 600px;
    }
</style>