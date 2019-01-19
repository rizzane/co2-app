import React from "react";
import { makeVisFlexible, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import "../styles/chart.scss";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    getData() {
        if (!this.props.perCapita) {
            return (
                this.props.data.map(r => {
                    return { x: r.year, y: parseInt(r.value) };
                })
            );
        }
        return (
            this.props.data.map(r => {
                return { x: r.year, y: parseInt(r.value) / parseInt(r.population) };
            })
        );
    }

    render() {
        const dataArr = this.getData();
        const name = (!this.props.data[0]) ? "" : this.props.data[0].name.charAt(0).toUpperCase() + this.props.data[0].name.slice(1);
        const FlexibleXYPlot = makeVisFlexible(XYPlot);
        return (
            <div className="chart-container" >
                <h3 className="chart-title" >{name}</h3>
                <div className="chart" >
                    <FlexibleXYPlot
                        margin={{ left: 80, right: 20 }}
                        height={375}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Year" />
                        <YAxis title="CO2 emissions (kt)" />
                        <LineSeries
                            data={dataArr}
                            style={{ stroke: "black", strokeWidth: 1 }}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        );
    }
}