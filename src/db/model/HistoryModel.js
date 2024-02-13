import {db, executeQuery} from '../../db/utils/DataBase';
import {getCurrentDateTime} from '../../utilies/DateUtils';

const HistoryModel = {
  create: async barCode => {
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;

    const query =
      'INSERT INTO history (barCode, createdAt, updatedAt) VALUES (?, ?, ?)';
    const params = [barCode, createdAt, updatedAt];

    try {
      const {insertId} = await executeQuery(query, params);
      return {id: insertId, barCode, createdAt, updatedAt};
    } catch (error) {
      console.error('Failed to create history:', error);
      return null;
    }
  },

  getAll: async () => {
    const query = 'SELECT * FROM history';

    try {
      const resultSet = await executeQuery(query);
      const historyList = resultSet.rows.raw();
      return historyList;
    } catch (error) {
      console.error('Failed to get history list:', error);
      return [];
    }
  },

  update: async (id, barCode) => {
    const updatedAt = getCurrentDateTime();

    const query = 'UPDATE history SET barCode = ?, updatedAt = ? WHERE id = ?';
    const params = [barCode, updatedAt, id];

    try {
      await executeQuery(query, params);
      return {id, barCode, updatedAt};
    } catch (error) {
      console.error('Failed to update history:', error);
      return null;
    }
  },

  delete: async id => {
    const query = 'DELETE FROM history WHERE id = ?';
    const params = [id];

    try {
      await executeQuery(query, params);
      return true;
    } catch (error) {
      console.error('Failed to delete history:', error);
      return false;
    }
  },
};

export default HistoryModel;
