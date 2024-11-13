async function getTodos() {
    const response = await fetch("http://localhost:3000/api")
    const data = await response.json()
    console.log(data, "")


    
    const ul = document.querySelector("ul")


}

getTodos()