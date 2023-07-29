<template>
    <img id="image" :src="image" alt="">
</template>
<script>
export default {




    name: 'Portrait',
    props: {
        id: Number
    },
    data() {
        return {
            url: window.location.href.split(':8080')[0],
            token: localStorage.getItem('token'),
            image: '',
        }
    },
    methods: {
        downloadImage(id) {
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(this.url + ":1290/portraits/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => res.json())
                .then(data => {
                    this.image = data.data
                })
        }
    },
    beforeMount() {
        this.token = localStorage.getItem('token')
        if (this.token) {
            this.downloadImage(this.id)
        }
    },
    watch: {
        id: function (newId) {
            this.token = localStorage.getItem('token')
            if (this.token) {
                this.downloadImage(newId)
            }
        }
    }


}
</script>
<style scoped>
image {

    width: 100%;
    height: 100%;
}
</style>
