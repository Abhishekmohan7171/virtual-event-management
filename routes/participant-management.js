const express = require("express");
const { validateJWT } = require("../middleware/validateJWT");
const User = require("../models/user");
const Event = require("../models/events");
const router = express.Router();

//register event
router.post("/register/:id", validateJWT, async (req, res) => {
  const eventId = req.params.id;
  if (req.user.role === "user") {
    try {
      //find the event
      const event = await Event.findById(eventId);
      if (!event) return res.send(404).send({ message: "Event not found!" });

      // Add user to the event's attendees list if not already registered
      if (!event.attendees.includes(req.user.id)) {
        event.attendees.push(req.user.id);
        await event.save();
      }

      // Add the event to the user's registered events if not already registered
      const user = await User.findById(req.user.id);
      if (!user.registeredEvents.includes(eventId)) {
        user.registeredEvents.push({event_id:eventId,name:event.name});
        await user.save();
      }

      res.send({ message: "Successfully registered for the event", event });
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).send({ message: "Error registering for event" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

module.exports = router;
