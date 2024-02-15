let data = [];

function handler() {
    fetch('https://dummyjson.com/products')
        .then((response) => {
            return response.json();
        }).then((response) => {
            data = response.products;
            console.log(data);
            let tableBody = document.getElementById('tableBody');
            let str = '';
            for (let i = 0; i < 10; i++) {
                str += `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].description}</td>
                        </tr>`;
            }

            tableBody.innerHTML += str;
        }).catch((error) => console.log(`E: ${error}`));
}

handler();

let btn = document.querySelector('button');

let initialValue = 10;

btn.addEventListener('click', function () {

    console.log('yes')

    let endValue = initialValue + 10;

    let str = '';

    for (let i = initialValue; i < endValue && i < data.length; i++) {
        str += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].description}</td>
                </tr>`;
    }

    tableBody.innerHTML += str;

    initialValue += 10;

    if (endValue >= data.length) {
        btn.style.display = 'none';
    }
})