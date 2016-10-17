namespace passport.Services {

    export class LoginService {

        constructor(
            private $http: ng.IHttpService,
            private $window: ng.IWindowService,
            private $q: ng.IQService){

        }

        login(loginInfo){
            return this.$q((resolve, reject)=>{
                this.$http.post('/api/users/login', loginInfo)
                    .then((data:any)=>{
                        console.log(data.data.token);
                        this.$window.localStorage.setItem('token', data.data.token)
                        resolve();
                    }).catch((err)=>{
                        reject(err);
                    });
            });
        }
    }

    angular.module('passport').service('loginService', LoginService);
}
