import React from "react";
import NavbarLayout from "../components/SideBar";
import NetEarned from "../components/NetEarned";
import TotalInvested from "../components/TotalInvested";
import AssetDetails from "../components/AssetDetails";
import AccountBalances from "../components/AccountBalances";
import PortfolioDiversity from "../components/PortfolioDiversity";
import InvestmentGoals from "../components/InvestmentGoals";

const Finances = () => {
    return (
      <>
        <NavbarLayout />
        <div className="pt-5 ml-1 md:ml-[2px] max-w-full overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-9 md:gap-18 md:row-gap-5 p-2.5 mx-auto">
            <h1 className="col-start-1 md:col-start-2 md:col-span-4 font-bold text-[#1ADBA9] text-xl md:text-3xl">Finances</h1>
            <div className="flex flex-col md:flex-row md:col-start-2 md:col-span-2 justify-start gap-7"><TotalInvested /><NetEarned /></div>
            <div className="md:col-start-2 md:col-span-2 md:row-start-3 w-full md:w-"><AssetDetails /></div>
            <div className="md:col-start-4 md:col-span-2 md:row-start-2 md:row-span-2 w-full "><PortfolioDiversity /></div>
            <div className="md:col-start-4 md:col-span-2 md:row-start-4 w-full "><AccountBalances /></div>
            <div className="md:col-start-2 md:col-span-2 md:row-start-4 w-full "><InvestmentGoals /></div>
          </div>
        </div>
      </>
    );
}


export default Finances;