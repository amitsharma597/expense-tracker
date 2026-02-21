document.addEventListener("DOMContentLoaded", () => {
    const inputAmount = document.getElementById('input-amt');
    const inputDescription = document.getElementById('input-description');
    const expenseList = document.getElementById('expense-list');
    const addListBtn = document.getElementById('add-expense-btn');

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

    loadExpenses();
});