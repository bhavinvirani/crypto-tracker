import axios from "axios";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import Coininfo from "../components/Coininfo";
import { numberWithCommas } from "../components/Banner/Carousel";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyle = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid gray",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
      wordSpacing: "1px",

    },
    coinData: {
      alignSelf: "start",
      padding: 18,
      paddingTop: 10,
      width: "100%",

      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const classes = useStyle();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#D65A31" }} />;

  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="160"
          style={{ marginBottom: 20 }}
        />
        <Typography component="h2" variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          <div
            dangerouslySetInnerHTML={{
              __html: coin?.description.en.split(". ")[0],
            }}
          />
        </Typography>

        <div className={classes.coinData}>
          {/* Rank */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{color: "lightGray"}}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          {/* Current Price */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{color: "lightGray"}}>
              {symbol}
              {" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          {/* Market Cap */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{color: "lightGray"}}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      
      {/* chart */}
      <Coininfo coin={coin} />
    </div>
  );
};

export default Coinpage;
