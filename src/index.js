import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Users from './components/users';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Users />
	</React.StrictMode>
);

reportWebVitals();
