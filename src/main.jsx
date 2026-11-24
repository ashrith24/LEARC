import { createRoot } from 'react-dom/client';
import { App } from './App';
import { installLinkInterceptor } from './router';
import './demos';
installLinkInterceptor();
createRoot(document.getElementById('root')).render(<App />);
