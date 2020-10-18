const csv = require("csv-parser");
const fs = require("fs");

// Receives the path of a csv file and converts it to a JSON obj appending it to an array.
// Receives an optional filter to sort out the csv, this is an object with the key being the column that will be sorted and the value the value that will be used to sort the row, for instance: filter = {key:"type",value="new"} will filter out all the rows that are of type new.
// Will return a promise with an array of the rows.

function parseCSV(csvFile,filter=null){
    return new Promise((resolve)=>{
        let rStream = fs.createReadStream(csvFile)
        let data = []

        rStream.pipe(csv()).on("data", (row) => {
            if(!filter)
                data.push(row)
            else if(row[filter.key] === filter.value)
                data.push(row)
        })

        return rStream.on("end", () => {
            resolve(data);
        })
    })
}
