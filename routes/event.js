const router = require("express").Router();
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch events",
      error: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch event",
      error: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    if (!title || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Title, date, and time are required",
      });
    }
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid date",
      });
    }

    if (eventDate < today) {
      return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past",
      });
    }
    const newEvent = new Event({
      title: title.trim(),
      date: eventDate,
      time: time.trim(),
      description: description.trim(),
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      data: savedEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to create event",
      error: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error("Error deleting event:", error);

    res.status(500).json({
      success: false,
      message: "Server Error: Unable to delete event",
      error: error.message,
    });
  }
});

module.exports = router;
