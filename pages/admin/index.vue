<template>
    <div>
        <h1>Wellcome to admin-page</h1>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        middleware: ['admin-guard']
    }
</script>

<style lang="scss" scoped>

</style>