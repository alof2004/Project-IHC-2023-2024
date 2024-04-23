import LoginBox from "./LoginBox";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

function Login(){
    return (
        <div>
        <NavBar />
        <LoginBox />
        </div>
    );
}
export default Login;