import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


// Bootstrap react Navbar tutorial: https://react-bootstrap.netlify.app/docs/components/navbar#deets
// Bootstrap react Dropdown: https://react-bootstrap.netlify.app/docs/components/dropdowns/
// Bootstrap dropdown: https://getbootstrap.com/docs/5.3/components/dropdowns/
// Bootstrap icons: https://icons.getbootstrap.com/

const AdminNav: React.FC = () => {

  const mIcon = <>
    <i className="bi bi-gear"></i> Manager
  </>

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
        <div className="container-xl">
          <a className="navbar-brand" href="#">Flexdrive Admin System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample07XL">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownNodes" data-bs-toggle="dropdown" data-toggle="dropdown" data-hover="dropdown" aria-expanded="false"><i className="bi bi-diagram-2-fill"></i> Nodes</a>
                <ul className="dropdown-menu" aria-labelledby="dropdownNodes">
                  <li><a className="dropdown-item" href="/nodeList">Node Management</a></li>
                  <li><a className="dropdown-item" href="/fileList">File Management</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownCustomers" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-people-fill"></i> Customers</a>
                <ul className="dropdown-menu" aria-labelledby="dropdownCustomers">
                  <li><a className="dropdown-item" href="/userList">Gustomer List</a></li>
                  <li><a className="dropdown-item" href="/userLevelList">Customer Level Management</a></li>
                  <li><a className="dropdown-item" href="/orderList">Order Management</a></li>
                  <li><a className="dropdown-item" href="/shareList">Share Management</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownSystem" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear-fill"></i> System</a>
                <ul className="dropdown-menu" aria-labelledby="dropdownSystem">
                  <li><a className="dropdown-item" href="/adminAccount">Admin Account</a></li>
                  <li><a className="dropdown-item" href="/roleAndPermissions">Role & Permisstions</a></li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="bi bi-box-arrow-in-right"></i> Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/"> Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="bi bi-box-arrow-right"></i> Logout</a>
              </li>
            </ul>
            {/* <form>
              <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;