const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const employee = require('../modals/employee');

// Function to assign Secret Santa
const assignSecretSanta = async () => {
  const employees = await employee.find({});
  if (employees.length < 2) return null;

  let givers = [...employees];
  let receivers = [...employees];

  let assignments = [];

  for (let giver of givers) {
    let availableReceivers = receivers.filter((r) => r.name !== giver.name);
    if (availableReceivers.length === 0) return null;

    let randomIndex = Math.floor(Math.random() * availableReceivers.length);
    let chosenReceiver = availableReceivers[randomIndex];

    assignments.push({
      Employee_Name: giver.name,
      Employee_EmailID: giver.email,
      Secret_Child_Name: chosenReceiver.name,
      Secret_Child_EmailID: chosenReceiver.email,
    });

    receivers = receivers.filter((r) => r.name !== chosenReceiver.name);
  }

  return assignments;
};

// API to generate Secret Santa assignments and CSV
exports.generateAssignments = async (req, res) => {
  let assignments;
  do {
    assignments = await assignSecretSanta();
  } while (!assignments);

  // Convert assignments to CSV format
  const csv = Papa.unparse(assignments);
  const filePath = path.join(__dirname, '../secret_santa.csv');

  fs.writeFileSync(filePath, csv);

  res.json({ message: 'Assignments generated!', csvPath: '/download' });
};

// API to download the generated CSV file
exports.downloadCSV = (req, res) => {
  const filePath = path.join(__dirname, '../secret_santa.csv');
  res.download(filePath, 'Secret_Santa.csv');
};
