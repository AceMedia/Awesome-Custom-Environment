/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/ColorOptionsApp.js":
/*!*******************************************!*\
  !*** ./src/components/ColorOptionsApp.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




const ColorOptionsApp = () => {
  const [palettes, setPalettes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [message, setMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/wp/v2/color-options'
    }).then(data => {
      if (data && data.palettes) {
        // Add 'isOpen' property to each palette to manage the collapse state
        setPalettes(data.palettes.map(palette => ({
          ...palette,
          isOpen: false
        })));
      }
    }).catch(error => console.error('Error loading palettes:', error));
  }, []);
  const addPalette = () => {
    const newPalette = {
      id: Date.now(),
      name: '',
      colors: Array.from({
        length: 5
      }, () => ({
        id: Date.now() + Math.random(),
        color: '#000000'
      })),
      isOpen: true // New palettes are open by default
    };
    setPalettes([...palettes.map(p => ({
      ...p,
      isOpen: false
    })), newPalette]);
  };
  const togglePaletteOpen = paletteId => {
    setPalettes(palettes.map(palette => palette.id === paletteId ? {
      ...palette,
      isOpen: !palette.isOpen
    } : {
      ...palette,
      isOpen: false
    } // Collapse all others
    ));
  };
  const updatePaletteName = (paletteId, name) => {
    setPalettes(palettes.map(palette => palette.id === paletteId ? {
      ...palette,
      name
    } : palette));
  };
  const updateColor = (paletteId, colorId, value) => {
    setPalettes(palettes.map(palette => {
      if (palette.id === paletteId) {
        return {
          ...palette,
          colors: palette.colors.map(color => color.id === colorId ? {
            ...color,
            color: value
          } : color)
        };
      }
      return palette;
    }));
  };
  const removePalette = paletteId => {
    setPalettes(palettes.filter(palette => palette.id !== paletteId));
  };
  const savePalettes = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/wp/v2/color-options',
      method: 'POST',
      data: {
        palettes
      }
    }).then(() => {
      setMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Palettes saved successfully!', 'custom-admin-color-options'));
    }).catch(error => {
      console.error('Error saving palettes:', error);
      setMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error saving palettes.', 'custom-admin-color-options'));
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "color-options-app"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage Color Palettes', 'custom-admin-color-options')), message && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: "info",
    isDismissible: true
  }, message), palettes.map(palette => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, {
    key: palette.id,
    className: "color-palette-card"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, {
    onClick: () => togglePaletteOpen(palette.id),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Palette Name', 'custom-admin-color-options'),
    value: palette.name,
    onChange: value => updatePaletteName(palette.id, value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter palette name...', 'custom-admin-color-options')
  })), palette.isOpen && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, null, /*#__PURE__*/React.createElement("div", {
    className: "color-palette-container",
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, palette.colors.map(color => /*#__PURE__*/React.createElement("div", {
    key: color.id,
    style: {
      flex: '1',
      minWidth: '80px'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    value: color.color,
    onChange: value => updateColor(palette.id, color.id, value),
    disableCustomColors: false
  })))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
    icon: "trash",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove Palette', 'custom-admin-color-options'),
    onClick: () => removePalette(palette.id),
    className: "remove-palette-btn"
  }))))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isPrimary: true,
    onClick: addPalette
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add New Palette', 'custom-admin-color-options'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSecondary: true,
    onClick: savePalettes
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Palettes', 'custom-admin-color-options'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorOptionsApp);

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ColorOptionsApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ColorOptionsApp */ "./src/components/ColorOptionsApp.js");
// /src/index.js


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bolt-color-options-app');
  if (container) (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/React.createElement(_components_ColorOptionsApp__WEBPACK_IMPORTED_MODULE_1__["default"], null), container);
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map