import {db, executeQuery} from '../../db/utils/DataBase';
import {getCurrentDateTime} from '../../utilies/DateUtils';

const SettingModel = {
  create: async settings => {
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;

    const query =
      'INSERT INTO settings (settings, createdAt, updatedAt) VALUES (?, ?, ?)';
    const params = [settings, createdAt, updatedAt];

    try {
      const {insertId} = await executeQuery(query, params);
      return {id: insertId, settings, createdAt, updatedAt};
    } catch (error) {
      console.error('Failed to create settings:', error);
      return null;
    }
  },

  getAll: async () => {
    const query = 'SELECT * FROM settings';

    try {
      const resultSet = await executeQuery(query);
      const settingList = resultSet.rows.raw();
      return settingList;
    } catch (error) {
      console.error('Failed to get settings list:', error);
      return [];
    }
  },

  update: async (id, settings) => {
    const updatedAt = getCurrentDateTime();

    const query =
      'UPDATE settings SET settings = ?, updatedAt = ? WHERE id = ?';
    const params = [settings, updatedAt, id];

    try {
      await executeQuery(query, params);
      return {id, settings, updatedAt};
    } catch (error) {
      console.error('Failed to update settings:', error);
      return null;
    }
  },

  delete: async id => {
    const query = 'DELETE FROM settings WHERE id = ?';
    const params = [id];

    try {
      await executeQuery(query, params);
      return true;
    } catch (error) {
      console.error('Failed to delete settings:', error);
      return false;
    }
  },
};

export default SettingModel;
