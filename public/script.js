    
    const aModal = document.querySelector(".modal")
    const bModal = new bootstrap.Modal(aModal)
    const mensagems = document.querySelector("#mensagens")
    const username = document.querySelector("#username_2454")
    const mensage = document.querySelector("#mensage")
    const chat = document.querySelector("#chat")
    const nome = document.querySelector("#name")

    var id
    var socket = io(document.URL)
    
    let previas = []

    document.addEventListener('DOMContentLoaded', () => {
        bModal.show()
    })

    socket.on("connect", () => {
      id = socket.id
    });
     
    
    nome.onsubmit= (e) =>{
        e.preventDefault()
        if (username.value.length){
        bModal.hide()
        }
    }

    
    
    
    socket.on('previas', data => {
       console.log(data) 
       previas = data
    })

    chat.onsubmit= (e) => {
        e.preventDefault()
        let mensagem = {username:username.value, mensage:mensage.value}
        if (username.value.length && mensage.value.length){
            socket.emit('message', mensagem);
            mensage.value = ''
        }
    }

    

    