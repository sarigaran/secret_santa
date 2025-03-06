// const Employee = require('../models/Employee');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const employee = require('../modals/employee');

// Upload CSV and store in MongoDB
exports.uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

  const filePath = path.join(__dirname, '../', req.file.path);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse(fileContent, { header: true });
  const employees = parsed.data.map((row) => ({
    name: row.Employee_Name,
    email: row.Employee_EmailID,
  }));

  await employee.deleteMany({});
  await employee.insertMany(employees);

  fs.unlinkSync(filePath);
  res.json({ message: 'File uploaded and stored in MongoDB!' });
};
