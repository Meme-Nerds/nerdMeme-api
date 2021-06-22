const pool = require('../lib/utils/pool');

module.exports = class Content {
  id;
  world;
  content;

  constructor(row) {
    this.id = row.id;
    this.world = row.world;
    this.content = row.content;
  }

  static async initialInsert(contentType, world, content) {
    const { rows } = await pool.query(
      `INSERT INTO ${contentType} (world, content)
      VALUES ($1, $2)
      RETURNING *`,
      [world, content]
    );
    return new Content(rows[0]);
  }

  static async getSetting(world) {
    const { rows } = await pool.query(
      `SELECT content AS setting
      FROM settings
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    console.log(rows[0], world, 'model')
    return rows[0];
  }

  static async getImage(world) {
    const { rows } = await pool.query(
      `SELECT content AS image
      FROM images
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    console.log(rows[0], world, 'model2')
    return rows[0];
  }

  static async getQuote(world) {
    const { rows } = await pool.query(
      `SELECT content AS quote
      FROM quotes
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    console.log(rows[0], world, 'model3')
    return rows[0];
  }

  static async getAuthor(world) {
    const { rows } = await pool.query(
      `SELECT content AS author
      FROM authors
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1`,
      [world]
    );
    console.log(rows[0], world, 'model4')
    return rows[0];
  }
};
