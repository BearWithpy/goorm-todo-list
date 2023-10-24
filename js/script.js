const todoList = document.getElementById("list")
const createBtn = document.getElementById("create-btn")

let todoListArray = []

createBtn.addEventListener("click", createNewTodo)
displayTodos()

function createTodoElement(item) {
    const itemElement = document.createElement("div")
    itemElement.classList.add("item")

    const checkBoxElement = document.createElement("input")
    checkBoxElement.type = "checkbox"
    checkBoxElement.checked = item.isDone

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
        saveToLocalStorage()
    })

    inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            inputElement.blur()
            saveToLocalStorage()
        }
    })

    checkBoxElement.addEventListener("change", () => {
        item.isDone = checkBoxElement.checked
        if (item.isDone) {
            itemElement.classList.add("complete")
        } else {
            itemElement.classList.remove("complete")
        }
        saveToLocalStorage()
    })

    editBtn.addEventListener("click", () => {
        inputElement.removeAttribute("disabled")
        inputElement.focus()
    })

    removeBtn.addEventListener("click", () => {
        todoListArray = todoListArray.filter((t) => t.id !== item.id)
        itemElement.remove()
        saveToLocalStorage()
    })

    actionsElememt.append(editBtn)
    actionsElememt.append(removeBtn)
    itemElement.append(checkBoxElement)
    itemElement.append(inputElement)
    itemElement.append(actionsElememt)

    return { itemElement, inputElement }
}

function createNewTodo() {
    const todoItem = { id: new Date().getTime(), text: "", isDone: false }

    todoListArray.unshift(todoItem)

    const { itemElement, inputElement } = createTodoElement(todoItem)

    todoList.prepend(itemElement)
    inputElement.removeAttribute("disabled")
    inputElement.focus()

    saveToLocalStorage()
}

function saveToLocalStorage() {
    const todoData = JSON.stringify(todoListArray)
    localStorage.setItem("my-todos", todoData)
}

function loadFromLocalStorage() {
    const todoData = localStorage.getItem("my-todos")

    if (todoData) {
        todoListArray = JSON.parse(todoData)
    }
}

function displayTodos() {
    loadFromLocalStorage()

    for (let i = 0; i < todoListArray.length; i++) {
        const item = todoListArray[i]
        const { itemElement } = createTodoElement(item)
        todoList.append(itemElement)
    }
}
