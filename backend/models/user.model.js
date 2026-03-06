const pool = require("../config/db");

class User {

  static async create({ name, email, password }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT id, name, email FROM users");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }
  
  static async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  static async update(id, { name, email }) {
    await pool.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );
  }

  static async delete(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

module.exports =  User;