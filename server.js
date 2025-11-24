const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const { users } = JSON.parse(fs.readFileSync("./sd15468411.json", "utf8"));

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.json({ success: false, message: "Uživatel neexistuje" });
    }

    const correct = await bcrypt.compare(password, user.hash);

    if (correct) {
        return res.json({ success: true, username: user.username });
    } else {
        return res.json({ success: false, message: "Špatné heslo" });
    }
});

app.listen(3000, () => console.log("Server běží na http://localhost:3000"));