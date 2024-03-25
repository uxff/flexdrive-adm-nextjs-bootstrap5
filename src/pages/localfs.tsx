import Head from "next/head";
import Container from "react-bootstrap/Container";
import AppGuides from "@/components/AppGuides";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/AdminHeader";
import ExampleComponents from "@/components/ExampleComponents";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import {
//   QueryClient,
//   QueryClientProvider,
// } from 'react-query';
// import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { error } from "console";

import PageHelper from '@/components/PageHelper';
import SimpleHeader from "@/components/SimpleHeader";

// const queryClient = new QueryClient();

export default function LocalFs() {

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 5;
  const pageCount = Math.ceil(total/perPage)?Math.ceil(total/perPage):1;
  const [nodeListData, setNodeListData] = useState(null);

  useEffect(() => {
    fetchNodeList(page, perPage);
  }, []);

  const fetchNodeList = async (page: number, perPage: number) => {
    const url = `http://127.0.0.1:10010/admapi/local/.?page=${page}&pagesize=${perPage}`;
    fetch(url, {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'API-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDUwMzEwMCJ9.bUXrqlMau9-bWPjYZiiTsBttca8cPWX4seAhC5Ac69A',
      }})
      .then(res => res.json())
      .then(data => setNodeListData(data))
      .catch(error => console.log(error));
  }

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  return (
    <>
      <Head>
        <title>Bootstrap w/ React</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>
      </Head>
      <SimpleHeader />
      {/* <AdminHeader /> */}
      <Container as="main" className="py-0 px-3 mx-auto">


        {/* <Container fluid className="px-0 py-0">
          <Breadcrumb className=" bg-secondary bg-gradient bg-opacity-10" >
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/nodelist">Node</Breadcrumb.Item>
            <Breadcrumb.Item active>List</Breadcrumb.Item>
          </Breadcrumb>
        </Container> */}
        <Container fluid className="px-0 py-0">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Library</a></li>
            <li className="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
        </Container>



        {/* form here         */}

        <Container fluid className="px-4">

          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="inputNodeName" className="form-label">Node Name</label>
                <input type="text" className="form-control" id="inputNodeName" aria-describedby="nodeNameHelp"/>
                <div id="nodeNameHelp" className="form-text">It should be a hex string with length of 32.</div>
              </div>
              <div className="col">
                <label htmlFor="inputStatus" className="form-label">Status</label>
                <select className="form-select" id="inputStatus">
                  <option value="-1" selected>All</option>
                  <option value="1">Normal</option>
                  <option value="99">Invalid</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="inputLastRegistered" className="form-label">Last Registered</label>
                <select className="form-select" id="inputLastRegistered">
                  <option value="-1" selected>All</option>
                  <option value="1">1 Minute</option>
                  <option value="5">5 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="1440">1 Day</option>
                </select>
              </div>
              {/* <div className="col">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div> */}
              <div className="col align-middle">
                <label className="form-label">&nbsp;</label><br/>
                <button type="submit" className="btn btn-primary" id="btnSearch">Search</button>
              </div>
            </div>
          </form>
        </Container>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Dir Path</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {nodeListData ? (nodeListData.result ? nodeListData.result.list.map((item) => (
              //查到数据
              <tr>
                <td>{item.is_dir ? <>
                  <a href="{item.url}">{item.dirpath}/</a>
                </> :item.name}</td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>
                  <Button variant="info" size="sm" onClick={handleShowEdit}>Edit</Button>{' '}
                  <Button variant="info" size="sm" onClick={handleShowUpdate}>Update</Button>{' '}
                </td>
              </tr>
            )):(
              //没有数据
              <tr><td colSpan={12}>No data found.</td></tr>
            )):(
              <tr><td>No data found.</td></tr>
            )}
          </tbody>
        </table>

        {/* <span className="badge text-bg-secondary"></span> */}
        <Container fluid>
          <Row>
            <Col className="d-flex justify-content-start">
              <Pagination>
                <Pagination.Item disabled>Found Results: 410</Pagination.Item>
              </Pagination>
            </Col>

            <Col className="d-flex justify-content-end">
              {nodeListData && nodeListData.result && nodeListData.result.list.length > 0 ? 
                
                <PageHelper allPage={Math.ceil(nodeListData.result.total/nodeListData.result.pagesize)} currentPage={nodeListData.result.page} handleSearch={(page: number)=>{
                  fetchNodeList(page, perPage);
                }} loading={false} />
              : <span>
                  No more page.
                </span>}

            </Col>
          </Row>
        </Container>


        <Footer />
      </Container>

      <Modal show={showEdit} onHide={handleCloseEdit} key="md-edit">
        <Modal.Header closeButton>
          <Modal.Title>Edit Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate} key="md-update">
        <Modal.Header closeButton>
          <Modal.Title>Update Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
