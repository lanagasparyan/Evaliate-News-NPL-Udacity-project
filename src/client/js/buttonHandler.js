function buttonHandler (event) {
    event.preventDefault()
    const getLocalHost = 'http://localhost:5000/get-latest';
    fetch(getLocalHost).then(function (response){
    return response.json()
    }).then (function (response){
        console.log(response)
        document.getElementById('buttonHandlerResults').innerHTML = JSON.stringify(response);
    })
};

export {buttonHandler}