// models/booking.js
import connection from '../db/connection.js';







// Get all bookings for a specific service provider
// models/booking.js
export const getBookingsByServiceProvider = (email, callback) => {
  const query = `
  SELECT b.* 
  FROM booking b
  JOIN sp_services s ON  b.Service_Name = s.Service_Name
  WHERE b.SP_Email = ? OR b.Book_Status = "Pending" OR b.Book_Status="Accepted"
`;

  console.log('Executing query:', query, 'with email:', email); // Debugging print

  connection.query(query, [email], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return callback(err, null);
      }
      console.log('Query results:', results); // Debugging print
      callback(null, results);
  });
};



// Get all bookings
export const getAllBookings = (callback) => {
  connection.query('SELECT * FROM booking', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new booking
export const addBooking = (bookingData, callback) => {
  const { SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Book_HouseNo, Book_Area, Book_City, Book_State } = bookingData;

  // Generate current date and time
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

  // Insert query for adding a new booking
  const query = `
    INSERT INTO booking (SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Book_Date, Book_HouseNo, Book_Area, Book_City, Book_State)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [SP_Username, C_username, Book_Status, Service_Name, Service_Category, currentDate, Book_HouseNo, Book_Area, Book_City, Book_State],
    (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return callback({ error: err.code, message: err.message }, null);
      }
      callback(null, result);
    }
  );
};
export const deleteBooking = (bookingId, callback) => {
  const query = 'DELETE FROM booking WHERE Book_ID = ?';

  connection.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};


// Update booking status and assign to a specific service provider
export const updateBookingStatus = (bookingId, status, spEmail, callback) => {
  const query = `
    UPDATE booking
    SET Book_Status = ?, SP_Email = ?
    WHERE Book_ID = ?
  `;

  connection.query(query, [status, spEmail, bookingId], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
};
// models/booking.js
export const cancelBooking = (bookId, callback) => {
  const query = 'UPDATE booking SET Book_Status = ? WHERE Book_ID = ?';

  connection.query(query, ['Pending', bookId], (err, result) => {
    if (err) {
      console.error('Error canceling booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }

    if (result.affectedRows === 0) {
      // No booking found with that Book_ID
      return callback({ error: 'Booking not found' }, null);
    }

    callback(null, result);
  });
};

// models/booking.js


export const acceptBooking = (bookId, spEmail) => {
  return new Promise((resolve, reject) => {
    // Parameter validation
    // if (!bookId || typeof bookId !== 'string') {  // Treating bookId as a string
    //   return reject({ error: 'Invalid or missing bookId', details: `bookId: ${bookId}` });
    // }
    // if (!spEmail || typeof spEmail !== 'string') {
    //   return reject({ error: 'Invalid or missing spEmail', details: `spEmail: ${spEmail}` });
    // }

    // Query to update Book_Status and SP_Email
    const updateBookingQuery = `
      UPDATE booking 
      SET Book_Status = ?, SP_Email = ? 
      WHERE Book_ID = ?
    `;

    // Execute the query
    connection.query(updateBookingQuery, ['Accepted', spEmail, bookId], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return reject({ error: 'Database query error', details: err.message });
      }

      if (result.affectedRows === 0) {
        // No booking was updated, likely because the Book_ID doesn't match any record
        console.warn('No booking found with the given Book_ID:', bookId);
        return reject({ error: 'Booking not found', details: `Book_ID: ${bookId}` });
      }

      // Success response
      console.log(`Booking ${bookId} accepted by ${spEmail}.`);
      resolve({ message: 'Booking accepted and SP_Email updated successfully' });
    });
  });
};







