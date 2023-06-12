<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <div>
                <v-btn depressed color="success" @click="openModal">Create User </v-btn>
                <modal-form-create :dialog="showModalCreate" :onClose="closeCreateModal"></modal-form-create>
                <modal-form-edit :dialog="showModalEdit" :onClose="closeEditModal" :prop1="valor1" ref="child"></modal-form-edit>
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
                                <th>Created At</th>
                            </tr>
                        </thead>
                            <tbody v-if="users.length > 0">
                                <tr v-for="(user,key) in users" :key="key">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.first_name }}</td>
                                    <td>{{ user.last_name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.created_at }}</td>
                                    <td>
                                        <v-btn depressed color="info" @click="openModalEdit(user.id)">Edit</v-btn>
                                        <v-btn depressed color="error" @click="deleteUser(user.id)">Delete</v-btn>
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
                                    v-model="thisPage"
                                    class="my-4"
                                    :length=totalPages
                                    @input="updatePage"
                                    ></v-pagination>

                                    <v-chip
                                    color="blue"
                                    outlined
                                    pill
                                    >Total {{ totalUsers }} users</v-chip>
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
            page: this.thisPage,
            pages: this.totalPages,
            valor1: this.valor1,
            totalUsers:0,
            totalPages:0,
            thisPage:0
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

            this.thisPage = Number(this.$route.query.page);

            try {
               const response = await this.axios.get('/users' + '?page=' + this.$route.query.page);
               this.totalUsers = response.data.totalUsers;
               this.users = response.data.users.data;

               this.totalPages = Math.ceil(response.data.totalUsers / 10) ;

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
            this.getUsers();
        },
		updatePage: function(pageIndex) {
            this.$router.push({name:"home", query:{page:pageIndex}});
		},
        openModalEdit(id) {
            this.valor1 = id;
            this.showModalEdit = true;
            this.$refs.child.showUser(id);
        },
        closeEditModal(){
            this.showModalEdit = false;
            this.getUsers();
        },


    }
    

}
</script>