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
    title.style.display = 'block';

    const elementClone = element.cloneNode(true);
    const titleClone = title.cloneNode(true);
    titleClone.style.fontSize = '30px';
    titleClone.style.textAlign = 'center';
    elementClone.insertBefore(titleClone, elementClone.firstChild);

    // Ajuste para capturar toda la tabla en PDF
    if (format === 'pdf') {
        html2pdf().from(elementClone).set({
            filename: 'dinamica.pdf',
            margin: 1,
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait' }
        }).save();
    }
}
