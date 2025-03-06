import React, { useState } from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const Body = () => {
  const [file, setFile] = useState(null);
  const [csvPath, setCsvPath] = useState(null);
  const [showsantabutton, setshowsantabutton] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
    });
  };

  // Upload CSV file
  const uploadCSV = async () => {
    if (!file) {
      openNotification('warning', 'Upload Error', 'Please select a file.');
      return;
    }

    let formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/employees/upload', formData);
      openNotification('success', 'Success', 'CSV uploaded successfully!');
      setshowsantabutton(true);
    } catch {
      openNotification('error', 'Upload Failed', 'An error occurred while uploading.');
    }
  };

  const getAssignments = async () => {
    try {
      let { data } = await axios.get('http://localhost:5000/api/secretsanta/assign');
      setCsvPath(data.csvPath);
      openNotification('success', 'Success', 'Assignments generated! Click Download CSV.');
    } catch {
      openNotification('error', 'Generation Failed', 'An error occurred while generating assignments.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>
        Secret <span className='spantext'>Santa</span>
      </h1>
      <div className='santaimage'>
        <img src='src/assets/santa.jpg' alt='santa' height={200} width={200} />
      </div>  

      <input type='file' accept='.csv' onChange={(e) => setFile(e.target.files[0])} style={{ height: '40px' }} />
      <Button onClick={uploadCSV} className='button'>
        Upload CSV
      </Button>
      {showsantabutton && (
        <Button onClick={getAssignments} className='button'>
          Generate Secret Santa
        </Button>
      )}
      {contextHolder}
      {csvPath && (
        <div style={{ marginTop: '20px' }}>
          <a href='http://localhost:5000/api/secretsanta/download' download='Secret_Santa.csv'>
            <Button type='primary' className='button'>
              Download Secret Santa
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Body;
