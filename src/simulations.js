import { List } from 'immutable';

const simulation = ({ Patient, iterations }) => (
  List([...Array(iterations)])
  .map(() => Patient.updateViruses()).toArray()
);

export default simulation;