import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
const { ethers } = require("ethers");

function HomePage() {
  const [blocksData, setBlocksData] = useState([]);
  const [network, setNetwork] = useState("MAINNET");
  const [loading, setLoading] = useState(true);

  const getLatestBlocks = async () => {
    try {
      let string = "REACT_APP_" + network + "_URL";
      let api_url = process.env[string];

      let blockArray = [];
      const provider = new ethers.providers.JsonRpcProvider(api_url);
      const blockNumber = await provider.getBlockNumber();
      for (let i = 0; i < 10; i++) {
        blockArray.push(
          await provider.getBlockWithTransactions(blockNumber - i)
        );
      }
      setBlocksData(blockArray);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getLatestBlocks();
    const interval = setInterval(() => {
      getLatestBlocks();
    }, 10000);

    return () => clearInterval(interval);
  }, [network]);

  if (loading) {
    return <h2>Loading</h2>;
  } else {
    return (
      <div>
        <div class="d-flex justify-content-center">
          <h1 text-align="center"> Latest 10 blocks on {network}</h1>
        </div>
        <div class="d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {network}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setNetwork("MAINNET")}>
                Mainnet
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setNetwork("RINKBY")}>
                Rinbky
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setNetwork("ROPSTEN")}>
                Roptsen
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Table striped bordered hover>
          <thead
            width="200"
            tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            <tr>
              <th>Number</th>
              <th>Hash</th>
              <th>Nonce</th>
              <th>Gas Used</th>
              <th>Miner</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {blocksData.map((block) => {
              return (
                <tr>
                  <td style={{ fontSize: 12 }}>
                    <Link to={`/blockDetail/${network}/${block.number}`}>
                      {block.number}
                    </Link>
                  </td>
                  <td style={{ fontSize: 12 }}>{block.hash}</td>
                  <td style={{ fontSize: 12 }}>{block.nonce}</td>
                  <td style={{ fontSize: 12 }}>{Number(block.gasUsed)}</td>
                  <td style={{ fontSize: 12 }}>{block.miner}</td>
                  <td style={{ fontSize: 12 }}>{block.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default HomePage;
