import { combineReducers } from 'redux';

import { toaster } from './toaster.reducer';
import { loader } from './loader.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { completeRegistration } from './complete-registration.reducer';

const rootReducer = combineReducers({
	toaster,
	loader,
	authentication,
	registration,
	completeRegistration,
});

export default rootReducer;
