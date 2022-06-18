//Collecting form data
var form = document.getElementById('form')

// adds click event
form.addEventListener('submit', async function(event){
    event.preventDefault()
    const formData = new FormData(this);
    const entries = formData.entries();
    // turns data into object
    const data = Object.fromEntries(entries);
    // fetching post
    const res = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // console logs to server
    const json = await res.json();
    console.log(json);
});


