const express = require('express');
const bodyParser = require('body-parser');
const odbc = require('odbc');

const app = express();
const PORT = 3000;

const connectionString = `DRIVER={ODBC Driver 17 for SQL Server};` +
                         `SERVER=DESKTOP-SRL8GNE,1434;` +
                         `DATABASE=SustainableSystem;` +
                         `Trusted_Connection=Yes;`;

let dbConnection; // Store the database connection

// Function to connect to the database
async function connectToDatabase() {
    try {
        dbConnection = await odbc.connect(connectionString);
        console.log("Connected to the database successfully! Ready to execute queries.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

// Connect to the database on server startup
connectToDatabase();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST route to receive data and insert into the database
app.post('/data', async (req, res) => {
    let { roomNum, waterValue, time } = req.body;

    // Type conversion
    roomNum = parseInt(roomNum); // Convert to integer
    waterValue = parseFloat(waterValue); // Convert to float
    time = String(time); // Convert to string

    // Validation check
    if (isNaN(roomNum) || isNaN(waterValue) || !time) {
        return res.status(400).json({ error: "Invalid data format" });
    }

    // Split the time into date and time components
    let [date, timeOnly] = time.split('T'); // Assuming time is in the format YYYY-MM-DDTHH:MM:SS
    
    // If the time doesn't have both date and time parts, return an error
    if (!date || !timeOnly) {
        return res.status(400).json({ error: "Invalid time format. Expected 'YYYY-MM-DDTHH:MM:SS'" });
    }

    // Store the data with the parsed date and time
    const receivedData = {
        roomNum,
        waterValue,
        date,
        time: timeOnly
    };

    console.log("Stored Data:", receivedData);

    // Insert data into the specific room table
    try {
        if (!dbConnection) {
            return res.status(500).json({ error: "Database not connected" });
        }

        // Construct dynamic SQL query to insert into Room_<roomNum>
        const insertQuery = `
            INSERT INTO Room_${roomNum} (waterValue, date, time)
            VALUES (${waterValue}, '${date}', '${timeOnly}')
        `;

        await dbConnection.query(insertQuery);
        console.log(`Data inserted into Room_${roomNum} successfully!`);

        res.json({ message: `Data stored successfully in Room_${roomNum}` });
    } catch (error) {
        console.error("Database insertion error:", error);
        res.status(500).json({ error: "Failed to insert data into database" });
    }
});

// GET route to retrieve data from the database
app.get('/data', async (req, res) => {
    try {
        if (!dbConnection) {
            return res.status(500).json({ error: "Database not connected" });
        }

        const result = await dbConnection.query("SELECT * FROM WaterUsage");
        res.json(result);
    } catch (error) {
        console.error("Database retrieval error:", error);
        res.status(500).json({ error: "Failed to retrieve data from database" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
