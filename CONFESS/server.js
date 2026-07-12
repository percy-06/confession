const express = require("express");
const db = require("./database");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Save confession
app.post("/confession", (req, res) => {
    const { message } = req.body;

    db.run(
        "INSERT INTO confessions (message, time) VALUES (?, ?)",
        [message, new Date().toISOString()],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json({
                success: true,
                message: "Confession saved!"
            });
        }
    );
});

// Get all confessions
app.get("/confessions", (req, res) => {
    db.all(
        "SELECT * FROM confessions ORDER BY id DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            res.json(rows);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});