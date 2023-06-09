<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <!-- <router-link :to='{name:"userAdd"}' class="btn btn-primary">Create</router-link> -->
            <div>
                <v-btn depressed color="success" @click="openModal">Create User </v-btn>
                <modal-form-create :dialog="showModalCreate" :onClose="closeCreateModal"></modal-form-create>
                <modal-form-edit :dialog="showModalEdit" :onClose="closeEditModal" :prop1="valor1"></modal-form-edit>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Users</h4>
                </div>
                <div class="card-body">

                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                            <tbody v-if="users.length > 0">
                                <tr v-for="(user,key) in users" :key="key">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.first_name }}</td>
                                    <td>{{ user.last_name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <v-btn depressed color="info" @click="openModalEdit(user.id)">Edit</v-btn>
                                        <!-- <modal-form-edit :dialog="showModalEdit" :onClose="closeEditModal"></modal-form-edit> -->
                                        <!-- <v-btn depressed color="info" @click="openModal" :to='{name:"userEdit",params:{id:user.id}}'>Edit </v-btn> -->
                                        <v-btn depressed color="error" @click="deleteUser(user.id)">Delete</v-btn>

                                        <!-- <router-link :to='{name:"userEdit",params:{id:user.id}}' class="btn btn-success">Edit</router-link> -->
                                        <!-- <button type="button" @click="deleteUser(user.id)" class="btn btn-danger">Delete</button> -->
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">No Users Found.</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <div class="text-center">
                        <v-container>
                        <v-row justify="center">
                            <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination
                                v-model="page"
                                class="my-4"
                                :length="pages" 
                                @input="updatePage"
                                ></v-pagination>
                            </v-container>
                            </v-col>
                        </v-row>
                        </v-container>
                    </div>

                </div>
            </div>
        </div>
    </div>

    
</template>

<script>

import ModalFormCreate from './Add.vue';
import ModalFormEdit from './Edit.vue';

export default {
    name:"users",
    components: {
        ModalFormCreate,
        ModalFormEdit
    },
    data(){
        return {
            users:[],
            showModalCreate: false,
            showModalEdit: false,
            page: 1,
            pages: 8,
            valor1: this.valor1
        }
    },
    mounted(){
        this.getUsers()
    },
    watch:{
        "$route"(newValue, oldValue){
            console.log(newValue);
            this.getUsers();
        }
    },
    methods:{
        async getUsers(){

            try {
               const response = await this.axios.get('/users' + '?page=' + this.$route.query.page);
               this.users = response.data.data;
                console.log(this.users);

            } catch (error) {
                console.log(error)
                this.users = []
            }
        },
        deleteUser(id){
            if(confirm("Are you sure to delete this user ?")){
                this.axios.delete(`/user/deleteUser/${id}`).then(response=>{
                    this.getUsers()
                }).catch(error=>{
                    console.log(error)
                })
            }
        },
        openModal() {
            this.showModalCreate = true;
            
        },
        closeCreateModal(){
            this.showModalCreate = false;
        },
		updatePage: function(pageIndex) {
            this.$router.push({name:"home", query:{page:pageIndex}});
		},
        openModalEdit(id) {
            console.log(id);
            // this.userId = id;
            this.valor1 = id;
            this.showModalEdit = true;
        },
        closeEditModal(){
            this.showModalEdit = false;
        },


    }
    

}
</script>