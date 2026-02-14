document.addEventListener("DOMContentLoaded", () => {
    const inputAmount = document.getElementById('input-amt');
    const inputDescription = document.getElementById('input-description');
    const expenseList = document.getElementById('expense-list');
    const addListBtn = document.getElementById('add-list-btn');

    const loadExpenses = () => {
        const saved = JSON.parse(localStorage.getItem("expenses")) || [];
        saved.forEach(expense => {
            showList(expense.amount, expense.description);
        });
    };

    const saveExpenses = () => {
        const arr = [];
        document.querySelectorAll('#expense-list li').forEach(li => {
            const spans = li.querySelectorAll('span');
            arr.push({
                amount: spans[0].innerText,
                description: spans[1].innerText
            });
        });
        localStorage.setItem("expenses", JSON.stringify(arr));
    };

    const showList = (amount, description) => {
        if (amount === "") return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${amount}</span>
            <span>${description}</span>
            <button class="delete-btn" type="button">delete</button>
        `;

        expenseList.appendChild(li);

        inputAmount.value = '';
        inputDescription.value = '';

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
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
        }
    });

    inputDescription.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            showList(
                inputAmount.value.trim(),
                inputDescription.value.trim()
            );
        }
    });

    loadExpenses();
});
