import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@material-ui/core";
const { ethers } = require("ethers");

let api_url = process.env.REACT_APP_ALCHEMY_URL;

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
});
const CurrentBlock = () => {
  const [blockData, setBlockData] = useState([]);
  const [blockNum, setBlockNumber] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const getCurrentBlock = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(api_url);
      const blockNumber = await provider.getBlockNumber();

      setBlockNumber(blockNumber);

      const block = await provider.getBlockWithTransactions(blockNumber);

      setBlockData(block);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCurrentBlock();
    const interval = setInterval(() => {
      getCurrentBlock();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    if (blockData) {
      return (
        <Card className={classes.card} variant="outlined">
          <CardHeader
            className={classes.titleHead}
            title={"Current Block: " + blockNum}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
              <dl>
                <p>
                  <dt className="title">Hash:</dt>
                  {blockData.hash ? <dd>{blockData.hash}</dd> : <dd>N/A</dd>}
                </p>
                <p>
                  <dt className="title">Nonce:</dt>
                  {blockData.hash ? <dd>{blockData.nonce}</dd> : <dd>N/A</dd>}
                </p>
                <p>
                  <dt className="title">Gas Limit:</dt>
                  {blockData.hash ? (
                    <dd>{Number(blockData.gasLimit)}</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
                <p>
                  <dt className="title">Gas Used:</dt>
                  {blockData.hash ? (
                    <dd>{Number(blockData.gasUsed)}</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
                <p>
                  <dt className="title">Miner: </dt>
                  {blockData.hash ? <dd>{blockData.miner}</dd> : <dd>N/A</dd>}
                </p>
                <p>
                  <dt className="title">Parent Hash: </dt>
                  {blockData.hash ? (
                    <dd>{blockData.parentHash}</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
                <p>
                  <dt className="title">TimeStamp </dt>
                  {blockData.timestamp ? (
                    <dd>{blockData.timestamp}</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
                <p>
                  <dt className="title">Transactions </dt>
                  {blockData.transactions ? (
                    <dd>{blockData.transactions.length} transactions</dd>
                  ) : (
                    <dd>N/A</dd>
                  )}
                </p>
              </dl>
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }
};

export default CurrentBlock;
