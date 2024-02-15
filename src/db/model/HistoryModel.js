import {db, executeQuery} from '../../db/utils/DataBase';
import {getCurrentDateTime} from '../../utilies/DateUtils';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const HistoryModel = {
  create: async barCode => {
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;
    console.log('33333333333333333333333', barCode);
    const param = {
      body: barCode,
    };
    try {
      const response = await axios.post('/api/qrcode/scan', param);
      // const res = await fetch('http://192.168.105.59:3311/api/qrcode/scan', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(barCode),
      // });
      console.log('3434343434343434', response);
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
    } catch (error) {
      console.error('Failed to Connect API:', JSON.stringify(error));
      return;
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
