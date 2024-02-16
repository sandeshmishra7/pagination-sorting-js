let data = [];
let initialValue = 0;

function handler() {
    fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json();
        }).then((response) => {
            data = response.products;
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

btnPrev.addEventListener('click', () => {
    initialValue = Math.max(0, initialValue - 10);
    handler();
});

btnNext.addEventListener('click', () => {
    initialValue += 10;
    handler();
});

// Initial fetch and table setup
handler();
