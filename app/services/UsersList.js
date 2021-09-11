function UsersList(){
    //Lấy DSUser
    this.layDS = function(){
        return axios({
            method: 'get',
            url: 'https://613093938066ca0017fda95b.mockapi.io/users',
        });
    }
    this.them = function(user){
        return axios({
            method: 'post',
            url: 'https://613093938066ca0017fda95b.mockapi.io/users',
            data: user
        });
    }
    this.layUser = function(id){
        return axios({
            method: 'get',
            url: `https://613093938066ca0017fda95b.mockapi.io/users/${id}`,
        });
    }
    this.capNhatUser = function(user,id){
        return axios({
            method: 'put',
            url: `https://613093938066ca0017fda95b.mockapi.io/users/${id}`,
            data:user
        });
    }
    this.xoaUser = function(id){
        return axios({
            method: 'delete',
            url:  `https://613093938066ca0017fda95b.mockapi.io/users/${id}`,
        });
    }











}