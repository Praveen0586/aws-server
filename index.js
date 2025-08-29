// server.js
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory "student database"
let students = [
  { id: 1, name: "Alice", age: 21, course: "Computer Science" },
  { id: 2, name: "Bob", age: 22, course: "Mathematics" }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});
app.get("/hello",(req,res)=>{res.send("Hello User")});
// GET a student by ID
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST a new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
