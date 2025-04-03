const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = []; // Храним данные в памяти

// Получение списка данных
app.get("/items", (req, res) => {
    res.json(items);
});

// Добавление нового элемента
app.post("/items", (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(3000, () => console.log("Server started on port 3000"));

// Удаление элемента по ID
app.delete("/items/:id", (req, res) => {
    const itemId = Number(req.params.id);
    items = items.filter(item => item.id !== itemId);
    res.json({ message: "Item deleted" });
});

// Обновление элемента по ID
app.put("/items/:id", (req, res) => {
    const itemId = Number(req.params.id);
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items[index].name = req.body.name;
        res.json(items[index]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});
