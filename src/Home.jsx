import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


export class Home extends Component {
    render() {
        const { data } = this.props

        const currentlyInfected = (data.reportedCases) * 10;
        const sevCurrentlyInfected = (data.reportedCases) * 50;

        if (data.periodType === 'weeks') {
            data.timeToElapse *= 7;
        }

        if (data.periodType === 'months') {
            data.timeToElapse *= 30;
        }
        if (data.periodType === 'days') {
            data.timeToElapse *= 1
        }
        const time = data.timeToElapse
        const powerFactor = Math.trunc(data.timeToElapse / 3);

        const infectionsByRequestedTime = Math.trunc(currentlyInfected * (2 ** powerFactor));
        const sevInfectionsByRequestedTime = Math.trunc(sevCurrentlyInfected * (2 ** powerFactor));

        const severeCasesByRequestedTime = Math.trunc(0.15 * currentlyInfected * (2 ** powerFactor));
        const sevSvereCasesByRequestedTime = Math.trunc(0.15 * currentlyInfected * (2 ** powerFactor));

        const bedAvailabilityInHospitals = 0.35 * data.totalHospitalBeds;

        const hospitalBedsByRequestedTime = Math.trunc(bedAvailabilityInHospitals - severeCasesByRequestedTime);
        const sevHospitalBedsByRequestedTime = Math.trunc(bedAvailabilityInHospitals - sevSvereCasesByRequestedTime);

        const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
        const sevCasesForICUByRequestedTime = Math.trunc(0.05 * sevInfectionsByRequestedTime);

        const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
        const seVcasesForVentilatorsByRequestedTime = Math.trunc(0.02 * sevInfectionsByRequestedTime);

        const dollarsInFlight = Math.trunc((
            infectionsByRequestedTime * data.avgDailyIncomePopulation * data.avgDailyIncomeInUSD) / time);
        const seVdollarsInFlight = Math.trunc((
            sevInfectionsByRequestedTime * data.avgDailyIncomePopulation * data.avgDailyIncomeInUSD) / time);

        const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 })


        const result = (
            <div>
                <div className="row">
                    <table className='table tableCus'>
                        <thead>
                            <tr>
                                <th>Population</th>
                                <th>Time to Elapse</th>
                                <th>Reported Cases</th>
                                <th>Hospital Beds</th>
                                <th>Period Type</th>
                                <th>Region Name</th>
                                <th>Avg Daily Income(USD)</th>
                                <th>Avg Daily Income Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formatter.format(data.population)}</td>
                                <td>{data.timeToElapse}</td>
                                <td>{formatter.format(data.reportedCases)}</td>
                                <td>{formatter.format(data.totalHospitalBeds)}</td>
                                <td>{formatter.format(data.periodType)}</td>
                                <td>{data.regionName}</td>
                                <td>{data.avgDailyIncomeInUSD}</td>
                                <td>{data.avgDailyIncomePopulation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row rowC">
                    <div className="left">
                        <div className="ctn">
                            <h2 className='text-center'>Normal Impact</h2>
                            <div className="row">
                                <table className='table table-striped'>
                                    <tbody>
                                        <tr>
                                            <td>Currently Infected</td>
                                            <td>{formatter.format(currentlyInfected)}</td>
                                        </tr>
                                        <tr>
                                            <td>Infections By Requested Time</td>
                                            <td>{formatter.format(infectionsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Severe Cases By Requested Time</td>
                                            <td>{formatter.format(severeCasesByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Hospital Beds By Requested Time</td>
                                            <td>{formatter.format(hospitalBedsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Cases For ICU By Requested Time</td>
                                            <td>{formatter.format(casesForICUByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Cases For Ventilators By Requested Time</td>
                                            <td>{formatter.format(casesForVentilatorsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Dollars In Flight</td>
                                            <td>${formatter.format(dollarsInFlight)}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="ctn">
                            <h2 className='text-center'>Severe Impact</h2>
                            <div className="row">
                                <table className='table table-striped'>
                                    <tbody>
                                        <tr>
                                            <td>Currently Infected</td>
                                            <td>{formatter.format(sevCurrentlyInfected)}</td>
                                        </tr>
                                        <tr>
                                            <td>Infections By Requested Time</td>
                                            <td>{formatter.format(sevInfectionsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Severe Cases By Requested Time</td>
                                            <td>{formatter.format(sevSvereCasesByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Hospital Beds By Requested Time</td>
                                            <td>{formatter.format(sevHospitalBedsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Cases For ICU By Requested Time</td>
                                            <td>{formatter.format(sevCasesForICUByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Cases For Ventilators By Requested Time</td>
                                            <td>{formatter.format(seVcasesForVentilatorsByRequestedTime)}</td>
                                        </tr>
                                        <tr>
                                            <td>Dollars In Flight</td>
                                            <td>${formatter.format(seVdollarsInFlight)}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
        return (
            <div className='container'>
                <div className="row">
                    <div className='homeBtn' >
                        <Link to='/form' >
                            <button className='btnCus' >
                                Click to Estmate Impact
                    </button>
                        </Link>
                    </div>
                </div>
                <div>
                    {/* {result} */}
                    {(data.population && data.timeToElapse && data.reportedCases && data.totalHospitalBeds && data.periodType) ? result : null}
                </div>
            </div>
        )
    }
}
const mstp = state => {
    return {
        data: state
    }
}
export default connect(mstp)(Home)
