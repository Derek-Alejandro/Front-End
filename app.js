$(document).ready(function() {
    $('#country-btn').click(function() {
        fetchData('country');
    });

    $('#city-btn').click(function() {
        fetchData('city');
    });

    $('#countrylanguage-btn').click(function() {
        fetchData('countrylanguage');
    });

    $('#search-btn').click(function() {
        const table = $('#table-select').val();
        const field = $('#field-input').val().trim(); // Elimina espacios extra
        const value = $('#value-input').val().trim(); // Elimina espacios extra
        
        if (field && value) {
            fetchData(table, field, value); // Ejecuta la búsqueda solo si ambos están llenos
        } else {
            alert("Por favor, ingrese un campo y un valor de búsqueda.");
        }
    });

    function fetchData(table, field = '', value = '') {
        let url = `//34.235.121.120/php-intro-connection/getRecords.php?table=${table}`;
        if (field && value) {
            url += `&field=${field}&value=${value}`;
        }

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    updateTable(data);
                    $('#table-title').text(`Resultados de la Tabla: ${capitalizeFirstLetter(table)}`);
                } else {
                    alert("No se encontraron resultados.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener los datos: ", xhr.responseText);
                alert("Error al obtener los datos.");
            }
        });
    }

    function updateTable(data) {
        const header = Object.keys(data[0]);
        $('#table-header').empty();
        header.forEach(col => {
            $('#table-header').append(`<th>${col}</th>`);
        });
        $('#table-body').empty();
        data.forEach(row => {
            const rowData = Object.values(row);
            const rowHtml = `<tr>${rowData.map(item => `<td>${item}</td>`).join('')}</tr>`;
            $('#table-body').append(rowHtml);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});












