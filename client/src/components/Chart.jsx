import React from "react";
import { makeVisFlexible, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import "../styles/chart.scss";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    getData() {
        const name = (!this.props.data[0]) ? "" : this.props.data[0].name.charAt(0).toUpperCase() + this.props.data[0].name.slice(1);
        if (!this.props.perCapita) {
            const data = this.props.data.map(r => {return { x: r.year, y: parseInt(r.value) };});
            return { data, name };
        }
        const data = this.props.data.map(r => {return { x: r.year, y: parseInt(r.value) / parseInt(r.population) };});
        return { data, name }
    }

    render() {
        const dataArr = this.getData();
        const FlexibleXYPlot = makeVisFlexible(XYPlot); // Makes chart mobile friendly
        // Sorts data in case it's in wrong order
        dataArr.data.sort((a, b) => {
            return a.x - b.x;
        })
        return (
            <div className="chart-container" >
                <h3 className="chart-title" >{dataArr.name}</h3>
                <div className="chart" >
                    <FlexibleXYPlot
                        margin={{ left: 70, right: 20 }}
                        height={370}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Year" tickFormat={v => parseInt(v)}/>
                        <YAxis title="CO2 emissions (kt)" />
                        <LineSeries
                            data={dataArr.data}
                            style={{ stroke: "black", strokeWidth: 1 }}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        );
    }
}