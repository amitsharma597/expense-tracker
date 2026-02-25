document.addEventListener("DOMContentLoaded", () => {
    const inputAmount = document.getElementById('input-amt');
    const inputDescription = document.getElementById('input-description');
    const expenseList = document.getElementById('expense-list');
    const addListBtn = document.getElementById('add-expense-btn');
    const tableHead = document.getElementById('table-head');
    const toggleBtn = document.getElementById('toggle-btn');


    const loadExpenses = () => {
        const saved = JSON.parse(localStorage.getItem("rows")) || [];
        saved.forEach(row => {
            showList(row.amount, row.description);
        });
    };

    const saveExpenses = () => {
        const arr = [];
        document.querySelectorAll('#expense-list tr').forEach(tr => {
            const tds = tr.querySelectorAll('td');
            arr.push({
                amount: tds[0].innerText,
                description: tds[1].innerText
            });
        });
        localStorage.setItem("rows", JSON.stringify(arr));
    };

    const showList = (amount, description) => {
        if (amount === "" || description === "") return;
        if (expenseList.children.length === 0) {
            tableHead.style.display = "table-header-group";
        }


        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${amount}</td>
            <td>${description}</td>
            <td><button class="delete-btn" type="button">Delete</button></td>
            
        `;

        expenseList.appendChild(row);

        inputAmount.value = '';
        inputDescription.value = '';

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
            saveExpenses();
            if (expenseList.children.length === 0) {
                tableHead.style.display = "none";
            }

        });



        saveExpenses();
    };

    addListBtn.addEventListener('click', () => {
        showList(
            inputAmount.value.trim(),
            inputDescription.value.trim()
        );
    });

    inputAmount.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            showList(
                inputAmount.value.trim(),
                inputDescription.value.trim()
            );

            inputDescription.focus();
        }
    });

    inputDescription.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            showList(
                inputAmount.value.trim(),
                inputDescription.value.trim()
            );
            inputAmount.focus();
        }
    });

    const savedTheme = localStorage.getItem('themes');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }


    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
       
        const isDark = document.body.classList.contains('dark');

        if (isDark){
            localStorage.setItem('themes', 'dark')
        }
        else{
            localStorage.removeItem('themes');
        }
    });

    loadExpenses();
});