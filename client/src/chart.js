import React from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';

const Chart = (props) => {
    var dataArr = props.data.filter((r) => { return r.type === "CO2 emissions (kt)"; })
        .map(r => {
            return { x: parseInt(r.year), y: parseInt(r.value) };
        });

    if (props.perCapita) {
        const popArr = props.data.filter((r) => { return r.type === "Population, total" });
        let copy = dataArr;
        for (var i = 0; i < dataArr.length; i++) {
            copy[i] = { x: dataArr[i].x, y: dataArr[i].y / popArr[i].value };
        }
        dataArr = copy;
    }

    return (
        <XYPlot
            margin={{ left: 100, right: 100, top: 70 }}
            width={600}
            height={450}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Year" />
            <YAxis title="CO2 emissions (kt)" />
            <LineSeries
                data={dataArr}
                style={{ stroke: "black", strokeWidth: 1 }}
            />
        </XYPlot>
    );
}
export default Chart;