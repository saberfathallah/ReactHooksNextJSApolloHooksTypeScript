module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./graphql/users/mutations/createUserMutation.js":
/*!*******************************************************!*\
  !*** ./graphql/users/mutations/createUserMutation.js ***!
  \*******************************************************/
/*! exports provided: updateCacheAfterCreateUser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCacheAfterCreateUser", function() { return updateCacheAfterCreateUser; });
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-boost */ "apollo-boost");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_boost__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../queries/usersQuery */ "./graphql/users/queries/usersQuery.js");


const CREATE_USER = apollo_boost__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation createUsere($userInput: UserInput) {
    createUser(userInput: $userInput) {
      user {
        email
        name
        password
      }
      error
    }
  }
`;
const updateCacheAfterCreateUser = (cache, {
  data
}) => {
  const existingUsers = cache.readQuery({
    query: _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__["default"]
  });
  cache.writeQuery({
    query: _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__["default"],
    data: {
      users: {
        users: [...existingUsers.users.users, data.createUser.user]
      }
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (CREATE_USER);

/***/ }),

/***/ "./graphql/users/mutations/deleteUserMutation.js":
/*!*******************************************************!*\
  !*** ./graphql/users/mutations/deleteUserMutation.js ***!
  \*******************************************************/
/*! exports provided: updateCacheAfterDeleteUser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCacheAfterDeleteUser", function() { return updateCacheAfterDeleteUser; });
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-boost */ "apollo-boost");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_boost__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../queries/usersQuery */ "./graphql/users/queries/usersQuery.js");


const DELETE_USER = apollo_boost__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  mutation deleteUser($email: String) {
    deleteUser(email: $email) {
      user {
        email
        name
        password
      }
      error
    }
  }
`;
const updateCacheAfterDeleteUser = (cache, {
  data
}) => {
  const existingUsers = cache.readQuery({
    query: _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__["default"]
  });
  cache.writeQuery({
    query: _queries_usersQuery__WEBPACK_IMPORTED_MODULE_1__["default"],
    data: {
      users: {
        users: existingUsers.users.users.filter(user => user.email !== data.deleteUser.user.email)
      }
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (DELETE_USER);

/***/ }),

/***/ "./graphql/users/queries/usersQuery.js":
/*!*********************************************!*\
  !*** ./graphql/users/queries/usersQuery.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-boost */ "apollo-boost");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_boost__WEBPACK_IMPORTED_MODULE_0__);

const USERS = apollo_boost__WEBPACK_IMPORTED_MODULE_0__["gql"]`
  {
    users {
      users {
        name
        password
        email
      }
    }
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (USERS);

/***/ }),

/***/ "./pages/users.jsx":
/*!*************************!*\
  !*** ./pages/users.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphql_users_queries_usersQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @graphql/users/queries/usersQuery */ "./graphql/users/queries/usersQuery.js");
/* harmony import */ var _graphql_users_mutations_createUserMutation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @graphql/users/mutations/createUserMutation */ "./graphql/users/mutations/createUserMutation.js");
/* harmony import */ var _graphql_users_mutations_deleteUserMutation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @graphql/users/mutations/deleteUserMutation */ "./graphql/users/mutations/deleteUserMutation.js");
var _jsxFileName = "/Users/mac/Desktop/trainig/ReactHooksNextJSApolloHooksTrainig/src/pages/users.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Users = () => {
  const {
    data,
    loading
  } = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useQuery"])(_graphql_users_queries_usersQuery__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const [createUser, {
    data: responseUser
  }] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useMutation"])(_graphql_users_mutations_createUserMutation__WEBPACK_IMPORTED_MODULE_4__["default"], {
    update: _graphql_users_mutations_createUserMutation__WEBPACK_IMPORTED_MODULE_4__["updateCacheAfterCreateUser"]
  });
  const [deleteUser] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__["useMutation"])(_graphql_users_mutations_deleteUserMutation__WEBPACK_IMPORTED_MODULE_5__["default"], {
    update: _graphql_users_mutations_deleteUserMutation__WEBPACK_IMPORTED_MODULE_5__["updateCacheAfterDeleteUser"]
  });
  if (loading) return __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }, "loading...");
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, data.users.users.map(user => __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, __jsx("p", {
    key: user.email,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, user.name), __jsx("button", {
    onClick: () => deleteUser({
      variables: {
        email: user.email
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, "delete user"))), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, "users"), __jsx(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    validate: values => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password) {
        errors.password = 'Required';
      } else if (!values.name) {
        errors.name = 'Required';
      }

      return errors;
    },
    onSubmit: async (values, {
      setSubmitting
    }) => {
      await createUser({
        variables: {
          userInput: _objectSpread({}, values)
        }
      });
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  }) => __jsx("form", {
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: undefined
  }, __jsx("input", {
    type: "email",
    name: "email",
    onChange: handleChange,
    onBlur: handleBlur,
    value: values.email,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: undefined
  }), errors.email && touched.email && errors.email, __jsx("input", {
    type: "password",
    name: "password",
    onChange: handleChange,
    onBlur: handleBlur,
    value: values.password,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: undefined
  }), errors.password && touched.password && errors.password, __jsx("input", {
    type: "text",
    name: "name",
    onChange: handleChange,
    onBlur: handleBlur,
    value: values.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }), errors.name && touched.name && errors.name, __jsx("button", {
    type: "submit",
    disabled: isSubmitting,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: undefined
  }, "Submit")))));
};

/* harmony default export */ __webpack_exports__["default"] = (Users);

/***/ }),

/***/ 5:
/*!*******************************!*\
  !*** multi ./pages/users.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mac/Desktop/trainig/ReactHooksNextJSApolloHooksTrainig/src/pages/users.jsx */"./pages/users.jsx");


/***/ }),

/***/ "@apollo/react-hooks":
/*!**************************************!*\
  !*** external "@apollo/react-hooks" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ "apollo-boost":
/*!*******************************!*\
  !*** external "apollo-boost" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-boost");

/***/ }),

/***/ "formik":
/*!*************************!*\
  !*** external "formik" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("formik");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=users.js.map