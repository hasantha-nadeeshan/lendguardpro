import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
    return(
        <div className="container-fluid">
    <div className="row justify-content-center mt-3">
        <div className="col-md-4 text-center" style={{ backgroundColor: 'purple', padding: '8px', borderRadius: '10px', paddingTop: '10px' }}>
            <p className="lead" style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}>LendGuard Pro</p>
        </div>
        <Outlet />
    </div>
</div>

    )
}

export default Layout