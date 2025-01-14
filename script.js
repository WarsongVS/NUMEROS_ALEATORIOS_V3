// Eventos de los botones
document.getElementById('generateTableBtn').addEventListener('click', generateTable);
document.getElementById('generateBtn').addEventListener('click', highlightCells);
document.getElementById('clearBtn').addEventListener('click', clearResults);
document.getElementById('exportPdfBtn').addEventListener('click', () => exportTable('pdf'));
document.getElementById('exportJpgBtn').addEventListener('click', () => exportTable('jpg'));

function generateTable() {
    const participants = parseInt(document.getElementById('participants').value);
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = ''; // Limpiar solo el contenido dentro del área de resultados

    const table = document.createElement('table');
    let cellNumber = 1;

    for (let i = 0; i < Math.ceil(participants / 5); i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 5 && cellNumber <= participants; j++) {
            const cell = document.createElement('td');
            cell.innerHTML = `<div>${cellNumber}</div><img src="image.png"><br><input type="text" placeholder="Nombre">`;
            row.appendChild(cell);
            cellNumber++;
        }
        table.appendChild(row);
    }
    resultArea.appendChild(table);

    // Mostrar el título de la tabla
    document.getElementById('tableTitle').style.display = 'block';
}

// Función para resaltar las celdas con diferentes colores en orden
function highlightCells() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const cells = document.querySelectorAll('td');
    
    // Limpiar resaltado anterior
    cells.forEach(cell => {
        cell.classList.remove('highlight');
        cell.style.backgroundColor = '';  // Restablecer el color de fondo
    });

    // Colores según la cantidad de resultados
    const colors = ['red', 'yellow', 'blue', 'green', 'orange', 'lightblue']; // Celeste para 6 o más

    let highlightedCells = [];
    
    // Resaltar las celdas con los colores en orden
    while (highlightedCells.length < quantity) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        if (!highlightedCells.includes(randomIndex)) {
            highlightedCells.push(randomIndex);

            // Asignar color según el número de resultados
            let colorIndex = highlightedCells.length - 1;
            if (colorIndex >= colors.length) {
                colorIndex = colors.length - 1; // Si hay más de 5 resultados, usar color celeste
            }

            cells[randomIndex].style.backgroundColor = colors[colorIndex]; // Aplicar el color
        }
    }
}

// Función para limpiar los resultados
function clearResults() {
    document.getElementById('resultArea').innerHTML = '';
}

// Función para exportar la tabla a PDF o JPG
function exportTable(format) {
    const element = document.getElementById('resultArea');
    const title = document.getElementById('tableTitle');

    // Obtener la fecha y hora actuales para el nombre del archivo
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    const filename = `Dinamica_${timestamp}.pdf`;

    // Mostrar el título temporalmente
    title.style.display = 'block';

    // Crear un clon del contenido para exportarlo sin afectar la página original
    const elementClone = element.cloneNode(true);
    const titleClone = title.cloneNode(true);
    titleClone.style.fontSize = '30px';
    titleClone.style.textAlign = 'center';
    elementClone.insertBefore(titleClone, elementClone.firstChild);

    // Exportar a PDF usando html2pdf
    html2pdf().from(elementClone).set({
        filename: filename,
        margin: 1,
        html2canvas: { scale: 3 },
        jsPDF: { orientation: 'portrait' }
    }).save();

    // Ocultar el título nuevamente después de la exportación
    title.style.display = 'none';
}
