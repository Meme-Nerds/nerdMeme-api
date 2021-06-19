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
};
