import React, { Component } from 'react'
import { connect } from 'react-redux'
import { estimateImpact } from './Redux/action'

export class Form extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            population: e.target.elements.population.value,
            timeToElapse: e.target.elements.timeToElapse.value,
            reportedCases: e.target.elements.reportedCases.value,
            totalHospitalBeds: e.target.elements.totalHospitalBeds.value,
            periodType: e.target.elements.periodType.value,
            avgDailyIncomeInUSD: e.target.elements.avgDailyIncomeInUSD.value,
            regionName: e.target.elements.regionName.value,
            avgDailyIncomePopulation: e.target.elements.avgDailyIncomePopulation.value
        }
        // console.log(data);
        this.props.estimateImpact(data)
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1 className='text-center inData'>Input Data</h1>
                <div className="form">
                    <form className="tc" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Population</label>
                                    <input type="number" className="form-control" placeholder="Population"
                                        name='population' required data-population='true' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Time To Elapse</label>
                                    <input type="number" className="form-control" placeholder="Time to Elapse"
                                        name='timeToElapse' required data-time-to-elapse='true' />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Reported Cases</label>
                                    <input type="number" className="form-control" placeholder="Reported Cases"
                                        name='reportedCases' required data-reported-cases='true' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Total Hospital Beds</label>
                                    <input type="number" className="form-control" placeholder="Total Hospital Beds"
                                        name='totalHospitalBeds' required data-total-hospital-beds='true' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Period Type</label>
                                    <select className="form-control" name='periodType' required data-period-type='true'>
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Region Name</label>
                                    <input type="text" className="form-control" placeholder="Region Name"
                                        name='regionName' required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Average Daily Income(USD)</label>
                                    <input type="number" className="form-control" placeholder="Average Daily Income"
                                        name='avgDailyIncomeInUSD' required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Average Daily Income Population</label>
                                    <input type="number" className="form-control" placeholder="Average Daily Income Population"
                                        name='avgDailyIncomePopulation' min='0.00' step='0.01' required />
                                </div>
                            </div>
                            <div className="btnCTN">
                                <button type="submit" className="btn btn-default btnC" data-go-estimate='true'>Get Estimate</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default connect(null, { estimateImpact })(Form)
