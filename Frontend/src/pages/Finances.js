import React from "react";
import NavbarLayout from "../components/SideBar";
import styles from './Finances.module.css';
import NetEarned from "../components/NetEarned";
import TotalInvested from "../components/TotalInvested";
import AssetDetails from "../components/AssetDetails";
import AccountBalances from "../components/AccountBalances";
import PortfolioDiversity from "../components/PortfolioDiversity";
import InvestmentGoals from "../components/InvestmentGoals";

const Finances = () => {
    return (
      <>
        <NavbarLayout></NavbarLayout>
        <body className={styles.finances}>
          <div className={styles.parent}>
          <div className={styles.div2}> <h1>Finances</h1> </div>
            <div className={styles.div3}> <TotalInvested/> <NetEarned/> </div>
            <div className={styles.div8}> <AssetDetails/> </div>
            <div className={styles.div7}> <PortfolioDiversity/> </div>
            <div className={styles.div6}> <AccountBalances/> </div>
            <div className={styles.div5}> <InvestmentGoals/> </div>
          </div>
        </body>
      </>
    );
  }
  

export default Finances;