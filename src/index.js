// /src/index.js
import { render } from '@wordpress/element';
import ColorOptionsApp from './components/ColorOptionsApp';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bolt-color-options-app');
    if (container) render(<ColorOptionsApp />, container);
});
