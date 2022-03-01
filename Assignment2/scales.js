export const Scales = {
    linear: (min_value, max_value, start_pos, end_pos) => {
        console.log('the linear scale for scatter plot/bar chart');
        return d3.scaleLinear()
            .domain([min_value, max_value])
            .range([start_pos, end_pos])
            .nice();
    },
    band: (stations, start_pos, end_pos) => {
        console.log('the x scale for the bar chart');
    }
}