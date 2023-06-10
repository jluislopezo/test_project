<template>

    <v-dialog
          v-model="dialog"
          width="500"
          persistent
        >
    
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Edit User # {{ prop1 }}
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
    
                <v-form v-model="valid" @submit.prevent="update">
                    <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="user.first_name"
                                :counter="10"
                                label="First name"
                                required
                            ></v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="user.last_name"
                                :counter="10"
                                label="Last name"
                                required
                            ></v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="12" >
                            <v-text-field
                                v-model="user.email"
                                label="E-mail"
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
        name:"update-user",
        props:[
            'dialog', 
            'onClose',
            'prop1'
        ],
        data() {
          return {
            showModal: true,
            user:{
                    first_name:"",
                    last_name:"",
                    email:"",
                    password:"",
                    _method:"patch"
            },
            isActive: true,
            nombre: '',
            showDiv: false,
            valid: false,
            showDiv: false,
          };
        },
        mounted(){
        },
        methods: {
            
            async showUser(id){
                await this.axios.get(`/user/${id}`).then(response=>{
                    const { first_name, last_name, email} = response.data
                    console.log(response.data);
                    this.user.first_name = first_name;
                    this.user.last_name = last_name;
                    this.user.email = email;
                }).catch(error=>{
                    console.log(error)
                })
            },
            async update(){
                await this.axios.post(`/user/${this.prop1}`,this.user).then(response=>{               
                        this.onClose();
                        this.showDiv = false;

                }).catch(error=>{
                    console.log(error);
                    this.showDiv = true;
                })
          },
          openModal() {
            this.isActive = true;
          },
          closeModal() {
            this.isActive = false;
            this.user.first_name = first_name;
            this.user.last_name = last_name;
            this.user.email = email;
          },
          submitForm() {
            this.closeModal();
          },
          showTest() {
             this.axios.get(`/user/${this.prop1}`).then(response=>{
                    const { first_name, last_name, email} = response.data
                    console.log(response.data);
                    this.user.first_name = first_name
                    this.user.last_name = last_name
                    this.user.email = email
                }).catch(error=>{
                    console.log(error)
                })
          }
        }
      };
      </script>