const weatherForm = document.querySelector('form');
const place = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = "Loading...";
    msg2.textContent = "";

    fetch('/weather?address=' + place.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error;
            msg2.textContent = "";
            // console.log(data.error);
        } else {
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
            // console.log(data);
        }
    })
})

})