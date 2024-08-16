let ident = 0
let dados = []


function salvar(){
    dados = []
    let lista = document.getElementById("lista")
    for(let c of lista.children){
        dados.push([c.id, c.children[1].innerText, c.children[0].checked])
    }
    //console.log(dados)
    localStorage.setItem("todolist", JSON.stringify(dados))
}

function recuperar(){
    if(localStorage.todolist){
        let temp = JSON.parse(localStorage.todolist)
        dados = temp
        ident = Number(dados[(dados.length - 1)][0]) + 1
        
        console.log(dados)
        for(let c = 0; c < temp.length; c++){
            let lista = document.getElementById("lista")
            let texto = temp[c][1]

            let li = document.createElement("li")
            li.setAttribute("id", temp[c][0])
            let label = document.createElement("label")
            label.innerText = texto
            //label.classList.add(temp[c][2]? "label feito": "label"
            
            let btn = document.createElement("input")
            btn.setAttribute("type", "button")
            btn.setAttribute("id", "btnEditar")
            btn.value = "e"
            btn.addEventListener("click", () => {
                editar(li.id)
            })

            let check = document.createElement("input")
            check.setAttribute("type","checkbox")
            check.addEventListener("change", (e) => {
                salvar()
                riscar(e)
            })
            if(temp[c][2] == true){
                label.classList.add("feito")
                check.checked = true
            }

            li.appendChild(check)
            li.appendChild(label)
            li.appendChild(btn)
            lista.appendChild(li)
            }
    }

}
recuperar()


function editar(e){
    document.getElementById("modal").style.display = "flex"
    console.log(e)
}


function subItem(){
    let ul =  document.getElementById("subItemList")
    let li = document.createElement("li")
    let check = document.createElement("input")
    check.setAttribute("type", "checkbox")
    let text = document.createElement("input")
    text.setAttribute("type", "text")
    text.setAttribute("placeholder", "Digite um item")

    li.appendChild(check)
    li.appendChild(text)
    ul.appendChild(li)
}

function check(e){
    console.log(e)
}

function riscar(e){
    let alvo = e.target.parentElement.children[1]
    //alvo.style.textDecoration = "line-through"
    alvo.classList.toggle("feito")
    
}

function incluir(){
    let lista = document.getElementById("lista")
    let texto = document.getElementById("iptText")

    let li = document.createElement("li")
    li.setAttribute("id", ident)
    let label = document.createElement("label")
    label.innerText = texto.value
    label.classList.add("label")
    let btn = document.createElement("input")
    btn.setAttribute("type", "button")
    btn.setAttribute("id", "btnEditar")
    btn.value = "e"
    btn.addEventListener("click", () => {
        editar(li.id)
    })

    let check = document.createElement("input")
    check.setAttribute("type","checkbox")
    check.addEventListener("change", (e) => {
        salvar()
        riscar(e)
    })

    li.appendChild(check)
    li.appendChild(label)
    li.appendChild(btn)
    lista.appendChild(li)

    texto.value = ""
    texto.focus()

    ident++
    salvar()
}

function fecharModal(){
    document.getElementById("modal").style.display = "none"
}
let fechar = document.getElementById("fechar")
fechar.addEventListener("click", fecharModal)

let iptButton = document.getElementById("iptButton")
iptButton.addEventListener("click", incluir)

let incluirSubitem = document.getElementById("Incluir Subitem")
incluirSubitem.addEventListener("click", () => {
    subItem()
})