const name = "john";

function component(text) {
    const element = document.createElement('div');
    element.innerHTML =text
    return element;
}

fetch(`https://api.agify.io/?name=${name}`)
    .then(response => response.json())
    .then(response => response)
    .then(({ age, name }) => {
        document.body.appendChild(component(`${name} is ${age} years old.`));
    })