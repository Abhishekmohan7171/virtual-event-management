const express = require("express");
const router = express.Router();
const Event = require("../models/events");
const { validateJWT } = require("../middleware/validateJWT");

//create an event
router.post("/create",validateJWT, async (req,res) => {
    if(req.user.role === "admin" ){
        const event = req.body;
        const dbEvent = await Event.create(event);
        res.send({ newEvent: dbEvent, message: "Event created successfully" });
    }else{
        res.status(401).send({message: "Unauthorized"});
    }
});

//update an event
router.put("/:id",validateJWT, async (req,res) => {
    if(req.user.role === "admin"){
        const id = req.params.id;
        const dbEvent = await Event.findByIdAndUpdate(id,req.body, { new: true });
        console.log(dbEvent,"->>>>>>>>>>>>>>")
        res.send({updatedEvent: req.body, message: "Event updated successfully"});
    }else{
        res.status(401).send({message: "Unauthorized"});
    }
})

//get all events
router.get("/", async (req,res) => {
    const events = await Event.find();
    res.send({events: events, message: "All Events fetched successfully"});
})

//delete an event
router.delete("/:id", validateJWT , async (req,res) => {
    if(req.user.role === "admin"){
        const id = req.params.id;
        await Event.findByIdAndDelete(id);
        res.send({message: "Event deleted successfully"});
    }else{
        res.status(401).send({message: "Unauthorized"});
    }
})

module.exports = router;