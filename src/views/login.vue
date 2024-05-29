<template>
    <div class="login bg-[#778DA9] w-[100vw] h-full flex justify-center">
        <div class="w-[600px] h-[600px] bg-white rounded-lg place-self-center" v-if="!isReg">
            <form class="flex flex-col m-10 my-[25%]">
                <div class="flex flex-row px-2 w-[90%] place-self-center">
                    <label for="name" class="pl-5 place-self-center w-[120px]">Name:</label>
                    <input type="text" id="name" placeholder="name" v-model="user.name" class="input_primary w-[80%] ml-0">
                </div>
                <div class="flex flex-row px-2 w-[90%] place-self-center ">
                    <label for="pass" class="pl-5 place-self-center w-[120px]">Password:</label>
                    <input type="password" id="pass" placeholder="password" v-model="user.pass" class="input_primary w-[80%] ml-0">
                </div>

                <div class="flex flex-col mt-10">
                    <div class="btn flex flex-row place-self-center">
                    <button class="btn_primary " @click.prevent="loginFunc(user)" >Login</button>
                    <button class="btn_primary" @click.prevent="isReg= !isReg">Register</button>
                </div>
                <button class="link_primary">Forgot password</button>
                </div>
                
            </form>
        </div>

        <div class="register w-[600px] h-[600px] bg-white rounded-lg place-self-center" v-else>
            <form class="flex flex-col m-10 my-[25%]">
                <div class="flex flex-row px-2 w-[90%] place-self-center">
                    <label for="name" class="pl-5 place-self-center w-[120px]">Name:</label>
                    <input type="text" id="name" placeholder="name" v-model="reg.name" class="input_primary w-[80%] ml-0">
                </div>
                <div class="flex flex-row px-2 w-[90%] place-self-center">
                    <label for="e-mail" class="pl-5 place-self-center w-[120px]">E-mail:</label>
                    <input type="text" id="e-mail" placeholder="e-mail" v-model="reg.email" class="input_primary w-[80%] ml-0" :class="{'invalid': emailNoMatch}">
                </div>
                <div class="flex flex-row px-2 w-[90%] place-self-center">
                    <label for="password" class="pl-5 place-self-center w-[120px]">Password:</label>
                    <input type="password" id="password" placeholder="min 3 digit" min="3" v-model="reg.pass" class="input_primary w-[80%] ml-0" :class="{'invalid': passNoMatch}">
                </div>
                <div class="flex flex-row px-2 w-[90%] place-self-center">
                    <label for="passwordVal" class="pl-5 place-self-center w-[120px]">Password confirm:</label>
                    <input type="password" id="passwordVal" placeholder="password validation" v-model="reg.passVal" class="input_primary w-[80%] ml-0" :class="{'invalid': passNoMatch}">
                </div>
            </form>
                <div class="flex flex-col">
                    <div class="btn flex flex-row place-self-center">
                    <button class="btn_primary " @click.prevent="regFunc(reg)">Cadastro</button>
                    <button class="btn_primary" @click.prevent="isReg = !isReg">Voltar</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import router from '@/router';
import axios from 'axios'
const db = 'http://localhost:3000/users'
export default {
    data() {
        return {
            user: {
                name: '',
                pass: ''
            },
            isReg: false,
            reg: {
                name: '',
                pass: '',
                passVal: '',
                email: '',
            },
            passNoMatch: false,
            emailNoMatch: false,
            userData: []
        }
    },
    
    methods: {
        validate(data) {
            let dated = []
            const {name, pass} = this.user
            data.forEach((element) => {
                if (element.name == name && element.password == pass){
                    dated = element
                }
                else {
                    console.log('Usuario e/ou senha incorretos')
                }
            })
            return dated
        },
        verifyData(data, name, email) {
            data.forEach((user) => {
                if (user.name == name || user.email == email) return 
            })
            return data
        },
        regData(data) {
            //set data in object
            const {name, pass, email} = this.reg
            const dataObj = {
                'name': name,
                'email': email,
                'password': pass,
                'id': data.length,
            }//post the register data
            axios.post(db, dataObj)
            .then(res => console.log(res))
            .catch(error => console.log(error))
        },
        loginFunc({name, pass}) {
            this.userData = []
            if (name && pass == '') return
            axios.get(db)
                .then(({data}) => {
                    this.userData = this.validate(data)
                })
                .then(()=> {
                    console.log(this.userData)
                    router.push(`/user/:${this.userData.id}`)
                    .catch((error) => console.log(error))
                })
        },
        regFunc({name, email, pass, passVal}) {
            //Verifica elementos
            if (name == ''|| email == '' || pass == '' || passVal == '') return
            if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email)) return this.emailNoMatch = true
            if (pass != passVal) return this.passNoMatch = true
            //Set errorLabel off
            this.emailNoMatch = this.passNoMatch = false
            //getData from db verify if has same name or email
            axios.get(db)
            .then(({data}) => {
                return this.verifyData(data, name, email)
            }) 
            .then(data => {
                this.regData(data)
            })
            .catch(error => console.log(error))
        }
    }
}
</script>