var app = new Vue({
    el: "#app",
    data: {
       
        arrayData: [],
        arrayFrom: [],
        arrayTo:[],
        email:"",
        password:"",
        user:"",
       
    },
    methods: {

        async listUsers() {
     

            await fetch("https://randomuser.me/api/?results=10")
                .then((response) => response.json())
                .then((data) => this.arrayData = data);
                this.arrayData = this.arrayData.results.map(e => {
                    return{
                        ...e
                    }
                });
                this.updateLocalStorage();
        },
        
       

        login(){
            if(this.email == "" || this.password == ""){ 
                alert("Ingresa los datos");

                return
            }else{

            
         this.arrayData.forEach(persona => {   // recorrer todos los objetos
            if(this.email == persona.login.username && this.password == persona.login.password){
                alert("¡Bienvenido!");
                this.user = persona;
                this.saveUser();
                window.location.href="/APIPROYECT/index.html" //direccionamiento
            }

         });
         if(this.user==""){
            alert("Los datos son incorrectos");
         }
        }
         },


        updateLocalStorage() {// actualizar
            localStorage.setItem('Users', JSON.stringify(this.arrayData));
        },
        saveUser(){
            localStorage.setItem('user', JSON.stringify(this.user));
        }

    },
    created() {
        if (localStorage.getItem('Users') !== null) {
            this.arrayData = JSON.parse(localStorage.getItem('Users'))
        } else {
            this.listData();
        }
       
    },
   
   
});