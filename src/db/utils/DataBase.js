import SQLite from 'react-native-sqlite-storage';
import SettingModel from '../model/SettingModel';
const databaseName = 'myDB';
const databaseVersion = '1.0';

const db = SQLite.openDatabase(
  {name: databaseName, version: databaseVersion},
  () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          barCode TEXT,
          createdAt TEXT,
          updatedAt TEXT
        )`,
        [],
        () => {
          console.log('History table created successfully');
        },
        (_, error) => {
          console.error('Failed to create history table:', error);
        },
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          settings TEXT,
          createdAt TEXT,
          updatedAt TEXT
        )`,
        [],
        () => {
          console.log('Settings table created successfully');
          const res = SettingModel.getAll();
          if (res[0] === undefined) SettingModel.create('');
        },
        (_, error) => {
          console.error('Failed to create Settings table:', error);
        },
      );
    });
  },
  error => {
    console.error('Failed to open database:', error);
  },
);

const executeQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, resultSet) => resolve(resultSet),
        (_, error) => reject(error),
      );
    });
  });

export {db, executeQuery};
