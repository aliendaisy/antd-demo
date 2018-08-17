import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css'
import TableList from './component/table';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TableList />, document.getElementById('root'));
registerServiceWorker();
