import React from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import "../styles/chart.scss";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    getData() {
        var dataArr = this.props.data.filter((r) => { return r.type === "CO2 emissions (kt)"; })
            .map(r => {
                return { x: r.year, y: parseInt(r.value) };
            });
        if (this.props.perCapita) {
            const popArr = this.props.data.filter((r) => { return r.type === "Population, total" });
            let copy = dataArr;
            for (var i = 0; i < dataArr.length; i++) {
                copy[i] = { x: dataArr[i].x, y: dataArr[i].y / popArr[i].value };
            }
            dataArr = copy;
        }
    }

    render() {
        const name = (!this.props.data[0]) ? "" : this.props.data[0].name.charAt(0).toUpperCase() + this.props.data[0].name.slice(1);
        var dataArr = this.props.data.filter((r) => { return r.type === "CO2 emissions (kt)"; })
            .map(r => {
                return { x: r.year, y: parseInt(r.value) };
            });
        if (this.props.perCapita) {
            const popArr = this.props.data.filter((r) => { return r.type === "Population, total" });
            let copy = dataArr;
            for (var i = 0; i < dataArr.length; i++) {
                copy[i] = { x: dataArr[i].x, y: dataArr[i].y / popArr[i].value };
            }
            dataArr = copy;
        }
        return (
            <div className="chart-container" >
                <div className="chart" >
                    <h3 className="chart-title" >{name}</h3>
                    <XYPlot
                        margin={{ left: 80, right: 80, top: 30 }}
                        width={700}
                        height={450} >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Year" />
                        <YAxis title="CO2 emissions (kt)" />
                        <LineSeries
                            data={dataArr}
                            style={{ stroke: "black", strokeWidth: 1 }}
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}