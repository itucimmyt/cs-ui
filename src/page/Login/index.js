import { connect } from 'react-redux'
import LoginView from './loginview'
/*
You can import some functions from your redux module for add functionality to you container
for example:
import { Function } from '../../redux/modules/<ReduxModule>'
*/
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    //name: state.reduxState.propertyName,
  }),
  //Here goes functions that you want to inyect into container
  //{ Funcion },
)(LoginView)
