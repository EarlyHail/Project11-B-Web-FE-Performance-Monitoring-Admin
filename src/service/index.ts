import axios from '../utils/apiAxios';
import issueService from './issueService';
import statsService from './statsService';
import projectsService from './projectsService';

export default (() => {
  return {
    ...issueService(axios),
    ...statsService(axios),
    ...projectsService(axios),
  };
})();
