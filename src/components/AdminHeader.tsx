import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


// Bootstrap react Navbar tutorial: https://react-bootstrap.netlify.app/docs/components/navbar#deets
// Bootstrap react Dropdown: https://react-bootstrap.netlify.app/docs/components/dropdowns/
// Bootstrap dropdown: https://getbootstrap.com/docs/5.3/components/dropdowns/
// Bootstrap icons: https://icons.getbootstrap.com/

const AdminHeader: React.FC = () => {

  const mIcon = <>
    <i className="bi bi-gear"></i> Manager
  </>

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Flexdrive Admin System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link"><i className="bi bi-gear"></i> Link1</Nav.Link>
              <NavDropdown title={mIcon} id="basic-nav-dropdown1">
                
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home2</Nav.Link>
              <Nav.Link href="#link">Link2</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown2">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;