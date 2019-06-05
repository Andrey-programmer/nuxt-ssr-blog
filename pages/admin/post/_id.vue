<template>
    <div class="page-wrap">
        <el-breadcrumb 
            separator-class="el-icon-arrow-right"
            class="mb"
        >
            <el-breadcrumb-item to="/admin/list">Список постов</el-breadcrumb-item>
            <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <el-form-item label="Текст в формате .md или .html" prop="text">
                <el-input 
                    type="textarea"
                    v-model.trim="controls.text" 
                    resize="none"
                    :rows="10"
                />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary"
                    round
                    native-type="submit"
                    :loading="loading"
                >
                    Обновить
                </el-button>
            </el-form-item>
        </el-form>
        <div class="mb">
            <small>
                <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ post.date | date }}</span>
            </small>
            <small style="margin-left: 2rem">
                <i class="el-icon-view"></i>
                <span >{{ post.views }}</span>
            </small>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        middleware: ['admin-guard'],
        head() {
            return {
                title: `${this.post.title} | ${process.env.appName}`
            }
        },
        validate({params}) {
            return !!params.id
        },
        async asyncData({store, params}) {
            const post = await store.dispatch('posts/getAdminPostById', params.id)
            return {post}
        },
        data() {
            return {
                loading: false,
                controls: {
                text: '',
                },
                rules: {
                    text: [{
                            required: true,
                            message: 'Текст не должен быть пустым',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.controls.text = this.post.text
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true

                        const formData = {
                            text: this.controls.text,
                            id: this.post._id
                        }

                        try {
                            await this.$store.dispatch('posts/updatePost', formData)
                            this.$message.success('Пост обновлён')
                            this.loading = false
                        } catch (error) {
                            this.loading = false
                        }
                        
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrap {
       max-width: 600px; 
    }
</style>