const pool = require('../data/setup');

module.exports = class Content {
  id;
  world;
  content;

  constructor(row) {
    this.id = row.id;
    this.world = row.world;
    this.content = row.content;
  }

  static async insert(contentType, content) {
    const { rows } = await pool.query(
      `INSERT INTO ${contentType} (world, content)
      VALUES ($1, $2)
      RETURNING *`,
      [content.world, content.content]
    );
    return new Content(rows[0]);
  }
};
