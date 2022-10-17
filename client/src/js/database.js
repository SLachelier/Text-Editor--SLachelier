import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT & GET methods
export const putDb = async (content) => {
  console.log('Retrieving data from JATE database');
  const jateDb = await openDB('jate', 1);
  const transac = jateDb.transaction('jate', 'read-write');
  const objStore = transac.objectStore('jate');
  const req = objStore.getAll();
  const res = await req;

  console.log('The data has been saved to jateDb.', res);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id, content) => {
  console.log('requesting update to jateDb');
  const jateDb = await openDB('jate', 1);
  const transac = jateDb.transaction('jate', 'read-write');
  const objStore = transac.objectStore('jate');
  const req = objStore.put({id: id, value: value});
  const res = await req;
  
  console.log('The data has been saved to jateDb.', res);
};

initdb();
