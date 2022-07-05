var app = new Vue({
    el: "#app",
    data: {
       user:"",
       tipomoneda: "",
       users:[],
       monedatipo1:"",
       monedatipo2:"",
       valor1:0,
       valor2:0,


     },

     methods:{
        async listConvert(){
            const myHeaders = new Headers();
            myHeaders.append("apikey", "Dd1YzaR1ToI7X8Tn3CJnsl1uqvr7ZEOx");
            
            var requestOptions = {
              method: 'GET',
              redirect: 'follow',
              headers: myHeaders
            };
            let money;
            await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
              .then(response => response.json())
              .then(result => money = result.symbols )
              .catch(error => console.log('error', error));
              this.tipomoneda =  money;
              console.log(this.tipomoneda);
              this.tipomoneda= Object.entries( this.tipomoneda);
            },

     async convertirMoneda ()    {
        var myHeaders = new Headers();
myHeaders.append("apikey", "Dd1YzaR1ToI7X8Tn3CJnsl1uqvr7ZEOx");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${this.monedatipo2}&from=${this.monedatipo1}&amount=${this.valor1}`, requestOptions)
  .then(response => response.json())
  .then(result => this.valor2 = result.result)
  .catch(error => console.log('error', error));

     } , 

     },
     

     created() {
        if (localStorage.getItem('Users') !== null) { /// create localstorage
            this.users = JSON.parse(localStorage.getItem('Users'))
        } 
        if (localStorage.getItem('user') !== null) {
            this.user = JSON.parse(localStorage.getItem('user'))
        }
        this.listConvert();
       
     }
     });
