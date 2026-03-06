const pool = require("../config/db");

class Booking {

  static async create({ user_id, room_id, start_date, end_date }) {

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      const [existing] = await connection.query(
        `SELECT * FROM bookings
         WHERE room_id = ?
         AND (start_date <= ? AND end_date >= ?)`,
        [room_id, end_date, start_date]
      );

      if (existing.length > 0) {
        throw new Error("Room already booked for selected dates");
      }

      const [result] = await connection.query(
        `INSERT INTO bookings 
         (user_id, room_id, start_date, end_date)
         VALUES (?, ?, ?, ?)`,
        [user_id, room_id, start_date, end_date]
      );

      await connection.commit();
      return result.insertId;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

   static async isRoomAvailable(room_id, start_date, end_date) {

    const [rows] = await pool.query(
      `SELECT id FROM bookings
       WHERE room_id = ?
       AND start_date <= ?
       AND end_date >= ?`,
      [room_id, end_date, start_date]
    );
    
    return rows.length === 0;
  }

  static async findAll() {
    const [rows] = await pool.query(`
      SELECT b.*, u.name AS user_name, r.name AS room_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN rooms r ON b.room_id = r.id
    `);
    return rows;
  }
  static async findByUserId(user_id) {

  const [rows] = await pool.query(`
    SELECT 
      b.*,
      r.name AS room_name,
      r.price_per_night AS price
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    WHERE b.user_id = ?
    ORDER BY b.start_date DESC
  `,[user_id]);

  return rows;
}

  static async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM bookings WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async update(id, { start_date, end_date }) {
    await pool.query(
      "UPDATE bookings SET start_date = ?, end_date = ? WHERE id = ?",
      [start_date, end_date, id]
    );
  }

  static async delete(id) {
    await pool.query("DELETE FROM bookings WHERE id = ?", [id]);
  }
}

module.exports = Booking;