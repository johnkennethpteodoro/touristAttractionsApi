const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Sample tourist attractions data
const attractions = [
	{
		id: 1,
		name: "Intramuros",
		location: "Metro Manila",
		description:
			"Historic walled city, featuring Fort Santiago, Manila Cathedral, and San Agustin Church.",
	},
	{
		id: 2,
		name: "Chocolate Hills",
		location: "Bohol",
		description: "Famous geological formations consisting of over 1,200 cone-shaped hills.",
	},
	{
		id: 3,
		name: "Kawasan Falls",
		location: "Cebu",
		description: "A multi-layered waterfall in Badian, famous for canyoneering adventures.",
	},
	{
		id: 4,
		name: "Puerto Princesa Underground River",
		location: "Palawan",
		description:
			"A UNESCO World Heritage Site, known for its impressive subterranean river system.",
	},
	{
		id: 5,
		name: "Magellan's Cross",
		location: "Cebu",
		description:
			"Historical landmark marking the spot where Ferdinand Magellan arrived in Cebu.",
	},
	{
		id: 6,
		name: "Cloud 9",
		location: "Siargao",
		description: "Famous surf spot in General Luna, offering world-class waves.",
	},
	{
		id: 7,
		name: "Mount Apo",
		location: "Davao",
		description: "The highest peak in the Philippines, offering hiking and nature experiences.",
	},
	{
		id: 8,
		name: "Vigan's Calle Crisologo",
		location: "Vigan",
		description:
			"A preserved Spanish colonial street with cobblestone pathways, antique shops, and old houses.",
	},
	{
		id: 9,
		name: "Sugba Lagoon",
		location: "Siargao",
		description: "A beautiful lagoon known for its clear turquoise waters and diving spots.",
	},
	{
		id: 10,
		name: "White Island",
		location: "Camiguin",
		description:
			"A sandbar with stunning views of the island’s volcanoes and crystal-clear waters.",
	},
];

// Home Route
app.get("/", (req, res) => {
	res.send("Welcome to the tourist attractions API");
});

// Get all tourist attractions
app.get("/api/attractions", (req, res) => {
	res.send(attractions);
});

// Get a specific tourist attraction by ID
app.get("/api/attractions/:id", (req, res) => {
	const attraction = attractions.find((a) => a.id === parseInt(req.params.id));
	if (!attraction)
		return res.status(404).send("The tourist attraction with the given ID was not found.");
	res.send(attraction);
});

// POST - Add a new tourist attraction
app.post("/api/attractions", (req, res) => {
	const { error } = validateAttraction(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const attraction = {
		id: attractions.length + 1,
		name: req.body.name,
		location: req.body.location,
		description: req.body.description,
	};

	attractions.push(attraction);
	res.send(attraction);
});

// PUT - Update an existing tourist attraction
app.put("/api/attractions/:id", (req, res) => {
	const attraction = attractions.find((a) => a.id === parseInt(req.params.id));
	if (!attraction)
		return res.status(404).send("The tourist attraction with the given ID was not found.");

	const { error } = validateAttraction(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	attraction.name = req.body.name;
	attraction.location = req.body.location;
	attraction.description = req.body.description;

	res.send(attraction);
});

// DELETE - Remove a tourist attraction
app.delete("/api/attractions/:id", (req, res) => {
	const attraction = attractions.find((a) => a.id === parseInt(req.params.id));
	if (!attraction)
		return res.status(404).send("The tourist attraction with the given ID was not found.");

	const index = attractions.indexOf(attraction);
	attractions.splice(index, 1);

	res.send(attraction); // or optionally, res.status(204).send();
});

// Tourist attraction validation function
const validateAttraction = (attraction) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		location: Joi.string().min(3).required(),
		description: Joi.string().min(5).required(),
	});

	return schema.validate(attraction);
};

// Start the server
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

module.exports = app;
