// Import required modules
const express = require('express');

const app = express();
const port = 3000;

// Sample data for iPhones
const iPhones = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
    price: 999,
    imageOptions: {
      Graphite: "https://example.com/images/iphone13pro_graphite.jpg",
      Gold: "https://example.com/images/iphone13pro_gold.jpg",
      Silver: "https://example.com/images/iphone13pro_silver.jpg",
      SierraBlue: "https://example.com/images/iphone13pro_sierra_blue.jpg"
    },
    description: "A dramatically more powerful camera system. A display so responsive, every interaction feels new again."
  },
  {
    id: 2,
    name: "iPhone 14",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Blue", "Red"],
    price: 799,
    imageOptions: {
      Midnight: "https://example.com/images/iphone14_midnight.jpg",
      Starlight: "https://example.com/images/iphone14_starlight.jpg",
      Blue: "https://example.com/images/iphone14_blue.jpg",
      Red: "https://example.com/images/iphone14_red.jpg"
    },
    description: "The most advanced dual‑camera system ever on iPhone. Lightning-fast performance and impressive battery life."
  },
  {
    id: 3,
    name: "iPhone 15",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Blue", "Red"],
    price: 999,
    imageOptions: {
      Midnight: "https://example.com/images/iphone14_midnight.jpg",
      Starlight: "https://example.com/images/iphone14_starlight.jpg",
      Blue: "https://example.com/images/iphone14_blue.jpg",
      Red: "https://example.com/images/iphone14_red.jpg"
    },
    description: "The most advanced dual‑camera system ever on iPhone. Lightning-fast performance and impressive battery life."
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Blue", "Red"],
    price: 9999,
    imageOptions: {
      Midnight: "https://example.com/images/iphone14_midnight.jpg",
      Starlight: "https://example.com/images/iphone14_starlight.jpg",
      Blue: "https://example.com/images/iphone14_blue.jpg",
      Red: "https://example.com/images/iphone14_red.jpg"
    },
    description: "The most advanced dual‑camera system ever on iPhone. Lightning-fast performance and impressive battery life."
  },
  {
    id: 5,
    name: "iPhone 12",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Blue", "Red"],
    price: 8999,
    imageOptions: {
      Midnight: "https://example.com/images/iphone14_midnight.jpg",
      Starlight: "https://example.com/images/iphone14_starlight.jpg",
      Blue: "https://example.com/images/iphone14_blue.jpg",
      Red: "https://example.com/images/iphone14_red.jpg"
    },
    description: "The most advanced dual‑camera system ever on iPhone. Lightning-fast performance and impressive battery life."
  },
  {
    id: 6,
    name: "iPhone 16",
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Starlight", "Blue", "Red"],
    price: 12000,
    imageOptions: {
      Midnight: "https://example.com/images/iphone14_midnight.jpg",
      Starlight: "https://example.com/images/iphone14_starlight.jpg",
      Blue: "https://example.com/images/iphone14_blue.jpg",
      Red: "https://example.com/images/iphone14_red.jpg"
    },
    description: "The most advanced dual‑camera system ever on iPhone. Lightning-fast performance and impressive battery life."
  }
];

// Middleware to parse JSON
app.use(express.json());

// Route to get all iPhones
app.get('/api/iphones', (_req, res) => {
  res.json(iPhones);
});

// Route to get a specific iPhone by ID and selected options
app.get('/api/iphones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Explicitly specify radix
  const iPhone = iPhones.find(phone => phone.id === id);

  if (!iPhone) {
    return res.status(404).json({ message: "iPhone not found" });
  }

  const { color, storage } = req.query;

  // Validate the selected color
  if (color && !iPhone.colors.includes(color)) {
    return res.status(400).json({ message: `Color '${color}' is not available for ${iPhone.name}` });
  }

  // Validate the selected storage
  if (storage && !iPhone.storageOptions.includes(storage)) {
    return res.status(400).json({ message: `Storage '${storage}' is not available for ${iPhone.name}` });
  }

  // Get the selected image based on color
  const selectedImage = color ? iPhone.imageOptions[color] : null;

  res.json({
    ...iPhone,
    selectedColor: color || "No color selected",
    selectedStorage: storage || "No storage selected",
    selectedImage: selectedImage || "No image selected"
  });
});

// Route to add a new iPhone (with validation)
app.post('/api/iphones', (req, res) => {
    const { name, storageOptions, colors, price, imageOptions, description } = req.body;
  
    if (!name || !storageOptions || !colors || !price || !imageOptions || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Find the next available ID
    const nextId = Math.max(...iPhones.map(phone => phone.id), 0) + 1;
  
    const newiPhone = {
      id: nextId,
      name,
      storageOptions,
      colors,
      price,
      imageOptions,
      description
    };
  
    iPhones.push(newiPhone);
    res.status(201).json(newiPhone);
  });
  

// Start the server
app.listen(port, () => {
  console.log(`iPhone API server running at http://localhost:${port}`);
});
