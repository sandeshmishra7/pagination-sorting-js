let data = [];
let initialValue = 0;


function handler() {
    fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json();
        }).then((response) => {
            data = response.products;
            let sortedData = data;
            let tableBody = document.getElementById('tableBody');
            let str = '';
            let endValue = initialValue + 10;
            // Clear previous rows
            tableBody.innerHTML = '';

            for (let i = initialValue; i < endValue && i < data.length; i++) {
                str += `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].description}</td>
                            <td>$${data[i].price}</td>
                        </tr>`;
            }

            tableBody.innerHTML = str; // Replace the table content with new rows

            // Show or hide buttons based on data length and initial value
            if (initialValue === 0) {
                document.getElementById('btnPrev').style.display = 'none';
            } else {
                document.getElementById('btnPrev').style.display = 'inline-block';
            }

            if (endValue >= data.length && data.length > 0) {
                document.getElementById('btnNext').style.display = 'none';
            } else {
                document.getElementById('btnNext').style.display = 'inline-block';
            }
        }).catch((error) => console.log(`Error: ${error}`));
}

let btnPrev = document.getElementById('btnPrev');
let btnNext = document.getElementById('btnNext');
let ascendBtn = document.getElementById('ascend');
let descendBtn = document.getElementById('descend');

btnNext.addEventListener('click', () => {
    initialValue = Math.min(initialValue + 10, data.length - 10); // Ensure initialValue does not exceed data.length - 10
    handler();
});

btnPrev.addEventListener('click', () => {
    initialValue = Math.max(initialValue - 10, 0); // Ensure initialValue does not go below 0
    handler();
});

ascendBtn.addEventListener('click', function () {
    tableBody.innerHTML = '';
    sortedData = [...data].sort((a, b) => a.price - b.price);
    data = sortedData;
    handler();
});

descendBtn.addEventListener('click', function () {
    tableBody.innerHTML = '';
    sortedData = [...data].sort((a, b) => b.price - a.price);
    data = sortedData;
    handler();
});

handler();
