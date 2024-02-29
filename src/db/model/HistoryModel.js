import axios from '../utils/axios';

// ----------------------------------------------------------------------

const HistoryModel = {
  create: async barCode => {
    const param = {
      body: barCode,
    };
    try {
      const response = await axios.post('/api/qrcode/scan', param);
      return response.data.result;
    } catch (error) {
      console.error('Failed to Connect API:', JSON.stringify(error));
      return;
    }
  },
};

export default HistoryModel;
