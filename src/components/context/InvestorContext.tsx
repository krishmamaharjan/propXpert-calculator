"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";
import { deposit, stampDuty, lvr, grossYield, grossRent, annualHoldingCost, monthlyRepayment } from "../../utils/calculation";

type FormDataType = {
    streetAddress: string,
    state: string,
    postcode: string,
    propertyValue: string,
    weeklyRent: string,

    income: string,
    taxIncome: string,

    loanAmount: string,
    interestRate: string,
    loanTerm: string,

    loanType: 'IO' | 'PI',

    lmi: string,
    stampDutyLmi: string,

    inspection: string,
    conveyancingFees: string,
    miscellaneousCosts: string,
    transferFees: string,

    propertyManagementFee: string,
    lettingFee: string,  //dropdown ma hunxa 1.1 2.2
    vacancyWeeks: string,  //same 0-5
    maintenanceCosts: string,
    councilRates: string,
    waterRates: string,
    insurance: string,
    landTax: string,
}

type InvestorContextType = {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    depositValue: number;
    stampDutyValue: number;
    totalAcquisition: number;
    lvrValue: number;
    grossYieldValue: number;
    grossRentValue: number;
    annualHoldingCostValue: number;
    monthlyRepaymentValue: number;

}

const InvestorContext = createContext<InvestorContextType | undefined>(undefined)

export const useInvestor = () => {
    const context = useContext(InvestorContext);
    if (!context) throw new Error("useInvestor context Error");
    return context;
}

export const InvestorProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState({
        streetAddress: "usa",
        state: "nsw",
        postcode: "10000",
        propertyValue: "600000",
        weeklyRent: "520",

        income: "",
        taxIncome: "",

        

        loanAmount: "480000",
        interestRate: "6.25",
        loanTerm: "10",

        loanType: 'IO' as 'IO' | 'PI',

        lmi: "",
        stampDutyLmi: "",

        inspection: "700",
        conveyancingFees: "1800",
        transferFees: "5140",
        miscellaneousCosts: "0",

        propertyManagementFee: "7.7",
        lettingFee: "1.1",  //dropdown ma hunxa 1.1 2.2
        vacancyWeeks: "2",  //same 0-5
        maintenanceCosts: "1000",
        councilRates: "2800",
        waterRates: "1000",
        insurance: "1500",
        landTax: "0",

    });

    const toNumber = (v: string) => Number(v) || 0;

    const depositValue = deposit(toNumber(formData.propertyValue), toNumber(formData.loanAmount));
    const stampDutyValue = stampDuty(toNumber(formData.propertyValue));
    const lvrValue = lvr(Number(formData.propertyValue), Number(formData.loanAmount));
    const grossYieldValue = grossYield(Number(formData.weeklyRent), Number(formData.propertyValue));
    const grossRentValue = grossRent(Number(formData.weeklyRent));
    const annualHoldingCostValue = annualHoldingCost(grossRentValue, Number(formData.propertyManagementFee), Number(formData.weeklyRent), Number(formData.lettingFee), Number(formData.vacancyWeeks), Number(formData.maintenanceCosts), Number(formData.councilRates), Number(formData.waterRates), Number(formData.insurance), Number(formData.landTax));
    const monthlyRepaymentValue = monthlyRepayment(Number(formData.loanAmount), Number(formData.interestRate), Number(formData.loanTerm) )

    const totalAcquisition =
        depositValue +
        stampDutyValue +
        toNumber(formData.inspection) +
        toNumber(formData.conveyancingFees) +
        toNumber(formData.transferFees) +
        toNumber(formData.miscellaneousCosts);

    return (
        <InvestorContext.Provider
            value={{ formData, setFormData, depositValue, stampDutyValue, totalAcquisition, lvrValue, grossYieldValue, grossRentValue, annualHoldingCostValue, monthlyRepaymentValue }}
        >
            {children}
        </InvestorContext.Provider>
    );
};
