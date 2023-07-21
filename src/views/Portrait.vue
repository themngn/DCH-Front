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
        uploadImage() {
            const file = document.querySelector('input[type=file]').files[0]
            const reader = new FileReader()
            this.token = localStorage.getItem('token')

            reader.onloadend = () => {
                this.picture = reader.result
                console.log(this.picture)
                this.url = window.location.href.split(':8080')[0]
                this.token = localStorage.getItem('token')
                fetch(this.url + ":1290/portraits", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                    body: JSON.stringify({
                        data: this.picture
                    })
                })
            }

            reader.readAsDataURL(file);

        },
        downloadImage(id) {
            console.log('id', id)
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
                    console.log(data)
                    this.image = data.data
                })
        }
    },
    mounted() {
        this.downloadImage(this.id)
    }


}
</script>
<style scoped>
image {
    width: 100%;
    height: 100%;
}
</style>
