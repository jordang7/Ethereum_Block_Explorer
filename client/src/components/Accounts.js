import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
const { ethers } = require("ethers");

function Accounts() {
  const [accountBalance, setAccountBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [onSubmit, setSubmit] = useState(false);
  const [network, setNetwork] = useState("MAINNET");
  const [error, setError] = useState(false);

  const getAddressBalance = async () => {
    try {
      setAccountBalance(0);
      let string = "REACT_APP_" + network + "_URL";
      let api_url = process.env[string];
      console.log(api_url);
      const provider = new ethers.providers.JsonRpcProvider(api_url);
      const balance = await provider.getBalance("0x" + address);
      console.log(balance);
      setAccountBalance(Number(balance));
      setSubmit(false);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  useEffect(() => {
    if (address) {
      getAddressBalance();
    }
  }, [onSubmit]);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 text-align="center"> {network}</h1>
      </div>
      <div className="d-flex justify-content-center">
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
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">0x</InputGroup.Text>
          <FormControl
            placeholder="Address"
            aria-label="Address"
            aria-describedby="basic-addon1"
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputGroup>
        <div className="text-center pb-3">
          <Button variant="primary" onClick={() => setSubmit(true)}>
            Get Balance
          </Button>
        </div>
      </Form>
      {error ? (
        <div className="d-flex justify-content-center">
          <p className="text-danger">Invalid Address</p>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p>Balance: {accountBalance}</p>
        </div>
      )}
    </div>
  );
}

export default Accounts;
