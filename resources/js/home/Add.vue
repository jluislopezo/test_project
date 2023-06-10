<template>

<v-dialog
      v-model="dialog"
      width="500"
      persistent
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Create User
        </v-card-title>

        <v-card-text>
            <v-alert
                dense
                outlined
                type="error"
                v-show="showDiv"
            >
            <strong>Error</strong>,  please check and try again.
            </v-alert>

            <v-form v-model="valid" @submit.prevent="create">
                <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="user.first_name"
                            :rules="nameRules"
                            :counter="10"
                            label="First name"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" >
                        <v-text-field
                            v-model="user.last_name"
                            :rules="nameRules"
                            :counter="10"
                            label="Last name"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="user.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" >
                        <v-text-field
                            v-model="user.password"
                            :rules="passwordRules"
                            :counter="7"
                            label="Password"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                    <div class="col-12">
                        <v-btn depressed color="success" type="submit">
                            Save
                        </v-btn>
                        <v-btn depressed @click="onClose">
                            Cancel
                        </v-btn>
                    </div>

            </v-container>
        </v-form>

        </v-card-text>

      </v-card>
    </v-dialog>


  </template>


  
  <script>
  export default {
    props:[
        "dialog", 
        "onClose"
    ],

    data() {
      return {
        showModal: true,
        user:{
                first_name:"",
                last_name:"",
                email:"",
                password:""
        },
        isActive: true,
        nombre: '',
        showDiv: false,
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 7 || 'Password must be more than 7 characters',
        ],
        
      };
    },
    methods: {
        async create(){
            await this.axios.post('/user/createUser',this.user).then(response=>{
                if(response.statusText === 'Created'){
                    this.onClose();
                    this.user.first_name= '';
                    this.user.last_name= '';
                    this.user.email= '';
                    this.user.password= '';
                    this.showDiv = false;
                }
                
            }).catch(error=>{
                this.showDiv = true;
                console.log(error)
            })
      },
      openModal() {
        this.isActive = true;
      },
      closeModal() {
        this.isActive = false;
      },
      submitForm() {
        this.closeModal();
      }
    }
  };
  </script>

