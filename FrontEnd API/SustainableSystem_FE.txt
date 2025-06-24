const http = require('http');
const odbc = require('odbc');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 2000;

const connectionString = `DRIVER={ODBC Driver 17 for SQL Server};` +
    `SERVER=DESKTOP-SRL8GNE,1434;` +
    `DATABASE=SustainableSystem;` +
    `Trusted_Connection=Yes;`;

let dbConnection;

// Function to establish a connection and keep it open
async function connectToDatabase() {
    try {
        dbConnection = await odbc.connect(connectionString);
        console.log("Connected to the database successfully! Ready to receive data.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

// Connect to the database on startup
connectToDatabase();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.post('/', async (req, res) => {
    try {
        const { roomNum, date, time } = req.body;

        if (!roomNum || !date || !time) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        // Construct the dynamic SQL query
        const selectQuery = `
            DECLARE @startDate DATE = '${date}';
            DECLARE @startTime TIME(0) = '${time}';
            SELECT * FROM Room_${roomNum} WHERE 
            (date > @startDate OR (date = @startDate AND time >= @startTime)) 
            AND (date < CAST(GETDATE() AS DATE) OR 
            (date = CAST(GETDATE() AS DATE) AND time <= CAST(GETDATE() AS TIME(0))));
        `;

        // Execute the query and send the results
        const result = await dbConnection.query(selectQuery);
        console.log("Query Results:", result);
        res.status(200).json({ message: 'Data received and processed successfully', result: result });
    } catch (error) {
        console.error("Error parsing JSON or executing query:", error);
        res.status(400).json({ error: 'Failed to parse JSON or execute query' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Keep the process running
process.stdin.resume();
