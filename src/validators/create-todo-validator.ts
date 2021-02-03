import lodash from 'lodash';
import { check, ValidationChain } from 'express-validator';
import { AppContext } from '@typings';

const createTodoValidator = (appContext: AppContext): ValidationChain[] => [
  check('title', 'VALIDATION_ERRORS.INVALID_TITLE').isString().notEmpty(),
];

const deleteTodoValidator = (appContext: AppContext): ValidationChain[] => [
  check('id', 'VALIDATION_ERRORS.INVALID_ID').isString().notEmpty(),
];

export default createTodoValidator;
