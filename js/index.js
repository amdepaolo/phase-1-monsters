// - When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
document.addEventListener('DOMContentLoaded',()=>{
    buildMonsterList();
    addMonsterForm();
    submitForm();
    const forward = document.getElementById('forward');
    const back = document.getElementById('back');
    const monsterContainer = document.getElementById('monster-container');
    back.addEventListener('click', ()=> {
        page--;
        console.log(page)
        monsterContainer.innerText =''
        buildMonsterList();
    });
    forward.addEventListener('click',()=> {
        page++;
        console.log(page);
        monsterContainer.innerText =''
        buildMonsterList();
    });
})
let page = 1;

function buildMonsterCard(object){
    const monsterContainer = document.getElementById('monster-container');
    const card = document.createElement('div');
    card.id = object.id;
    card.innerHTML = `
    <h2>${object.name}</h2>
    <h4>AGE: ${object.age}</h4>
    <p>DESCRIPTION: ${object.description}`
    monsterContainer.append(card)
}

function buildMonsterList(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(arr => arr.forEach(buildMonsterCard))
}
// - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster Button'
function addMonsterForm(){
    const createMonster = document.getElementById('create-monster');
    const form = document.createElement('form');
    const name = document.createElement('input');
    name.type = 'text'
    name.id = 'name';
    name.placeholder = 'name';
    const age = document.createElement('input');
    age.type = 'text'
    age.id = 'age';
    age.placeholder = 'age';
    const description = document.createElement('input');
    description.type = 'text'
    description.id = 'description';
    description.placeholder = 'description';
    const submit = document.createElement('input');
    submit.type='submit'
    submit.id = 'submit';
    form.append(name, age, description, submit);
    createMonster.append(form);
}
// . When you click the button, the monster should be added to the list
//   and saved in the API.
function submitForm(){
    let form = document.querySelector('form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        let formObject = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        console.log(formObject);
        fetch('http://localhost:3000/monsters',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"},
            body: JSON.stringify(formObject)
        })
        .then(form.reset())
        .catch(err => console.log(err))    
    })
}
// - At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them.