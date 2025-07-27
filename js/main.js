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
        //Muestro los datos por consola
        console.log(data);
    }
    readerFile.readAsBinaryString(dataDocXlsx);
})

//Capturar los datos en formato Json

//Crear logica de paginador para mostrar los datos en la tabla
//Crear logica para filtro de datos en tabla
//Crear boton para descargar los datos de la tabla en formato XLSX
//Crear calculo de KPIs
//Mostrar resultados de los KPIs en graficos
