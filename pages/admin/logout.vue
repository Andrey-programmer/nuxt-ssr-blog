<template>
    <div>
        Очистка данных
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        middleware: ['admin-guard'],
        beforeCreate() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/admin/login?message=logout')
        }
    }
</script>

<style lang="scss" scoped>

</style>