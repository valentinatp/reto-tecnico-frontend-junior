//Transformar archivo XLSX
//Campturo el documento del input a traves del ID
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
        const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        //Envio los datos por parametro a la funcion para crear la tabla
        showDataTable(data);
    }
    readerFile.readAsBinaryString(dataDocXlsx);
})


function showDataTable(data) {
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
    createTableHtml.border = '1';
    createTableHtml.setAttribute('class', 'table')
    //Creo los encabezados de la tabla
    const headersTable = Object.keys(data[0]);
    const rowHeadersTable = createTableHtml.insertRow();
    headersTable.forEach((headerElement) => {
        const cellTable = rowHeadersTable.insertCell();
        cellTable.textContent = headerElement;
        cellTable.style.fontWeight = 'bold';
    })
    //Creo las filas de la tabla
    data.forEach((rowTable) => {
        const rowTableBody = createTableHtml.insertRow();
        headersTable.forEach((clave) => {
            const cellTable = rowTableBody.insertCell();
            cellTable.textContent = rowTable[clave];
        })
    })
    //Inserto la tabla en el contenedor
    elContentTable.appendChild(createTableHtml);
}
//Crear logica de paginador para mostrar los datos en la tabla


//Crear logica para filtro de datos en tabla
//Crear boton para descargar los datos de la tabla en formato XLSX
//Crear calculo de KPIs
//Mostrar resultados de los KPIs en graficos
