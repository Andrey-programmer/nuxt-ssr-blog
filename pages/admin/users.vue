<template>
    <el-card
        shadow="always"
        :style="{width: '500px'}"
    >
        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <h2>Создать пользователя</h2>
            <el-form-item label="Логин" prop="login">
                <el-input v-model.trim="controls.login" />
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
                <el-input  
                    type="password"
                    v-model.trim="controls.password" 
                   
                />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary"
                    round
                    native-type="submit"
                    :loading="loading"
                >
                    Создать
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        head: {
            title: `Добавить пользователя | ${process.env.appName}`
        },
        layout: 'admin',
        middleware: ['admin-guard'],
        data() {
            return {
                loading: false,
                controls: {
                login: '',
                password: ''
                },
                rules: {
                    login: [{
                            required: true,
                            message: 'Введите логин',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                        required: true,
                        message: 'Введите пароль',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                        trigger: 'blur'
                    }]
                }
            }
        },  
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if(valid) {
                        this.loading = true

                        try {
                            const formData = {
                                login: this.controls.login,
                                password: this.controls.password
                            }
                            await this.$store.dispatch('auth/createUser', formData)
                            this.$message.success('Пользователь добавлен')
                            this.controls.login = ''
                            this.controls.password = ''
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
    form {
        max-width: 600px;
    }
</style>