document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById('input-amt');
    const description = document.getElementById('input-description');
    const expenseList = document.getElementById('expense-list');
    const addListBtn = document.getElementById('add-list-btn');
    const deleteBtn = document.getElementsByClassName('delete-btn');


    const showList = () => {

    if(amount.value.trim()===""){
        return;
    }
        const li = document.createElement('li');
        li.innerHTML =
            `<span>${amount.value.trim()}</span>
           <span>${description.value.trim()}</span>
         <button class = "delete-btn" type="button">delete</button>`;

        expenseList.appendChild(li);

        amount.value = '';
        description.value = '';

        deleteBtn.addEventListener('click', ()=>{
            expenseList.removeChild(li);
        })


    };

    addListBtn.addEventListener('click', showList);

    amount.addEventListener('keypress', (e) => {
        if (e.key == "Enter") {
            showList(e);
        }
    });
    description.addEventListener('keypress', (e) => {
        if (e.key == "Enter") {
            showList(e);
        }
    });











});