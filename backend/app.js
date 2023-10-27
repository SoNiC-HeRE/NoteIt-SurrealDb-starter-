const { Surreal } = require('surrealdb.js');

async function main() {
  const db = new Surreal();

  try {
    await db.connect('http://127.0.0.1:8000/rpc');

    await db.signin({
      user: 'root',
      pass: 'root',
    });

    await db.use({ ns: 'test', db: 'newone' });

    const newNote = {
      name: 'Example Note',
      content: 'This is an example note.',
    };

    let created = await db.create('notes', newNote);
    console.log('Note created:', created);

    let notes = await db.select('notes');
    console.log('All notes:', notes);

    let groups = await db.query('SELECT * FROM type::table($tb) ', {
      tb: 'notes',
    });
    console.log('Groups:', groups);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    await db.close();
  }
}

main();
