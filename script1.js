const form = document.querySelector('form');
const inputEl = document.querySelector('#input');
const outputEl = document.querySelector('#list-container');
const deleteBtn = document.querySelector('#delete');

const getAllWorks = () => {
    let todo;
    if(localStorage.getItem('todo') === null)
    {
        todo = [];
    }
    else
    {
        todo = JSON.parse(localStorage.getItem('todo'));
    }
    console.log(todo);

    let output;
    const allWorks = todo.map(workObject => {
        return `
        <li id="item">
        <span>${workObject.title}</span>
        <button onclick="removeWork(${workObject.id})" id="delete">X</button>
        </li>
      `;
    });
    output = allWorks.join("");
    console.log(output);

    outputEl.innerHTML = output;

    inputEl.value = '';
}
getAllWorks();

const addTask = e => {
    e.preventDefault();
    // console.log(e);

    if(inputEl.value === null)
    {
        alert("Please enter a task");
    }

    const work = inputEl.value;
    if(work)
    {
        let todo;
        if(localStorage.getItem('todo') === null)
        {
            todo=[];
            console.log(todo);
        }
        else{
            todo = JSON.parse(localStorage.getItem('todo'));
            console.log(todo);
        }

        todo.unshift({
            id: Date.now(),
            title: work,
        });

        localStorage.setItem('todo', JSON.stringify(todo));
    }
    getAllWorks();
}

const removeWork = (id) => {
    let todo;
    if(localStorage.getItem('todo') === null)
    {
        todo = [];
    }
    else
    {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    const filteredTodo = todo.filter(workObject => {
        return workObject.id !== id;
    });

    localStorage.setItem('todo', JSON.stringify(filteredTodo));
    getAllWorks();
}

form.addEventListener('submit', addTask);

