const pool = require('../utils/pool');

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
      RETURNING *
      `,
      [world, content]
    );
    return new Content(rows[0]);
  }

  static async insert(contentType, content) {
    const { rows } = await pool.query(
      `INSERT INTO ${contentType} (world, content)
      VALUES ($1, $2)
      RETURNING *
      `,
      [content.world, content.content]
    );
    return new Content(rows[0]);
  }

  static async getCustomMeme(meme) {
    const { rows } = await pool.query(
      `SELECT * FROM (SELECT content AS setting
      FROM settings 
      WHERE world=$1
      ORDER BY RANDOM()
      LIMIT 1) AS setting
      CROSS JOIN
      (SELECT content AS image
      FROM images
      WHERE world=$2
      ORDER BY RANDOM()
      LIMIT 1) AS image
      CROSS JOIN
      (SELECT content AS quote
      FROM quotes
      WHERE world=$3
      ORDER BY RANDOM()
      LIMIT 1) AS quote
      CROSS JOIN
      (SELECT content AS author
      FROM authors
      WHERE world=$4
      ORDER BY RANDOM()
      LIMIT 1) AS author`,
      [meme[0], meme[1], meme[2], meme[3]]
    );
    return rows[0];
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
  
    return rows[0];
  }

  static async getContent(type) {
    const { rows } = await pool.query(
      `SELECT * FROM ${type}`
    );
    return rows;
  }

  static async findById(type, id) {
    const { rows } = await pool.query(
      `SELECT * FROM ${type}
      WHERE ID=$1`,
      [id]
    );
    if(!rows[0]) return null;
    else return new Content(rows[0]);
  }

  static async deleteContent(type, id) {
    const { rows } = await pool.query(
      `DELETE FROM ${type}
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Content(rows[0]);
  }

  static async updateContent(type, id, content) {
    const { rows } = await pool.query(
      `UPDATE ${type}
      SET world=$1,
          content=$2
      WHERE id=$3
      RETURNING *
      `,
      [content.world, content.content, id]
    );
    return new Content(rows[0]);
  }
};
