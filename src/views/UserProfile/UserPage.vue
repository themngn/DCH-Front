<template>
    <div v-if="!logedIn && requests.length != 0" class="requests">
        <h4>Ownership requests</h4>
        <ol class="request-list">
            <li class="request" v-for="request in requests">
                <div class="request-line">
                    Requested rights to:
                </div>
                <div class="request-line item-block">
                    <Portrait class="request-portrait" id="1"></Portrait>{{ request.character.name }}
                </div>
                <div class="request-line">By:</div>
                <div class="request-line item-block">
                    <Portrait class="request-portrait" :id="request.requester.portraitId">
                    </Portrait>
                    {{ request.requester.username }}
                </div>
                <div class="buttons request-line">
                    <button class="action-button" @click="acceptRequest(request.id)">Accept</button>
                    <button class="action-button" @click="declineRequest(request.id)">Decline</button>
                </div>
            </li>
        </ol>
    </div>
    <ChangeAvatar class="ChangeAvatar" v-if="!logedIn"></ChangeAvatar>
    <div v-if="logedIn" class="form">
        <label for="loginType">Login Type</label>
        <select @change="changeType" v-model="loginType">
            <option v-for="lType in loginTypes">{{ lType }}</option>
        </select>
        <br>
        <Transition class="fade">
            <div v-if="showEmail" class="input-group-prepend">
                <label :for="email">email</label>
                <input type="email" :name="email" v-model="email" required>
            </div>
        </Transition>
        <Transition class="fade">
            <div v-if="showUsername" class="input-group-prepend">
                <label :for="username">username</label>
                <input type="text" :name="username" v-model="username" required>
            </div>
        </Transition>
        <Transition class="fade">
            <div v-if="showPassword" class="input-group-prepend">
                <label :for="password">password</label>
                <input type="password" :name="password" v-model="password" required>
            </div>
        </Transition>
        <Transition class="fade">
            <div v-if="showPassword2" class="input-group-prepend">
                <label :for="password2">repeat password</label>
                <input type="password" :name="password2" v-model="password2" required>
            </div>
        </Transition>
        <Transition class="fade">
            <div v-if="showError" class="input-group-prepend">
                <label class="red">*{{ error }}</label>
            </div>
        </Transition>
        <button @click="submit">Submit</button>

    </div>
    <div v-else class="form">
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import Portrait from '../Portrait.vue'
import ChangeAvatar from './ChangeAvatar.vue'

export default {
    name: 'UserPage',
    components: {
        Portrait,
        ChangeAvatar
    },
    data() {
        return {
            logedIn: false,
            showEmail: false,
            showUsername: false,
            showPassword: false,
            showPassword2: false,
            loginType: 'login',
            loginTypes: ['login', 'register', "email"],

            email: '',
            username: '',
            password: '',
            password2: '',
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            url: '',

            showError: false,
            error: '',
            token: null,
            requests: []
        }
    },
    methods: {
        checkReqest() {
            if (!this.logedIn) {
                this.url = window.location.href.split(':8080')[0]
                this.token = localStorage.getItem('token')
                fetch(this.url + ":1290/characters/owners/requests", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => res.json())
                    .then(data => {
                        this.requests = data
                    })
            }
        },
        acceptRequest(requestId) {
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(this.url + `:1290/characters/owners/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.checkReqest()
                })
        },
        declineRequest(requestId) {
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(this.url + `:1290/characters/owners/requests/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.checkReqest()
                })
        },

        checkIflogedIn() {
            console.log(localStorage.getItem('token'))
            this.logedIn = localStorage.getItem('token') == null;
            this.checkReqest()
        },
        submit() {
            if (this.loginType === 'login') {
                this.login();
            } else if (this.loginType === 'register') {
                this.register();
            } else if (this.loginType === 'email') {
                this.FEmail();
            }
        }, changeType() {
            this.checkIflogedIn();
            if (this.loginType === 'login') {
                this.showEmail = true;
                this.showPassword = true;
                this.showUsername = false;
                this.showPassword2 = false;
            } else if (this.loginType === 'register') {
                this.showEmail = true;
                this.showPassword = true;
                this.showUsername = true;
                this.showPassword2 = true;
            } else if (this.loginType === 'email') {
                this.showEmail = true;
                this.showPassword = false;
                this.showUsername = false;
                this.showPassword2 = false;
            }
        },
        register() {
            if (this.reg.test(this.email)) {
                console.log('valid email')
            } else {
                this.error = 'invalid email'
                this.showError = true;
                return false;
            }
            if (this.password === this.password2) {
                console.log('passwords match')
            } else {
                this.error = 'passwords do not match'
                this.showError = true;
                return false;
            } if (this.username.length > 4 && this.username.length < 16) {
                console.log('username is valid')
            } else {
                this.error = 'username is invalid'
                this.showError = true;
                return false;
            }
            if (this.password.length > 3 && this.password.length < 16) {
                console.log('password is valid')
            } else {
                this.error = 'password is invalid'
                this.showError = true;
                return false;
            }
            this.showError = false;
            this.url = window.location.href.split(':8080')[0]

            fetch(this.url + ':1290/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.loginType = 'login'
                    this.changeType()
                })
        },
        login() {
            if (this.reg.test(this.email)) {
                console.log('valid email')
            } else {
                this.error = 'invalid email'
                this.showError = true;
                return false;
            }
            this.showError = false;
            this.url = window.location.href.split(':8080')[0]
            console.log(this.email, this.password)
            fetch(this.url + ':1290/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: this.email,
                    password: this.password
                })
            }).then(res => {
                if (res.status === 400) {
                    this.error = 'invalid email or password'
                    this.showError = true;
                    return;
                }
                return res.json();
            }).then(data => {
                if (!data) {
                    return;
                }
                this.showError = false;
                console.log(data)
                document.cookie = `token=${data.token}`
                document.cookie = `email=${data.username}`
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.username)
                localStorage.setItem('username', "nousername")
                this.getData()

            })
        },
        FEmail() {
            if (this.reg.test(this.email)) {
                console.log('valid email')
            } else {
                this.error = 'invalid email'
                this.showError = true;
                return false;
            }
            this.showError = false;
            this.url = window.location.href.split(':8080')[0]
            console.log(this.email)
            fetch(this.url + ':1290/login-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: this.email
                })
            })
        },
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('username')
            this.$emit('update')
            this.changeType()
        },
        getData() {
            this.token = localStorage.getItem("token")
            fetch(this.url + ':1290/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => {
                if (res.status === 400) {
                    this.error = 'invalid email or password'
                    this.showError = true;
                    return;
                }
                return res.json();
            }).then(data => {
                if (!data) {
                    return;
                }
                this.showError = false;
                console.log("Test1")
                console.log(data)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('portraitId', data.portraitId)
                this.$emit('update')
                this.$router.push('/select-character')

            })
        }
    }, mounted() {
        this.changeType()
        this.checkReqest()
    }
}
</script>

<style scoped>
.form {
    max-width: 420px;
    margin: 30px auto;
    background-color: #333;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: #eee;
    display: inline-block;
    margin: 25px 0 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: rgb(0, 236, 236) 3px solid;
    color: #555;
}

select {
    color: #222;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    width: 100%;
    padding: 10px 6px;
    margin-bottom: 0;
}

button {
    width: 100%;
    padding: 10px 6px;
    margin-top: 50px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

h1 {
    color: white;
    text-transform: capitalize;
}

.fade-enter-active {
    transition: opacity .5s
}

.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
    transition: margin 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: scale(1, 0);
    margin: 0 0 -100px 0;
}

.red {
    color: red;
}

.requests {
    width: 500px;
    height: 100%;
    background-color: #333;
    color: white;
    text-align: center;
    margin: auto;
    border-radius: 15px;
    font-size: 30px;


}

h4 {
    padding: auto;
    padding-top: 15px;
}

.request {
    list-style: none;
    padding: 10px;
    background-color: #444;
    width: 450px;
    border-radius: 15px;
    justify-content: space-between;
    align-content: space-between;
    margin: 10px 0;
}

.request-list {
    padding: 15px;
    width: 100%;
    display: flex;
    border-radius: 15px;
    flex-wrap: wrap;
}

.buttons {
    display: flex;
    justify-content: space-around;

}

.action-button {
    background-color: #333;
    border: none;
    color: white;
    margin: 5px;

}

.request-portrait {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto 5px;
}

.request-line {
    height: 60px;
    display: flex;
    align-items: center;
}

.item-block {
    background: #555;
    border-radius: 15px;
}

@media only screen and (max-width: 525px) {

    .ChangeAvatar {
        width: 90vw;
        height: 65vw;
    }

    .requests {
        width: 90vw;
        padding-bottom: 15px;
        margin-bottom: 15px;
    }

    .request-list {
        width: 90vw;
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
    }

    .request {
        width: 75vw;
        margin: 0;
    }

    .request-line {
        width: 75vw;
        margin: 0;

    }

    .item-block {
        width: 75vw;
        margin: 0;
    }
}
</style>

