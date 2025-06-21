    import io from 'socket.io-client'
    
    //loader custom css 
    export const overrideStyle = {
        display : 'flex',
        margin : '0 auto',
        height : '24px',
        justifyContent : 'center',
        alignItems : 'center'
    }

    export const socket = io('http://localhost:5000/')