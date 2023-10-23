const list = document.getElementById("list")
const createBtn = document.getElementById("create-btn")

let todos = []

createBtn.addEventListener("click", createNewTodo)

function createTodoElement(item) {
    const itemElement = document.createElement("div")
    itemElement.classList.add("item")

    const checkBoxElement = document.createElement("input")
    checkBoxElement.type = "checkbox"
    checkBoxElement.checked = item.isDone
    console.log(item.isDone)

    if (item.isDone) {
        itemElement.classList.add("complete")
    }

    const inputElement = document.createElement("input")
    inputElement.type = "text"
    inputElement.value = item.text
    inputElement.setAttribute("disabled", "")

    const actionsElememt = document.createElement("div")
    actionsElememt.classList.add("actions")

    const editBtn = document.createElement("button")
    editBtn.classList.add("material-icons")
    editBtn.innerText = "edit"
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("material-icons", "remove-btn")
    removeBtn.innerText = "remove_circles"

    inputElement.addEventListener("input", () => {
        item.text = inputElement.value
    })

    inputElement.addEventListener("blur", () => {
        inputElement.setAttribute("disabled", "")
        savetoLocalStorage()
    })

    checkBoxElement.addEventListener("change", () => {
        item.isDone = checkBoxElement.checked
        if (item.isDone) {
            itemElement.classList.add("complete")
        } else {
            itemElement.classList.remove("complete")
        }
    })

    editBtn.addEventListener("click", () => {
        inputElement.removeAttribute("disabled")
        inputElement.focus()
    })

    removeBtn.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== item.id)
        itemElement.remove()
        savetoLocalStorage()
    })

    actionsElememt.append(editBtn)
    actionsElememt.append(removeBtn)
    itemElement.append(checkBoxElement)
    itemElement.append(inputElement)
    itemElement.append(actionsElememt)

    return { itemElement, inputElement }
}

function createNewTodo() {
    const item = { id: new Date().getTime(), text: "", isDone: false }

    todos.unshift(item)

    const { itemElement, inputElement } = createTodoElement(item)

    list.prepend(itemElement)
    inputElement.removeAttribute("disabled")
    inputElement.focus()

    savetoLocalStorage()
}

function savetoLocalStorage() {
    const todoData = JSON.stringify(todos)
    localStorage.setItem("my-todos", todoData)
}

function loadFromLocalStorage() {
    const todoData = localStorage.getItem("my-todos")

    if (todoData) {
        todos = JSON.parse(todoData)
    }
}

function displayTodos() {
    loadFromLocalStorage()

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i]
        const { itemElement } = createTodoElement(item)
        list.append(itemElement)
    }
}

displayTodos()
