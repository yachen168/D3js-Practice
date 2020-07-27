import Data from './data.js'

const PopulationDensityData = formatData(Data);

// 資料後處理
function formatData(data) {
    data.forEach(item => {
        item.density = +item.density.split(',').join('');
    })
    return data;
}

function render() {

    const svg = d3.select('svg');
    const containerHeight = 500;

    const scaleHeight = d3.scaleLinear() // 比例縮放
        .domain([0, 4000000]) // 原本範圍
        .range([0, 400]) // 對應新的範圍

    const scaleColor = d3.scaleLinear()
        .domain([0, 4000000])
        .range(['blue', 'red'])

    const line = d3.line() // 折線圖函數
        .x((data, index) => index * 100 + 25)
        .y((data, index) => -data.density / 10000 + 450) // 由下往上


    const groups = svg.selectAll('g.city') // 選取 class 為 city 的 g 元素(此時無 g 元素)
        .data(PopulationDensityData) // 綁定資料
        .enter() // 進入有資料、無實際元素的區域
        .append('g') // 新增對應資料數量的 g 元素

    groups.append('text') // 繼續塞入 text 元素
        .text(data => data.city) // 塞入城市
        .attr('y', 520) // 字向 y 軸移動 520
        .attr('x', (data, index) => index * 100)

    groups.append('rect') // 矩形
        .attr('x', (data, index) => index * 100 + 10)
        .attr('y', (data) => containerHeight - scaleHeight(data.density)) // 柱狀圖由下往上長
        .attr('width', 30)
        // .attr("y", (d, i) => scaleHeight(d.density) + 500)
        .attr('height', data => scaleHeight(data.density))
        .attr('fill', (data) => scaleColor(data.density))

    groups.append('text') // 標示數量
        .text(data => data.density)
        .attr('x', (data, index) => index * 100 + 10) // 移動至對應的長條圖
        .attr('y', (data) => -scaleHeight(data.density) + 485)
        .style('font-size', '13px')

    svg.append('path') // 新增一個 path 元素 (畫線)
        .datum(PopulationDensityData) // 給線綁資料，只有一條線用 datum
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'black')
}

render();