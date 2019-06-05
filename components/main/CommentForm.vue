<template>
    <div>
        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form"
            @submit.native.prevent="onSubmit"
        >
            <h1>Добавить комментарий</h1>
            <el-form-item label="Ваше имя" prop="name">
                <el-input v-model="controls.name" />
            </el-form-item>
            <el-form-item label="Текст комментария" prop="text">
                <el-input 
                    type="text-area"
                    v-model="controls.text" 
                    resize="none"
                    :rows="2"
                />
            </el-form-item>
            
            <el-form-item>
                <el-button 
                    type="primary"
                    round
                    native-type="submit"
                    :loading="loading"
                >
                    Добавить комментарий
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            controls: {
            name: '',
            text: ''
            },
            rules: {
                name: [{
                        required: true,
                        message: 'Имя не должно быть пустым',
                        trigger: 'blur'
                    }
                ],
                text: [{
                    required: true,
                    message: 'Поле не может быть пустым',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs.form.validate( async (valid) => {
                if(valid) {
                    //  console.log('Submit')
                    this.loading = true

                    const formData = {
                        name: this.controls.name,
                        text: this.controls.text,
                        postId: this.postId
                    }

                    try {
                        const newComment = await this.$store.dispatch('comments/createComment', formData)
                        this.$message.success('Комментарий добавлен')
                        this.$emit('created', newComment)
                    } catch (error) {
                        // console.log(error)
                        this.loading = false
                    }
                    
                } else {
                    // console.log('Error submit')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
