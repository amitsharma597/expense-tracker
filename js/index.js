document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById('input-amt');
    const description = document.getElementById('input-description');
    const expenseList = document.getElementById('expense-list');
    const addListBtn = document.getElementById('add-list-btn');

    const showList = () => {
           const li = document.createElement('li');
           li.innerHTML = 
            `<span>${amount.value}</span>
           <span>${description.value}</span> `
           ;
           expenseList.appendChild(li);

           amount.value = '';
           description.value = '';


        };
    
    
    addListBtn.addEventListener('click', showList );

 



});