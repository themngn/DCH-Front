<template>
    <input type="number" v-model="id" @change="downloadImage" />
    <input type="file" @change="uploadImage" />
    <br>
    <div class="images">
        <img class="round" :src="image" alt="" />
        <img class="square" :src="image" alt="" />
        <img :src="image" alt="" />
    </div>
</template>
<script>
export default {
    name: 'Test',
    data() {
        return {
            username: '',
            id: 1,
            characters: [],
            token: '',
            url: '',
            picture: '',
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
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        this.image = data.data
                    })
            }

            reader.readAsDataURL(file);

        },
        downloadImage() {
            console.log('id', this.id)
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(this.url + ":1290/portraits/" + this.id, {
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

    }, mounted() {
        this.url = window.location.href.split(':8080')[0]
        console.log(this.url)
        this.downloadImage()
    }
}

</script>
<style scoped>
input {
    width: 100px;
    height: 50px;
    height: 25px;
}

.images {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

img {
    max-width: 25vw;
    height: 100%;
    border: 10px solid black;
    height: 100%;
}

.round {
    border-radius: 50%;
    width: 25vw;
    height: 25vw;
}

.square {
    width: 25vw;
    height: 25vw;
}
</style>