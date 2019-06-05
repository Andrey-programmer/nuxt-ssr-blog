<template>
    
    <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column
        prop="title"
        label="Название"
    />
    <el-table-column
        label="Дата"
        >
        <template slot-scope="{row: {date}}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ date | date('date') }}</span>
        </template>
    </el-table-column>
    <el-table-column
        prop="views"
        label="Просмотры"
        >
        <template slot-scope="{row: {views}}">
            <i class="el-icon-view"></i>
            <span style="margin-left: 10px">{{ views }}</span>
        </template>
    </el-table-column>
    <el-table-column
        prop="comments"
        label="Комментарии"
        >
        <template slot-scope="{row: {comments}}">
            <i class="el-icon-s-comment"></i>
            <span style="margin-left: 10px">{{ comments.length }}</span>
        </template>
    </el-table-column>
    <el-table-column
        label="Действия"
    >
        <template slot-scope="{row}">
            <el-tooltip effect="dark" content="Редактировать пост" placement="top">
                <el-button
                    icon="el-icon-edit"
                    type="primary"
                    circle
                    @click="openPost(row._id)"
                />
            </el-tooltip>
            <el-tooltip effect="dark" content="Удалить пост" placement="top">
                <el-button
                    icon="el-icon-delete"
                    type="danger"
                    circle
                    @click="removePost(row._id)"
                />
            </el-tooltip>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        head: {
            title: `Список постов | ${process.env.appName}`
        },
        layout: 'admin',
        middleware: ['admin-guard'],
        async asyncData({store}) {
            const posts = await store.dispatch('posts/getAdminPosts')
            return {posts}
        },
        methods: {
            openPost(id) {
             this.$router.push(`/admin/post/${id}`)
            },
            async removePost(id) {
                try {
                    await this.$confirm('Удалить пост?','Внимание!', {
                        confirmButtonText: 'Да',
                        cancelButtonText: 'Отмена',
                        type: 'warning'
                    })  

                    await this.$store.dispatch('posts/removePost', id)
                    this.posts = this.posts.filter((post) => {
                        return post._id !== id
                    })
                    this.$message.success('Пост удалён')

                } catch (error) {
                    
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>