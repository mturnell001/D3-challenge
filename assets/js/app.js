// @TODO: YOUR CODE HERE!
d3.csv('assets/data/data.csv').then(data => {
    console.log(data)

    //collecting columns
    
    const smoking = data.map(state => {return +state.smokes});
    const age = data.map(state => {return +state.age});

    console.log(smoking);

    // svg container
    const svgHeight = 750, svgWidth = 1000;

    // margins
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // chart area minus margins
    const chartWidth = svgWidth - (margin.right + margin.left);
    const chartHeight = svgHeight - (margin.top + margin.bottom);

    // create svg container
    const svg = d3.select('#scatter').append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth);

    // add chart group and shift group over by the margins
    const chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
    console.log(d3.extent(smoking));
    const yScale = d3.scaleLinear([0, d3.max(smoking)],[chartHeight, 0]);

    // scale x to chart width    
    const xScale = d3.scaleLinear(d3.extent(age), [0, chartWidth]);

    // create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // set the axes
    chartGroup.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${chartHeight})`);
    chartGroup.append('g')
        .call(yAxis);

    // create g container for points
    const circle = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("g");

    //plot the circles
    circle.append("circle")
        .attr("cx", d => xScale(+d.age))
        .attr("cy", d => yScale(+d.smokes))
        .attr("r", 12)
        .attr("fill", "cyan")
        .attr("opacity", 0.9)
        .attr("stroke", "black")
        .attr("stroke-width", 0.25);
    
    //plot the state abbreviations on top of the circles
    circle.append("text")
        .text(d => d.abbr)
        .style('font-size', '14px')
        .attr("transform", d => `translate(
            ${xScale(d.age)-9},
            ${yScale(d.smokes)+5})`);

    //set the x-axis label
    chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
    .append("text")
    .attr("y", 20)
    .text("Median Age")
    .attr('font-weight', 700);

    //set the y-axis label
    chartGroup.append('g')
    .attr('transform', `translate(-50, ${chartHeight/2})`)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .text("Smokes (%)")
        .attr('font-weight', 700);
});