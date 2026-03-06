const pool = require("../config/db");

class Room {

  static async create({ name, price_per_night }) {
    const [result] = await pool.query(
      "INSERT INTO rooms (name, price_per_night) VALUES (?, ?)",
      [name, price_per_night]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM rooms");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM rooms WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, price_per_night }) {
    await pool.query(
      "UPDATE rooms SET name = ?, price_per_night = ? WHERE id = ?",
      [name, price_per_night, id]
    );
  }

  static async delete(id) {
    await pool.query("DELETE FROM rooms WHERE id = ?", [id]);
  }
}

module.exports = Room;