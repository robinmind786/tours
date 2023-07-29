const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

/**
 * Mongoose atlas url
 */
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(DB, {
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

/**
 * Read json file
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

/**
 * Import data into DB
 */
const importData = async () => {
  try {
    await Tour.create(tours);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

/**
 * Delete all data from DB
 */
const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

/**
 * Control import and delete by cmd
 */
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
