import Head from "next/head";
import Container from "react-bootstrap/Container";
import AppGuides from "@/components/AppGuides";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/AdminHeader";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { error } from "console";

import PageHelper from '@/components/PageHelper';
import AdminNav from "@/components/AdminNav";

// const queryClient = new QueryClient();

export default function Nodelist() {

  const [page, setPage] = useState(1); // for pagination
  const [total, setTotal] = useState(0);
  const perPage = 10;
  const pageCount = Math.ceil(total/perPage)?Math.ceil(total/perPage):1;
  const [nodeListData, setNodeListData] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeStatus, setNodeStatus] = useState(-1);
  const [nodeLastRegistered, setNodeLastRegistered] = useState(-1);
  const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    fetchNodeList(page, perPage);
  }, []);

  const fetchNodeList = async (page: number, perPage: number) => {
    const url = `http://127.0.0.1:10010/admapi/node/list`;
    const postData = {
      'name': nodeName,
      'status': nodeStatus,
      'lastActive': nodeLastRegistered * 60,
      'page': page,
      'pagesize': perPage,
    };
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'API-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTcwNDUwMzEwMCJ9.bUXrqlMau9-bWPjYZiiTsBttca8cPWX4seAhC5Ac69A',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.LoginInfo) {
          setLoginInfo(data.LoginInfo);
        }
        setNodeListData(data);
      })
      .catch(error => console.log(error));
  }

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleSearch = () => {
    fetchNodeList(page, perPage);
  }

  return (
    <>
      <Head>
        <title>Node List - Flexdrive Admin System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AdminNav loginInfo={loginInfo}/>

      <Container as="main" className="py-0 px-3 mx-auto">
        <Container fluid className="px-0 py-3">
          <nav aria-label="breadcrumb" className="bg-light bg-gradient">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/nodeList">Node</a></li>
              <li className="breadcrumb-item active" aria-current="page">List</li>
            </ol>
          </nav>
        </Container>

        {/* search box here         */}
        <Container fluid className="px-4">
          <div className="row">
            <div className="col">
              <label htmlFor="inputNodeName" className="form-label">Node Name</label>
              <input type="text" className="form-control" name="nodeName" id="inputNodeName" aria-describedby="nodeNameHelp" value={nodeName} onChange={(value: any)=>{setNodeName(value.target.value)}}/>
              <div id="nodeNameHelp" className="form-text">It should be a hex string with length of 32.</div>
            </div>
            <div className="col">
              <label htmlFor="inputStatus" className="form-label">Status</label>
              <select className="form-select" name="status" id="inputStatus" value={nodeStatus} onChange={(event)=>{setNodeStatus(Number(event.target.value))}}>
                <option value="-1">All</option>
                <option value="1">Normal</option>
                <option value="99">Invalid</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="inputLastRegistered" className="form-label">Last Registered</label>
              <select className="form-select" name="lastRegistered" id="inputLastRegistered" value={nodeLastRegistered} onChange={(event)=>{setNodeLastRegistered(event.target.value)}}>
                <option value="-1">All</option>
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
              <button type="button" className="btn btn-primary" id="btnSearch" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </Container>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="table-primary">
              <th>Node Name</th>
              <th>Node Addr</th>
              <th>Cluster</th>
              <th>Created</th>
              <th>Reg Time</th>
              <th>Space</th>
              <th>Status</th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {nodeListData ? (nodeListData.result ? nodeListData.result.list.map((item) => (
              //查到数据
              <tr key={item.NodeName}>
                <td>{item.NodeName}</td>
                <td>{item.NodeAddr}</td>
                <td>{item.ClusterId}</td>
                <td>{item.Created}</td>
                <td>{item.LastRegistered}</td>
                <td>{item.UsedSpaceDesc}/{item.TotalSpaceDesc}</td>
                <td>
                  {item.Status == 1 ? <span className="text-success">Normal</span>:<span className="text-warning">Invalid</span>}
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={handleShowEdit}>Edit</Button>{' '}
                  <Button variant="info" size="sm" onClick={handleShowUpdate}>Update</Button>{' '}
                </td>
              </tr>
            )):(
              //没有数据
              <tr><td colSpan={12}>No data found.</td></tr>
            )):(
              <tr><td colSpan={12}>No data found.</td></tr>
            )}
          </tbody>
        </table>

        {/* <span className="badge text-bg-secondary"></span> */}
        <Container fluid>
          <Row>
            <Col className="d-flex justify-content-start">
              <ul className="pagination">
                <li className="page-item disabled">
                  {nodeListData && nodeListData.result && nodeListData.result.list.length > 0 ?
                    <a className="page-link" tabIndex={-1} aria-disabled="true">Found Results: {nodeListData.result.total}</a>
                    :
                    <a className="page-link" tabIndex={-1} aria-disabled="true">No results found.</a>
                  }
                </li>
              </ul>
              {/* <Pagination>
                <Pagination.Item disabled>Found Results: 410</Pagination.Item>
              </Pagination> */}
            </Col>

            <Col className="d-flex justify-content-end">
              {nodeListData && nodeListData.result && nodeListData.result.list.length > 0 ?
              <PageHelper allPage={Math.ceil(nodeListData.result.total/nodeListData.result.pagesize)} currentPage={nodeListData.result.page} handleSearch={(page: number)=>{
                fetchNodeList(page, perPage);
              }} loading={false} />
              : null}

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
