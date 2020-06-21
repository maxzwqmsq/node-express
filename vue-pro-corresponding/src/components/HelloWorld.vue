<template>
<div>
    <Row type="flex" justify="start" class="code-row-bg">
        <Col span="2"></Col>
        <Col span="4">
             添加用户:
            <Button type="primary" @click="openModal()">Add User</Button>
        </Col>
        <Col span="4">
            定时刷新:
            <i-Switch v-model="switch1" @on-change="change" />
        </Col>
    </Row>

    <br>

    <Row type="flex" justify="start" class="code-row-bg">
        <Col span="2"></Col>
        <Col span="20">
            <Table border :content="self" :columns="columns7" :data="data6"></Table>
        </Col>
        <Col span="2"></Col>
    </Row>
    <Modal
        title="创建用户"
        v-model="modal10"
        class-name="vertical-center-modal"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">发送验证码</Button>
            </FormItem>
        </Form>
    </Modal>




</div>
</template>
<style scoped>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal .ivu-modal{
        top: 0;
    }
</style>
<script>
    import axios from 'axios'
    export default {
        name: 'HelloWorld',
        data () {
            return {
                timer: null,
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: false, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'blur' }
                    ]
                },
                modal10: false,
                switch1: false,
                self: this,
                data6: [],
                columns7: [
                    {
                        title: '用户名',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', [
                                    h('Icon', {
                                            props: {
                                                    type: 'person'
                                            }
                                    }), 
                                    h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '操作',
                        key: 'id',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    attr: {
                                        type: "primay",
                                        size: 'smail'
                                    },
                                    on: { 
                                        click: () => {
                                            console.log(params)
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    attr: {
                                        type: 'danger',
                                        size: 'smail'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
            }
        },
        methods: {
            handleSubmit(formInline) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.$Message.success('Success!');
                //     } else {
                //         this.$Message.error('Fail!');
                //     }
                // })
                var postData = {
                    username: this.formInline.username,
                }
                axios.post('http://192.168.31.133:8080/user/setPassword', postData).then((response)=>{
                    this.$Message.success(response.data.pwd);
                    setTimeout(() => {
                        this.formInline.password = response.data.pwd;
                    },3000)
                }).catch((error)=>{
                  console.log(error);
                })
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            openModal () {
                this.modal10 = true;

            },
            change (status) {
                this.$Message.info('开关状态：' + status);
                if(status){
                    this.timer = setInterval(()=> {
                                this.queryData();
                            }, 5000)
                }else{
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].username}<br>年龄：${this.data6[index].password}<br>地址：${this.data6[index].id}`
                })
            },
            remove (userId) {
                var postData = {id: userId};
                axios.post('http://192.168.31.133:8080/user/deleteUser', postData).then((response)=>{
                    this.queryData();
                    this.$Message.info(response.data.msg);
                }).catch((error)=>{
                  console.log(error);
                })
            },
            queryData () {
                axios.get('http://192.168.31.133:8080/user/queryData').then((response)=>{
                  this.data6 =  response.data.list;
                }).catch((error)=>{
                  console.log(error);
                })
            }
        },
        created(){
          this.queryData();
        },
        mounted:function(){  
            this.$nextTick(function(){  
                //装载数据
                  
            });  
        },
        watch:{
                
        }  
    }
</script>
