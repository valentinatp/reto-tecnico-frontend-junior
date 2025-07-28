//Transformar archivo XLSX
document.getElementById('fileInput').addEventListener('change', (e) => {
    //Selecciono el archivo XLSX
    const dataDocXlsx = e.target.files[0];
    //Instancio el nuevo lector del documento
    const readerFile = new FileReader();

    //Configuro la lectura del archivo con enfoque a su primera hoja de trabajo (worksheet)
    readerFile.onload = (eventRead) => {
        //Capturo los datos del elemento en formato binarios
        const contentFile = eventRead.target.result;
        //Lee los datos del libro
        const workbook = XLSX.read(contentFile, { type: 'binary' });
        //Obtengo el nombre de la primera hoja del archivo
        const nameWorksheet = workbook.SheetNames[0];
        //Accedo a la hoja
        const worksheet = workbook.Sheets[nameWorksheet]
        //Convierto el documento en Json
        const dataResponse = XLSX.utils.sheet_to_json(worksheet, { defval: 'N/A' });
        //Envio los datos por parametro a la funcion para crear la tabla
        //showDataTable(data);
        const jsonData = Array.from(dataResponse);
        //showAllDataTable(jsonData);
        data = jsonData
        showDataTable();
    }
    readerFile.readAsBinaryString(dataDocXlsx);
})
//Muestro tabla con los datos del XLSX
function showAllDataTable(data) {
    //Llamo al elemento del contenedor de la tabla
    const elContentTable = document.getElementById('containerTableData');
    elContentTable.innerHTML = '';
    //Valido si los datos existen
    if (data.length === 0) {
        elContentTable.textContent = 'No existenten datos';
        return;
    }
    //Creo la tabla
    const createTableHtml = document.createElement('table');
    createTableHtml.setAttribute('class', 'table table__container')
    //Creo los encabezados de la tabla
    const headersTable = Object.keys(data[0]);
    const rowHeadersTable = createTableHtml.insertRow();
    headersTable.forEach((headerElement) => {
        const cellTable = rowHeadersTable.insertCell();
        cellTable.textContent = headerElement;
        cellTable.style.fontWeight = 'bold';
        cellTable.setAttribute('class', 'table__header');
    })
    //Creo las filas de la tabla
    data.forEach((rowTable) => {
        const rowTableBody = createTableHtml.insertRow();
        headersTable.forEach((keys) => {
            const cellTable = rowTableBody.insertCell();
            cellTable.textContent = rowTable[keys];
            cellTable.setAttribute('class', 'table__row');

        })
    })
    //Inserto la tabla en el contenedor
    elContentTable.appendChild(createTableHtml);
}

//Paginador desde la web
//Variables globales
let data = [];
let currentPage = 1;
const rowsPerPage = 10;

function displayPage(data, page, rowsPerPage) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
}

function showDataTable() {
    const tableHead = document.getElementById("table-head");
    const tableBody = document.getElementById("table-body");

    if (data.length === 0) {
    tableHead.innerHTML = "<tr><th>No hay datos</th></tr>";
    tableBody.innerHTML = "";
    return;
    }

    const headers = Object.keys(data[0]);
    tableHead.innerHTML = "<tr>" + headers.map(h => `<th class="table__header">${h}</th>`).join("") + "</tr>";

    const paginatedData = displayPage(data, currentPage, rowsPerPage);
    tableBody.innerHTML = paginatedData.map(row => {
    return "<tr>" + headers.map(h => `<td>${row[h] ?? ''}</td>`).join("") + "</tr>";
    }).join("");

    document.getElementById("page-number").textContent = `${currentPage}`;
}

//Muestra los datos paginados
//Crear logica de paginador para mostrar los datos en la tabla
function createPaginator(data) {
    //Convierto los datos en una hoja
    const jsonData = Array.from(data);
    console.log(jsonData)
}
 function prevPage() {
    if (currentPage > 1) {
    currentPage--;
    showDataTable();
    }
}
function nextPage() {
    if (currentPage * rowsPerPage < data.length) {
    currentPage++;
    showDataTable();
    }
}

//Exportacion segun libreria
function exportCurrentPage() {
    const paginatedData = displayPage(data, currentPage, rowsPerPage);
    const worksheet = XLSX.utils.json_to_sheet(paginatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Página_" + currentPage);
    XLSX.writeFile(workbook, "pagina_" + currentPage + ".xlsx");
}

//Crear logica para filtro de datos en tabla
//Crear calculo de KPIs
//Mostrar resultados de los KPIs en graficos
