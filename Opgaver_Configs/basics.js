function createTableHeader() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    // Create and append an empty header cell for the row numbers
    const thRowNum = document.createElement('th');
    thRowNum.textContent = '';  // Or set to 'No.' for "number"
    tr.appendChild(thRowNum);

    // Append input headers
    config.inputs.forEach(input => {
        const th = document.createElement('th');
        th.textContent = input.label;
        tr.appendChild(th);
    });

    // Append output headers
    config.outputs.forEach(output => {
        const th = document.createElement('th');
        th.textContent = output.label;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
}

document.getElementById('resultsTable').appendChild(createTableHeader());


function generateCombinations(n) {
    if (n === 1) {
        return [[0], [1]];
    } else {
        const previousCombinations = generateCombinations(n - 1);
        return previousCombinations.flatMap(comb => [[...comb, 0], [...comb, 1]]);
    }
}

function generateInputData() {
    const combinations = generateCombinations(config.inputs.length);
    return combinations.map(combination => {
        const output = calculateOutputs(...combination);
        return [...combination, output];
    });
}

function displayResults() {
    const data = generateInputData();
    const tableBody = document.getElementById('results');
    let rowNumber = 1;

    data.forEach(row => {
        const tr = document.createElement('tr');
        
        // Create and append the row number cell
        const tdRowNum = document.createElement('td');
        tdRowNum.textContent = '#' + rowNumber++;
        tdRowNum.classList.add('row-number');
        tr.appendChild(tdRowNum);

        // Append input values to the row
        config.inputs.forEach((input, index) => {
            const td = document.createElement('td');
            td.textContent = row[index];
            td.className = row[index] === 1 ? 'one' : 'zero';
            tr.appendChild(td);
        });

        // Append output values to the row
        config.outputs.forEach((output, index) => {
            const td = document.createElement('td');
            td.textContent = row[config.inputs.length + index];
            td.className = row[config.inputs.length + index] === 1 ? 'one' : 'zero';
            td.classList.add('bold-output');  // Add class for bold text
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}
