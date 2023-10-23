const list = document.getElementById("list")
const createBtn = document.getElementById("create-btn")

let todos = []

const createTodoElement = (item) => {
    const itemElement = document.createElement("div")
    itemElement.classList.add("item")

    const checkBoxElement = document.createElement("input")
    checkBoxElement.type = "checkbox"

    if (item.isDone) {
        itemElement.classList.add("complete")
    }

    const inputElement = document.createElement("input")
    inputElement.type = "text"
    itemElement.value = item.text
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
    })

    actionsElememt.append(editBtn)
    actionsElememt.append(removeBtn)
    itemElement.append(checkBoxElement)
    itemElement.append(inputElement)
    itemElement.append(actionsElememt)

    return { itemElement, inputElement, editBtn, removeBtn }
}

const createNewTodo = () => {
    const item = { id: new Date().getTime(), text: "", isDone: false }

    todos.unshift(item)

    const { itemElement, inputElement, editBtn, removeBtn } =
        createTodoElement(item)

    list.prepend(itemElement)
    inputElement.removeAttribute("disabled")
    inputElement.focus()
}

createBtn.addEventListener("click", createNewTodo)
