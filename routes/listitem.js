const router = require("express").Router();
const List = require("../models/schema_list"); // Assuming you have a List model
const authenticate = require("../middleware/auth");

// Create a new to-do item
router.post("/create", authenticate, async (req, res) => {
    try {
        const { title, body } = req.body;
        const newList = new List({ title, body, user: req.user._id });
        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update Internal server error" });
    }
});

// Get all to-do items for the authenticated user
router.get("/", authenticate, async (req, res) => {
    try {
        const lists = await List.find({ user: req.user._id });
        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a to-do item
router.put("/update/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const list = await List.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, body },
            { new: true }
        );

        if (!list) {
            return res.status(404).json({ message: "List not found or not authorized" });
        }

        res.status(200).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Internal server error" });
    }
});

// Delete a to-do item
router.delete("/delete/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const list = await List.findOneAndDelete({ _id: id, user: req.user._id });

        if (!list) {
            return res.status(404).json({ message: "List not found or not authorized" });
        }

        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "delete Internal server error" });
    }
});

module.exports = router;
