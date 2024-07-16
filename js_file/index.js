const url = "http://localhost:8081/todo/save";
const apiurl = "http://localhost:8081/todo/get";
const deleteUrl= "http://localhost:8081/todo/delete/"; 
//adding event listener to button

document.getElementById('add_button').addEventListener('click', (event) => {
    saveTodo();
    document.getElementById('todo_text').value = "";
});

async function saveTodo() {
    try {
        let textarea = document.querySelector('#todo_text').value;
        let date = document.querySelector('#date').value;
        if(date===""||textarea===""){
            errorMessage("Both date and text field are requird.")
        }else {
            let requestBody = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    todo: textarea,
                    date: date
                })
            }
            let response = await fetch(url, requestBody);
            if (response.status === 200) {
                successMessage();
            } else if(response.status===400){
             errorMessage("Failed to save."); 
            } 
        }
        setTimeout(()=>{
            location.reload();
        },400)
        
    } catch (error) {

    }
}
function errorMessage(message){
    let div = document.getElementById('message');
    div.innerHTML = message;
    div.style.color = "red";
    setTimeout(function () {
        let div = document.getElementById('message');
        let text = "";
        div.innerHTML = text;
    }, 4000) 
}
function successMessage(){
    let div = document.getElementById('message');
    let text = "Save sucessfully.";
    div.innerHTML = text;
    div.style.color = "green";
    setTimeout(function () {
        let div = document.getElementById('message');
        let text = "";
        div.innerHTML = text;
    }, 3000)
}

//here code for retreive data.
 
async function fetchData() {
    try {
        const response = await fetch(apiurl,{
            method:'GET'
        });
        const data = await response.json();
      
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

//add table row 
function createTableRow(data){
    const table=document.querySelector('#data_list');
    data.data.forEach(element => {
        const tr=document.createElement('tr');
        const tdId=document.createElement('td');
        const tdDate=document.createElement('td');
        const tdDescrption=document.createElement('td');
        const tdDelete=document.createElement('td');

        tdId.innerHTML=element.id;
        tdDate.innerHTML=element.date;
        tdDescrption.innerHTML=element.todo;
        tdDelete.innerHTML='<i class="fa-solid fa-trash"></i>';
        tdDelete.style.color="red";
        tdDelete.id="delete";
        tdDelete.style.cursor="pointer";
        tdDelete.dataset.id = element.id;
        tdDelete.onclick=async ()=>{
           await deleteByID(element);

        }
        tr.appendChild(tdId);
        tr.appendChild(tdDate);
        tr.appendChild(tdDescrption);
        tr.appendChild(tdDelete);
        table.appendChild(tr);
    });
}



async function deleteByID(obj){
   await fetch(deleteUrl+obj.id,{
        method:'DELETE'
    })
    location.reload();
}

async function populateFunction(){
    const data= await fetchData();
        createTableRow(data);
    
}
populateFunction()

