const apiKey = ''; 

let documentText = "";

// Handle file input
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const contents = e.target.result;
            if (file.type === "text/plain") {
                documentText = contents;
                console.log("TXT file content extracted:", documentText);
            } else if (file.type.includes("word")) {
                processDocx(e.target.result);
            } else if (file.type.includes("csv") || file.type.includes("excel") || file.type.includes("spreadsheetml.sheet")) {
                processExcel(e.target.result);
            }
        };
        
        if (file.type === "text/plain") {
            fileReader.readAsText(file);
        } else if (file.type.includes("word")) {
            fileReader.readAsArrayBuffer(file);
        } else {
            fileReader.readAsBinaryString(file);
        }
    }
}

function processDocx(arrayBuffer) {
    mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then(result => {
            documentText = result.value;
            console.log("DOCX text extracted:", documentText);
        })
        .catch(err => {
            console.error("Error processing DOCX:", err.message);
            alert('Error processing the DOCX document.');
        });
}

function processExcel(contents) {
    const workbook = XLSX.read(contents, { type: 'binary' });
    let excelData = [];
    workbook.SheetNames.forEach(sheetName => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        sheet.forEach(row => {
            excelData.push(row.join(' '));
        });
    });
    documentText = excelData.join(' ');
    console.log("Excel text extracted:", documentText);
}

// Ask a question
async function askQuestion() {
    const question = document.getElementById('questionInput').value;
    if (question && documentText) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: documentText },
                        { role: "user", content: question }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            document.querySelector('.bot-text').innerText = data.choices[0].message.content.trim();
        } catch (error) {
            console.error("Error during API request:", error.message);
            document.getElementById('.bot-text').innerText = "Error processing the question.";
        }
    } else {
        alert("Please upload a document and ask a question.");
    }
}
